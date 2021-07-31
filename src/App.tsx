import React, { useEffect, useState } from "react";
import {
  AppBar,
  Box,
  createMuiTheme,
  CssBaseline,
  makeStyles,
  Tab,
  Tabs,
  ThemeProvider,
} from "@material-ui/core";

import "firebase/auth";
import "firebase/firestore";
import "firebase/database";

import operatorJson from "./data/operators.json";

import useLocalStorage from "./UseLocalStorage";

import OpForm from "./components/OpForm";
import OperatorCollectionBlock from "./components/OperatorCollectionBlock";
import RosterTable from "./components/RosterTable";
import AccountTab from "./components/AccountTab";

const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
  },
});

const useStyles = makeStyles({
  collectionContainer: {
    display: "grid",
    // gridTemplateColumns: "33vw 33vw 33vw",
    gridTemplateColumns: "24vw 24vw 24vw 24vw",
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

function App() {
  const [operators, setOperators] = useLocalStorage<Record<string, Operator>>(
    "operators",
    defaultOperators
  );
  const classes = useStyles();

  const [dirty, setDirty] = useLocalStorage<boolean>("dirty", false);

  const handleChange = React.useCallback(
    (operatorID: string, property: string, value: number | boolean) => {
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
    (op as any)[prop] = value;
    switch (prop) {
      case "owned":
        if (value === true) {
          op.potential = op.potential || 1;
          op.level = op.level || 1;
          op.skillLevel = (op.rarity > 2 ? op.skillLevel || 1 : 0);
        }
        break;
      case "skillLevel":
        if (op.name === "Amiya") {
          handleChange("char_1001_amiya2", "skillLevel", value);
        } else if (op.name === "Amiya (Guard)") {
          // update amiya's stuff
        }
        break;
      case "level":
        if (op.name === "Amiya") {
          // check if amiya guard is owned; then update her stuff
        } else if (op.name === "Amiya (Guard)") {
          // update amiya's stuff
        }
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

  // operator name search filter
  const [operatorFilter, setOperatorFilter] = useState<string>("");

  // tab value controller
  const [value, setValue] = useState<number>(0);
  const handleTabChange = (event: any, newValue: number) => {
    setValue(newValue);
  };

  const renderCollection = (collection: typeof operators): any => {
    return Object.values(operators)
      .filter((op: any) => collection[op.id].owned && collection[op.id].potential > 0)
      .sort((a: any, b: any) =>
        defaultSortComparator(collection[a.id], collection[b.id])
      )
      .map((op: any) => (
        <OperatorCollectionBlock key={op.id} operator={collection[op.id]} />
      ));
  };

  var [collOperators, setCollOperators] = useState<typeof operators>();

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
        <AccountTab 
          operators={operators} 
          updateFromRemote={(remoteOperators) => setOperators(remoteOperators)}
          setDirty={(flag: boolean) => setDirty(flag)}
        />
      </TabPanel>
      {/* <TabPanel value={value} index={3}>
        <SearchForm handleSubmit={findUser} />
        <div className={classes.collectionContainer}>
          {collOperators ? renderCollection(collOperators) : ""}
        </div>
      </TabPanel> */}
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
