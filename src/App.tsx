import React, { useState } from "react";
import {
  AppBar,
  Box,
  createMuiTheme,
  CssBaseline,
  makeStyles,
  Tab,
  TableSortLabel,
  Tabs,
  ThemeProvider,
  Typography,
} from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

import OperatorDataTableRow from "./components/OperatorDataTableRow";
import operatorJson from "./data/operators.json";
import OpForm from "./components/OpForm";
import OperatorCollectionBlock from "./components/OperatorCollectionBlock";
import useLocalStorage from './UseLocalStorage'

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/database";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import Button from "./components/Button";

const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
  },
});

const useStyles = makeStyles({
  collectionContainer: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "column",
    height: "100vh",
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden', 
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
});

const headCells = [
  { id: "owned",          alignRight: false, disablePadding: false, enableSort: true, defaultDesc: true, label: "Owned",},
  { id: "favorite",       alignRight: false, disablePadding: false, enableSort: true, defaultDesc: true, label: "Favorite",},
  { id: "icon",           alignRight: false, disablePadding: false, enableSort: false, defaultDesc: true, label: "Icon",},
  { id: "rarity",         alignRight: false, disablePadding: false, enableSort: true, defaultDesc: true, label: "Rarity",},
  { id: "name",           alignRight: false, disablePadding: false, enableSort: true, defaultDesc: true, label: "Operator",},
  { id: "potential",      alignRight: false, disablePadding: false, enableSort: true, defaultDesc: true, label: "Potential",},
  { id: "promotion",      alignRight: false, disablePadding: false, enableSort: true, defaultDesc: true, label: "Promotion",},
  { id: "level",          alignRight: false, disablePadding: false, enableSort: true, defaultDesc: true, label: "Level",},
  { id: "skillLevel",     alignRight: false, disablePadding: false, enableSort: true, defaultDesc: true, label: "Skill Level", },
  { id: "skill1Mastery",  alignRight: false, disablePadding: false, enableSort: false, defaultDesc: true, label: "S1",},
  { id: "skill2Mastery",  alignRight: false, disablePadding: false, enableSort: false, defaultDesc: true, label: "S2",},
  { id: "skill3Mastery",  alignRight: false, disablePadding: false, enableSort: false, defaultDesc: true, label: "S3",}
];

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
  databaseURL: "https://ak-roster-default-rtdb.firebaseio.com/"
};
!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
// Get a reference to the database service
const database = firebase.database();

function App() {
  const [operators, setOperators] = useLocalStorage<any>(
    "operators",
    Object.fromEntries(
      operatorJson.map((op) => [
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
      ])
    )
  );
  const classes = useStyles();

  const handleChange = React.useCallback(
    (operatorID: string, property: string, value: number | boolean) => {
      setOperators((oldOperators : any) => {
        const copyOperators = { ...oldOperators };
        const copyOperatorData = { ...copyOperators[operatorID] };
        (copyOperatorData as any)[property] = value;
        copyOperators[operatorID] = copyOperatorData;
        return copyOperators;
      });
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
  const [value, setValue] = useLocalStorage("tabValue", 0);
  const handleTabChange = (event: any, newValue: number) => {
    setValue(newValue);
  };

  const [orderBy, setOrderBy] = useLocalStorage("orderBy", {key: "favorite", descending: true});
  const createSortHandler = (property: string) => () => {
    handleRequestSort(property);
  };
  const handleRequestSort = (property: string) => {
    const isAsc = orderBy.key === property && orderBy.descending === false;
    setOrderBy({key: property, descending: isAsc ? true : false});
  };

  const [user, setUser] = useState<firebase.User|null>(null);

  const handleLogin = async (username: string, password: string) : Promise<Boolean>  => {
    try {
      const newUser = await firebase.auth().signInWithEmailAndPassword(username, password);
      setUser(newUser.user);
      console.log(user?.uid);
      return true;
    } 
    catch (error) {
      // var errorCode = error.code;
      // var errorMessage = error.message;
      return false;
    }
  }
  const handleSignup = (username: string, password: string, passwordConfirm: string) : boolean => {
    firebase.auth().createUserWithEmailAndPassword(username, password)
      .then((userCredential) => {
        // Signed in 
        setUser(userCredential.user);
        return true;
      })
      .catch((error) => {
        // var errorCode = error.code;
        // var errorMessage = error.message;
        return false;
      });
    return false;
  }
  const handleLogout = () : boolean => {
    firebase.auth().signOut().then(() => {
      // Sign-out successful.
      return true;
    }).catch((error) => {
      // An error happened.
      return false;
    });
    return false;
  }
  
  const writeUserData = () : void => {
    if (!user) return;
    firebase.database().ref("users/" + user.uid).set({
      accountName: "",
      roster: operators
    });
  }

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
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <OpForm onChange={setOperatorFilter} />
        <Table>
          <TableHead>
            <TableRow>
              {headCells.map((headCell) => (
                <TableCell
                  key={headCell.id}
                  align={headCell.alignRight ? "right" : "left"}
                  padding={headCell.disablePadding ? "none" : "default"}
                  sortDirection={orderBy.key === headCell.id ? (orderBy.descending ? "desc" : "asc") : false}
                >
                  {(headCell.enableSort ? <TableSortLabel
                    active={orderBy.key === headCell.id}
                    direction={orderBy.key === headCell.id && orderBy.descending ? "desc" : "asc"}
                    onClick={createSortHandler(headCell.id)}
                  >
                    {headCell.label}
                    {orderBy.key === headCell.id ? (
                      <span className={classes.visuallyHidden}>
                        {orderBy.descending ? "sorted descending" : "sorted ascending"}
                      </span>
                    ) : null}
                  </TableSortLabel> : headCell.label)}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {operatorJson
              .filter((op) =>
                op.name.toLowerCase().includes(operatorFilter.toLowerCase())
              )
              .sort((a, b) => operatorComparator(operators[a.id], operators[b.id], orderBy) 
              || defaultSortComparator(operators[a.id], operators[b.id]))
              .map((op) => (
                <OperatorDataTableRow
                  key={op.id}
                  operator={operators[op.id]}
                  onChange={handleChange}
                />
              ))}
          </TableBody>
        </Table>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <div className={classes.collectionContainer}>
          {operatorJson
            .filter((op) => operators[op.id].potential > 0)
            .sort((a, b) => operatorComparator(operators[a.id], operators[b.id], orderBy) 
            || defaultSortComparator(operators[a.id], operators[b.id]))
            .map((op) => (
              <OperatorCollectionBlock
                key={op.id}
                operator={operators[op.id]}
              />
            ))}
        </div>
      </TabPanel>
      <TabPanel value={value} index={2}>
        {user ? user["uid"] : "not logged"}
        {( user ? <Button handleChange={writeUserData}/> :
        <>
          <LoginForm handleLogin={handleLogin}/>
          <RegisterForm handleSignup={handleSignup}/>
        </>
        )}
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
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

interface TabProps {
  children: any;
  index: number;
  value: number;
}

function operatorComparator(a: Operator, b: Operator, orderBy: {key: string, descending: boolean}) {
  var aValue = (a as any)[orderBy.key];
  var bValue = (b as any)[orderBy.key];
  if (orderBy.key === "level") {
    aValue += a.promotion * 100;
    bValue += b.promotion * 100;
  }
  const result = typeof aValue === "string" ? aValue.localeCompare(bValue) : aValue - bValue;
  return orderBy.descending ? -result : result;
}

function defaultSortComparator(a: Operator, b: Operator) {
  return (b.favorite ? 1 : 0) - (a.favorite ? 1 : 0) 
  || (b.owned ? 1 : 0) - (a.owned ? 1 : 0) 
  || b.promotion - a.promotion
  || b.level - a.level 
  || b.rarity - a.rarity 
  || a.name.localeCompare(b.name);
}

