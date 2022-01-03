import React, { useEffect, useState } from "react";
import {
  AppBar,
  Box,
  createTheme,
  CssBaseline,
  makeStyles,
  Tab,
  Tabs,
  ThemeProvider,
} from "@material-ui/core";

import firebase from "firebase";
import operatorJson from "./data/operators.json";
import useLocalStorage from "./UseLocalStorage";

import OpForm from "./components/OpForm";
import OperatorCollectionBlock from "./components/OperatorCollectionBlock";
import RosterTable from "./components/RosterTable";
import AccountTab from "./components/AccountTab";
import SearchForm from "./components/SearchForm";
import DevTab from "./components/DevTab";
import MobileOpSelectionScreen from "./components/MobileOpSelectionScreen";
import useViewportWidth from "./components/UseWindowSize";
import { disableByProperty, errorForNumericProperty, MAX_LEVEL_BY_RARITY } from "./components/RosterTable";
import { red, grey, yellow } from "@material-ui/core/colors";

const darkTheme = createTheme({
  palette: {
    type: "dark",
    primary: {
      main: grey[900],
    },
    secondary: {
      main: yellow[600],
    },
  },
});

const useStyles = makeStyles({
  collectionContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, 264px)",
    width: "100%",
  },
});

const starterOperators = [
  "Amiya",
  "Rangers",
  "Yato",
  "Noir Corne"
];

// Converts an opJson entry into an Operator
function opObject ([key, op] : any) : [string, Operator] {
  return [
    op.id,
    {
      id: op.id,
      name: op.name,
      favorite: false,
      rarity: op.rarity,
      potential: 0,
      promotion: 0,
      owned: false, //starterOperators.includes(op.name),
      level: 0,
      skillLevel: 0,
    },
  ];
}

const defaultOperators = Object.fromEntries(
  Object.entries(operatorJson).map(opObject)
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

function checkValidUsername(user: string) : boolean {
  return user.length > 0
    && !user.includes(".")
    && !user.includes("#")
    && !user.includes("$")
    && !user.includes("[")
    && !user.includes("]");
}

function App() {
  const [operators, setOperators] = useLocalStorage<Record<string, Operator>>(
    "operators",
    defaultOperators
  );
  const classes = useStyles();

  Object.entries(operatorJson).forEach((op) => {
    if (!(op[0] in operators)) {
      operators[op[0]] = opObject(op)[1];
    }
  })

  useEffect(() => {
    if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
    // firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
    const [, urlName] = window.location.pathname.split("/");
    if (checkValidUsername(urlName)) {
      findUser(urlName).then(() => {
        setValue(3);
      })
    }
  }, []);

  const [dirty, setDirty] = useLocalStorage<boolean>("dirty", false);

  const handleChange = React.useCallback(
    (operatorID: string, property: string, value: number | boolean) => {
      if (isNaN(value as any)) {
        return;
      }
      setOperators(
        (oldOperators: Record<string, Operator>): Record<string, Operator> => {
          const copyOperators = { ...oldOperators };
          const copyOperatorData = { ...copyOperators[operatorID] };
          copyOperators[operatorID] = applyChangeWithInvariant(copyOperatorData, property, value);
          setDirty(true);
          return copyOperators;
        }
      );
    },
    [setOperators]
  );

  const applyChangeWithInvariant = (op: Operator, prop: string, value: number | boolean) => {
    if (!op.owned && prop !== "owned") return op;
    (op as any)[prop] = value;
    switch (prop) {
      case "potential":
        op.potential = Math.min(Math.max(op.potential, 1), 6);
        break;
      case "owned":
        if (value === true) {
          op.potential = 1;
          op.promotion = 0;
          op.level = 1;
          op.skillLevel = (op.rarity > 2 ? op.skillLevel || 1 : 0);
        } else {
          op.favorite = false;
          op.potential = 0;
          op.promotion = -1;
          op.level = 0;
          op.skillLevel = (op.rarity > 2 ? 0 : 0);
        }
        break;
      case "skillLevel":
      case "promotion":
        if (op.skillLevel === 7 && op.promotion === 2) {
          op.skill1Mastery = 0;
          op.skill2Mastery = 0;
          if (op.rarity === 6 || op.name === "Amiya") {
            op.skill3Mastery = 0;
          }
        } else {
          op.skill1Mastery = undefined;
          op.skill2Mastery = undefined;
          op.skill3Mastery = undefined;
        }
        if (op.skillLevel > 4 && op.promotion === 0) {
          op.skillLevel = 4;
        }
        op.level = Math.min(op.level, MAX_LEVEL_BY_RARITY[op.rarity][op.promotion]);
        break;
      case "level":
        op.level = Math.max(Math.min(op.level, MAX_LEVEL_BY_RARITY[op.rarity][op.promotion]), 1);
        break;
    }
    return op;
  }

  // Dirty & Close Warning
  // useEffect(() => {window.onload = function() {
  //   window.addEventListener("beforeunload", function (e) {
  //     if (!dirty) {
  //       return;
  //     }

  //     var confirmationMessage = "Not all changes have been backed up. Please save first.";

  //     (e || window.event).returnValue = confirmationMessage; //Gecko + IE
  //     return confirmationMessage; //Gecko + Webkit, Safari, Chrome etc.
  //   });
  // };}, []);

  // no clue what this is for
  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  // tab value controller
  const [value, setValue] = useState<number>(0);
  const handleTabChange = (event: any, newValue: number) => {
    setValue(newValue);
  };

  const renderCollection = (collection: typeof operators): any => {
    return Object.values(collection)
      .filter((op: any) => collection[op.id].owned && collection[op.id].potential > 0)
      .sort((a: any, b: any) =>
        defaultSortComparator(collection[a.id], collection[b.id])
      )
      .map((op: any) => (
        <OperatorCollectionBlock key={op.id} op={collection[op.id]} />
      ));
  };

  var [collOperators, setCollOperators] = useState<typeof operators>();
  const findUser = async (username: string): Promise<boolean> => {
    const snapshot = await firebase
      .database()
      .ref("phonebook/" + username)
      .get();
    if (snapshot.exists()) {
      viewUserCollection(snapshot.val());
      return true;
    }
    else {
      return false;
    }
  };
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
  
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleTabChange}
          aria-label="simple tabs example"
        >
          <Tab label="Data Entry" {...a11yProps(0)} />
          <Tab label="Collection" {...a11yProps(1)} />
          <Tab label="Account" {...a11yProps(2)} />
          <Tab label="Lookup" {...a11yProps(3)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <MobileOpSelectionScreen operators={operators} onChange={handleChange} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <div className={classes.collectionContainer}>
          {renderCollection(operators)}
        </div>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <AccountTab 
          operators={operators} 
          updateFromRemote={(remoteOperators) => setOperators(remoteOperators)}
          setDirty={(flag: boolean) => setDirty(flag)}
        />
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

export function defaultSortComparator(a: Operator, b: Operator) {
  return (
    (b.favorite ? 1 : 0) - (a.favorite ? 1 : 0) ||
    (b.owned ? 1 : 0) - (a.owned ? 1 : 0) ||
    b.promotion - a.promotion ||
    b.level - a.level ||
    b.rarity - a.rarity ||
    a.name.localeCompare(b.name)
  );
}
