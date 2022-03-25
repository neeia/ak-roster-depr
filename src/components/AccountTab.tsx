import React, { useEffect, useState } from "react";
import { Operator } from "../App";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import Button from "./Button";
import firebase from "firebase";
import useLocalStorage from "../UseLocalStorage";

interface Props {
  operators: Record<string, Operator>;
  updateFromRemote: (remoteOperators: Record<string, Operator>) => void;
  setDirty: (flag: boolean) => void;
}

const AccountTab: React.FC<Props> = (props) => {
  const { operators, updateFromRemote, setDirty } = props;

  const [user, setUser] = useState<firebase.User | null>(firebase.auth().currentUser);
  
  const handleLogin = async (
    username: string,
    password: string
  ): Promise<Boolean> => {
    try {
      firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
      const newUser = await firebase
        .auth()
        .signInWithEmailAndPassword(username, password);
      setUser(newUser.user);
      return true;
    } catch (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
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
          firebase
            .database()
            .ref("users/" + userCredential.user.uid + "/username/")
            .set(username)
          return true;
        }
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
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
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        return false;
      });
    return false;
  };

  const getUsername = (): string => {
    if (!user) return "";
    firebase
      .database()
      .ref("users/" + user.uid + "/meta/username/")
      .get()
      .then((snapshot) => {
        console.log(snapshot.val());
        if (snapshot.exists()) {
          return snapshot.val();
        }
      });
    return "";
  };

  const getIGN = (): string => {
    if (!user) return "";
    firebase
      .database()
      .ref("users/" + user.uid + "/meta/")
      .get()
      .then((snapshot) => {
        if (snapshot.exists()) {
          return snapshot.val();
        }
      });
    return "";
  };
  
  const setIGN = (ign: string): void => {
    if (!user) return;
    firebase
      .database()
      .ref("users/" + user.uid + "/meta/")
      .set(ign);
  };
  
  const writeUserData = (): void => {
    if (!user) return;
    firebase
      .database()
      .ref("users/" + user.uid + "/roster/")
      .set(operators);
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

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDirty(false);
      writeUserData();
    }, 10000);
    return () => clearTimeout(timeout);
  }, [operators]);

  if (user) {
    return (
      <>
        <div>
          Share your collection with https://neia.io/ak/roster/{getUsername()}
        </div>
        <Button handleChange={writeUserData} text="Manual Save" />
        <Button handleChange={importUserData} text="Manual Load" />
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
