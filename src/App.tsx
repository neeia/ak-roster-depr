import React, { useEffect, useState } from "react";
import firebase from "firebase";
import operatorJson from "./data/operators.json";
import useLocalStorage from "./UseLocalStorage";
import { MAX_LEVEL_BY_RARITY } from "./components/RosterTable";
import {
  AppBar,
  Box,
  createTheme,
  CssBaseline,
  Tab,
  Tabs,
  ThemeProvider,
} from "@material-ui/core";
import { grey } from "@material-ui/core/colors";

import AccountTab from "./components/AccountTab";
import SearchForm from "./components/SearchForm";
import CollectionTab from "./components/CollectionTab";
import DataTab from "./components/DataTab";

const darkTheme = createTheme({
  palette: {
    type: "dark",
    primary: {
      main: grey[900],
    },
    secondary: {
      main: `#f7d98b`,
    },
  },
});

export const MOBILE_BREAKPOINT = 900;
export const TABLET_BREAKPOINT = 1300;

// Converts an opJson entry into an Operator
function opObject ([_, op] : any) : [string, Operator] {
  return [
    op.id,
    {
      id: op.id,
      name: op.name,
      favorite: false,
      rarity: op.rarity,
      potential: 0,
      promotion: -1,
      owned: false,
      level: 0,
      skillLevel: 0,
    },
  ];
}

const defaultOperators = Object.fromEntries(
  Object.entries(operatorJson).map(opObject)
);

function presetObject(_: any, index: number): [string, Operator] {
  return [
    index.toString(),
    {
      id: index.toString(),
      name: `Untitled Preset ${index + 1}`,
      favorite: false,
      rarity: 6,
      potential: 1,
      promotion: 0,
      owned: true,
      level: 1,
      skillLevel: 1,
    },
  ];
}

const defaultPresets = Object.fromEntries([...Array(6)].map(presetObject));

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
  module?: boolean[];
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

  Object.entries(operatorJson).forEach((op) => {
    if (!(op[0] in operators)) {
      operators[op[0]] = opObject(op)[1];
    }
  })

  useEffect(() => {
    if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
    const [, path, userName] = window.location.pathname.split("/");
    window.history.pushState("object or string", "Title", (path !== "u" || userName === undefined ? "/" : "/u/" + userName));
    if (path === "u" && userName !== undefined && checkValidUsername(userName)) {
      findUser(userName).then(() => {
        setValue(3);
      })
    }
  }, []);

  const [dirty, setDirty] = useLocalStorage<boolean>("dirty", false);

  const changePropertyOfOperator = React.useCallback(
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

  // the order of properties in which to apply changes to an operator
  const orderOfOperations = [
    "owned",
    "favorite",
    "potential",
    "promotion",
    "level",
    "skillLevel",
    "skill1Mastery",
    "skill2Mastery",
    "skill3Mastery",
  ];
  const changeOneOperator = React.useCallback(
    (operatorID: string, newOp: Operator) => {
      setOperators(
        (oldOperators: Record<string, Operator>): Record<string, Operator> => {
          const copyOperators = { ...oldOperators };
          var copyOperatorData = { ...copyOperators[operatorID] };
          orderOfOperations.forEach((prop: string) =>
            copyOperatorData = applyChangeWithInvariant(copyOperatorData, prop, (newOp as any)[prop])
          )
          copyOperators[operatorID] = copyOperatorData;
          return copyOperators;
        }
      );
    },
    [setOperators]
  );

  function minMax(min: number, value: number, max: number) {
    return Math.min(Math.max(value, min), max);
  }

  const applyChangeWithInvariant = (op: Operator, prop: string, value: number | boolean) => {
    if (!op.owned && prop !== "owned") return op;
    (op as any)[prop] = value;
    switch (prop) {
      case "potential":
        op.potential = minMax(1, op.potential, 6);
        break;
      case "owned":
        if (value === true) {
          op.potential = 1;
          op.promotion = 0;
          op.level = 1;
          op.skillLevel = (op.rarity > 2 ? 1 : 0);
        } else {
          op.favorite = false;
          op.potential = 0;
          op.promotion = -1;
          op.level = 0;
          op.skillLevel = 0;
          op.skill1Mastery = undefined;
          op.skill2Mastery = undefined;
          op.skill3Mastery = undefined;
          op.module = undefined;
        }
        break;
      case "promotion":
        if (op.rarity < 3) {
          op.promotion = 0
        } else if (op.rarity === 3) {
          op.promotion = Math.min(1, op.promotion)
        }
        if (value === 0) {
          op.skillLevel = Math.min(op.skillLevel, 4);
        }
        if (value === 2) {
          op = applyChangeWithInvariant(op, "skill1Mastery", 0);
          op = applyChangeWithInvariant(op, "skill2Mastery", 0);
          op = applyChangeWithInvariant(op, "skill3Mastery", 0);
        } else {
          op.skill1Mastery = undefined;
          op.skill2Mastery = undefined;
          op.skill3Mastery = undefined;
        }
        op.level = Math.min(op.level, MAX_LEVEL_BY_RARITY[op.rarity][op.promotion]);
        break;
      case "level":
        op.level = minMax(1, op.level, MAX_LEVEL_BY_RARITY[op.rarity][op.promotion]);
        break;
      case "skillLevel":
        op.skillLevel = minMax(1, op.skillLevel, 7);
        op = applyChangeWithInvariant(op, "skill1Mastery", 0);
        op = applyChangeWithInvariant(op, "skill2Mastery", 0);
        op = applyChangeWithInvariant(op, "skill3Mastery", 0);
        if (op.rarity < 3) {
          op.skillLevel = 0;
        }
        if (op.skillLevel > 4 && op.promotion === 0) {
          op.skillLevel = 4;
        }
        break;
      case "skill1Mastery":
      case "skill2Mastery":
        if (op.rarity < 4 || op.promotion !== 2 || op.skillLevel !== 7) {
          op.skill1Mastery = undefined;
          op.skill2Mastery = undefined;
        }
        break;
      case "skill3Mastery":
        if (op.promotion !== 2 || op.skillLevel !== 7 || !(op.rarity === 6 || op.name === "Amiya")) {
          op.skill3Mastery = undefined;
        }
        break;
    }
    return op;
  }

  const [presets, setPresets] = useLocalStorage<Record<string, Operator>>(
    "presets",
    defaultPresets
  );
  const changePresets = React.useCallback(
    (presetID: string, property: string, value: any) => {
      setPresets(
        (oldPresets: Record<string, Operator>): Record<string, Operator> => {
          const copyPresets = { ...oldPresets };
          const copyPresetData = { ...copyPresets[presetID] };
          copyPresets[presetID] = applyChangeWithInvariant(copyPresetData, property, value);
          return copyPresets;
        }
      );
    },
    [setPresets]
  );

  const applyBatch = React.useCallback(
    (source: Operator, target: string[]) => {
      setOperators(
        (oldOperators: Record<string, Operator>): Record<string, Operator> => {
          const copyOperators = { ...oldOperators };
          target.forEach((opId: string) => {
            var copyOperatorData = { ...copyOperators[opId] };
            orderOfOperations.forEach((prop: string) =>
              copyOperatorData = applyChangeWithInvariant(copyOperatorData, prop, (source as any)[prop])
            )
            copyOperators[opId] = copyOperatorData;
          })
          return copyOperators;
        }
      );
    },
    [setOperators]
  );


  // Dirty & Close Warning
  //useEffect(() => {window.onload = function() {
  //  window.addEventListener("beforeunload", function (e) {
  //    if (!dirty) {
  //      return;
  //    }

  //    var confirmationMessage = "Not all changes have been backed up. Please save first.";

  //    (e || window.event).returnValue = confirmationMessage; //Gecko + IE
  //    return confirmationMessage; //Gecko + Webkit, Safari, Chrome etc.
  //  });
  //};}, []);

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
          <Tab label="Data" {...a11yProps(0)} />
          <Tab label="Collection" {...a11yProps(1)} />
          <Tab label="Account" {...a11yProps(2)} />
          <Tab label="Lookup" {...a11yProps(3)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <DataTab
          operators={operators}
          changeOperators={changePropertyOfOperator}
          presets={presets}
          changePresets={changePresets}
          applyBatch={applyBatch}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <CollectionTab
          operators={operators}
          />
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
        {collOperators ? <CollectionTab
          operators={collOperators}
        /> : ""}
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
    (b.module?.length ?? 0) - (a.module?.length ?? 0) ||
    a.name.localeCompare(b.name)
  );
}
