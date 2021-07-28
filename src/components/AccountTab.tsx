import React, { useEffect, useState } from "react";
import { Operator } from "../App";
import ValidatedTextField from "./ValidatedTextField";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import Button from "./Button";
import firebase from "firebase";


const firebaseConfig = {
  apiKey: "AIzaSyDjpt2G4GFQjYbPT5Mrj6L2meeWEnsCEgU",
  authDomain: "ak-roster.firebaseapp.com",
  projectId: "ak-roster",
  storageBucket: "ak-roster.appspot.com",
  messagingSenderId: "1076086810652",
  appId: "1:1076086810652:web:ed1da74b87a08bf4b657d9",
  measurementId: "G-VZXJ8MY6D1",
  databaseURL: "https://ak-roster-default-rtdb.firebaseio.com/",
};
!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
// Get a reference to the database service


interface Props {
  operators: Record<string, Operator>;
  updateFromRemote: (remoteOperators: Record<string, Operator>) => void;
}


/* #region Methods */
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

const viewUserCollection = (uid: string): void => {
  firebase
    .database()
    .ref("users/" + uid + "/roster/")
    .get()
    .then((snapshot) => {
      if (snapshot.exists()) {
        // setCollOperators(snapshot.val());
      }
    });
};
const findUser = (username: string): string => {
  firebase
    .database()
    .ref("phonebook/" + username)
    .get()
    .then((snapshot) => {
      if (snapshot.exists()) {
        return viewUserCollection(snapshot.val());
      }
    });
  return "";
};

const getIGN = (): string => {
  if (!user) return "";
  firebase
    .database()
    .ref("users/" + user.uid + "/accuntName/")
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
    .ref("users/" + user.uid + "/accountName/")
    .set(ign);
};
/* #endregion */

const AccountTab: React.FC<Props> = (props) => {
  const { operators, updateFromRemote } = props;

const writeUserData = (): void => {
  if (!user) return;
  firebase
    .database()
    .ref("users/" + user.uid)
    .set({
      accountName: "",
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

  useEffect(() => {
    const timeout = setTimeout(() => {
      writeUserData();
    }, 30000);
    return () => clearTimeout(timeout);
  }, [operators]);

  if (user) {
    return (
      <>
        <ValidatedTextField
          validator={(value: string) => {
            return true;
          }}
          onChange={(e) => setIGN(e.target.value)}
        />
        <Button handleChange={writeUserData} text="Store Changes" />
        <Button handleChange={handleLogout} text="Log out" />
        <Button handleChange={importUserData} text="Import Data" />
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
