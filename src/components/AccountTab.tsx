import React, { useEffect, useState } from "react";
import firebase from "firebase";
import { Operator } from "../App";
import { makeStyles } from "@material-ui/core";
import LoginRegisterForm from "./accountTab/LoginRegisterForm";
import LoggedInForm from "./accountTab/LoggedInForm";

const useStyles = makeStyles({
  container: {
    display: "flex",
    padding: "calc(2.5% + 4px)",
    paddingTop: "calc(1.5% + 4px)",
    justifyContent: "center",
    alignItems: "center",
  },
});

export function errCodeToMessage(e: string): string {
  if (e === "auth/invalid-email") {
    return "Bad email address.";
  }
  else if (e === "auth/user-not-found") {
    return "Wrong email or password.";
  }
  else if (e === "auth/weak-password") {
    return "Need longer password.";
  }
  else if (e === "auth/wrong-password") {
    return "Wrong email or password.";
  }
  else if (e === "auth/email-already-in-use") {
    return "Email already in use.";
  }
  return e;
}

interface Props {
  operators: Record<string, Operator>;
  updateFromRemote: (remoteOperators: Record<string, Operator>) => void;
  dirty: boolean;
  setDirty: (flag: boolean) => void;
};

const AccountTab: React.FC<Props> = (props) => {
  const { operators, updateFromRemote, dirty, setDirty } = props;
  const classes = useStyles();

  const [user, setUser] = useState<firebase.User | null>(firebase.auth().currentUser);

  function handleLogin(
    email: string,
    password: string,
    onError: (e: string) => void
  ): void {
    firebase.auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        if (userCredential != null && userCredential.user != null) {
          // Signed in
          firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
          setUser(userCredential.user);
          onError("");
        }
      })
      .catch((e) => onError(e.code))
  };

  function handleSignup(
    email: string,
    password: string,
    onError: (e: string) => void
  ): void {
    firebase.auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        if (userCredential != null && userCredential.user != null) {
          // Signed in
          firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
          setUser(userCredential.user);
          onError("");
        }
      })
      .catch((e) => onError(e.code))
  };
  function handleLogout(): boolean {
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
      if (dirty) writeUserData();
      setDirty(false);
    }, 10000);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [operators]);

  return (
    <div className={classes.container}>
      {(user
        ? <LoggedInForm
          user={user}
          saveData={writeUserData}
          loadData={importUserData}
          handleLogout={handleLogout}
        />
        : <LoginRegisterForm
          handleLogin={handleLogin}
          handleSignup={handleSignup}
        />)}
    </div>
  );
};
export default AccountTab;
