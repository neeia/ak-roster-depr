import React, { useEffect, useState } from "react";
import { Operator } from "../App";
import ValidatedTextField from "./ValidatedTextField";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import Button from "./Button";
import firebase from "firebase";

interface Props {
  operators: Record<string, Operator>;
  updateFromRemote: (remoteOperators: Record<string, Operator>) => void;
  setDirty: (flag: boolean) => void;
}

const AccountTab: React.FC<Props> = (props) => {
  const { operators, updateFromRemote, setDirty } = props;
  
  const [user, setUser] = useState<firebase.User | null>(null);

  
  const handleLogin = async (
    username: string,
    password: string
  ): Promise<Boolean> => {
    try {
      const newUser = await firebase
        .auth()
        .signInWithEmailAndPassword(username, password);
      setUser(newUser.user);
      return true;
    } catch (error) {
      // var errorCode = error.code;
      // var errorMessage = error.message;
      return false;
    }
  };
  const handleSignup = (
    email: string,
    username: string,
    password: string
  ): boolean => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        if (userCredential != null && userCredential.user != null) {
          // Signed in
          setUser(userCredential.user);
          firebase
            .database()
            .ref("phonebook/" + username)
            .set(userCredential.user.uid);
          return true;
        }
      })
      .catch((error) => {
        // var errorCode = error.code;
        // var errorMessage = error.message;
        return false;
      });
    return false;
  };
  const handleLogout = (): boolean => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        // Sign-out successful.
        setUser(null);
        return true;
      })
      .catch((error) => {
        // An error happened.
        return false;
      });
    return false;
  };

  // const getIGN = (): string => {
  //   if (!user) return "";
  //   firebase
  //     .database()
  //     .ref("users/" + user.uid + "/accuntName/")
  //     .get()
  //     .then((snapshot) => {
  //       if (snapshot.exists()) {
  //         return snapshot.val();
  //       }
  //     });
  //   return "";
  // };
  
  // const setIGN = (ign: string): void => {
  //   if (!user) return;
  //   firebase
  //     .database()
  //     .ref("users/" + user.uid + "/accountName/")
  //     .set(ign);
  // };
  
  const writeUserData = (): void => {
    if (!user) return;
    firebase
      .database()
      .ref("users/" + user.uid)
      .set({
        roster: operators,
      });
  };
  const importUserData = (): void => {
    if (!user) return;
    firebase
      .database()
      .ref("users/" + user.uid + "/roster/")
      .get()
      .then((snapshot) => {
        if (snapshot.exists()) {
          updateFromRemote(snapshot.val());
        }
      });
  };

  // useEffect(() => {
  //   const timeout = setTimeout(() => {
  //     setDirty(false);
  //     writeUserData();
  //   }, 10000);
  //   return () => clearTimeout(timeout);
  // }, [operators]);

  if (user) {
    return (
      <>
        {/* <ValidatedTextField 
          validator={(value: string) => {
            return true;
          }}
          onChange={(e) => setIGN(e.target.value)}
        /> */}
        <Button handleChange={writeUserData} text="Save Data" />
        <Button handleChange={importUserData} text="Load Data" />
        <Button handleChange={handleLogout} text="Log out" />
      </>
    );
  }
  else {
    return (
      <>
        <LoginForm handleLogin={handleLogin} />
        <RegisterForm handleSignup={handleSignup} />
      </>
    );
  }
};
export default AccountTab;
