import React, { useState } from "react";
import {
  AppBar,
  Box,
  createMuiTheme,
  CssBaseline,
  makeStyles,
  Tab,
  Tabs,
  ThemeProvider,
  Typography,
} from "@material-ui/core";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/database";

import operatorJson from "./data/operators.json";

import useLocalStorage from "./UseLocalStorage";

import OpForm from "./components/OpForm";
import OperatorCollectionBlock from "./components/OperatorCollectionBlock";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import Button from "./components/Button";
import SearchForm from "./components/SearchForm";
import ValidatedTextField from "./components/ValidatedTextField";
import RosterTable from "./components/RosterTable";

const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
  },
});

const useStyles = makeStyles({
  collectionContainer: {
    display: "grid",
    gridTemplateColumns: "auto auto",
    height: "100vh",
    width: "100%",
  },
});

const defaultOperators = Object.fromEntries(
  Object.entries(operatorJson).map(([key, op]) => {
    return [
      op.id,
      {
        id: op.id,
        name: op.name,
        favorite: false,
        rarity: op.rarity,
        potential: 0,
        promotion: 0,
        owned: false,
        level: 0,
        skillLevel: 0,
      },
    ];
  })
);

export interface Operator {
  id: string;
  name: string;
  favorite: boolean;
  rarity: number;
  potential: number;
  promotion: number;
  owned: boolean;
  level: number;
  skillLevel: number;
  skill1Mastery?: number;
  skill2Mastery?: number;
  skill3Mastery?: number;
}

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

function App() {
  const [operators, setOperators] = useLocalStorage<Record<string, Operator>>(
    "operators",
    defaultOperators
  );
  const classes = useStyles();

  const handleChange = React.useCallback(
    (operatorID: string, property: string, value: number | boolean) => {
      setOperators(
        (oldOperators: Record<string, Operator>): Record<string, Operator> => {
          const copyOperators = { ...oldOperators };
          const copyOperatorData = { ...copyOperators[operatorID] };
          (copyOperatorData as any)[property] = value;
          copyOperators[operatorID] = copyOperatorData;
          writeOperatorData(copyOperatorData.id, property, value);
          return copyOperators;
        }
      );
    },
    [setOperators]
  );

  // no clue what this is for
  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  // operator name search filter
  const [operatorFilter, setOperatorFilter] = useState<string>("");

  // tab value controller
  const [value, setValue] = useState<number>(0);
  const handleTabChange = (event: any, newValue: number) => {
    setValue(newValue);
  };

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
  const writeOperatorData = (
    opID: string,
    key: string,
    value: number | boolean
  ): void => {
    if (!user) return;
    firebase
      .database()
      .ref("users/" + user.uid + "/roster/" + opID + key)
      .set({
        value,
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
          setOperators(snapshot.val());
        }
      });
  };

  const renderCollection = (collection: typeof operators): any => {
    // return Object.values(operatorJson)
    //   .filter((op: any) => collection[op.id].potential > 0)
    //   .sort(
    //     (a: any, b: any) =>
    //       operatorComparator(collection[a.id], collection[b.id], orderBy) ||
    //       defaultSortComparator(collection[a.id], collection[b.id])
    //   )
    //   .map((op: any) => (
    //     <OperatorCollectionBlock key={op.id} operator={collection[op.id]} />
    //   ));
    return <></>;
  };

  var [collOperators, setCollOperators] = useState<typeof operators>();
  const viewUserCollection = (uid: string): void => {
    firebase
      .database()
      .ref("users/" + uid + "/roster/")
      .get()
      .then((snapshot) => {
        if (snapshot.exists()) {
          setCollOperators(snapshot.val());
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

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleTabChange}
          aria-label="simple tabs example"
        >
          <Tab label="Roster" {...a11yProps(0)} />
          <Tab label="Collection" {...a11yProps(1)} />
          <Tab label="Account" {...a11yProps(2)} />
          <Tab label="Lookup" {...a11yProps(3)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <OpForm onChange={setOperatorFilter} />
        <RosterTable operators={operators} onChange={handleChange} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <div className={classes.collectionContainer}>
          {renderCollection(operators)}
        </div>
      </TabPanel>
      <TabPanel value={value} index={2}>
        {user ? (
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
        ) : (
          <>
            <LoginForm handleLogin={handleLogin} />
            <RegisterForm handleSignup={handleSignup} />
          </>
        )}
      </TabPanel>
      <TabPanel value={value} index={3}>
        <SearchForm handleSubmit={findUser} />
        <div className={classes.collectionContainer}>
          {collOperators ? renderCollection(collOperators) : ""}
        </div>
      </TabPanel>
    </ThemeProvider>
  );
}

export default App;

function TabPanel(props: TabProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

interface TabProps {
  children: any;
  index: number;
  value: number;
}
