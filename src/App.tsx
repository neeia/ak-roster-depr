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
  { id: "Owned",        alignRight: true, disablePadding: false, label: "Owned",       },
  { id: "Favorite",     alignRight: true, disablePadding: false, label: "Favorite",    },
  { id: "Icon",         alignRight: true, disablePadding: false, label: "Icon",        },
  { id: "Rarity",       alignRight: false, disablePadding: true, label: "Rarity",      },
  { id: "Operator",     alignRight: false, disablePadding: true, label: "Operator",    },
  { id: "Potential",    alignRight: true, disablePadding: false, label: "Potential",   },
  { id: "Promotion",    alignRight: true, disablePadding: false, label: "Promotion",   },
  { id: "Level",        alignRight: true, disablePadding: false, label: "Level",       },
  { id: "Skill Level",  alignRight: true, disablePadding: false, label: "Skill Level", },
  { id: "S1",           alignRight: true, disablePadding: false, label: "S1",          },
  { id: "S2",           alignRight: true, disablePadding: false, label: "S2",          },
  { id: "S3",           alignRight: true, disablePadding: false, label: "S3",          }
];

export interface Operator {
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
  const [operators, setOperators] = useLocalStorage<any>(
    "operators",
    Object.fromEntries(
      operatorJson.map((op) => [
        op.name,
        {
          name: op.name,
          rarity: op.rarity,
          owned: false,
          potential: 0,
          promotion: 0,
          level: 0,
          skillLevel: 0,
        },
      ])
    )
  );
  const classes = useStyles();

  const handleChange = React.useCallback(
    (operatorName: string, property: string, value: number | boolean) => {
      setOperators((oldOperators : any) => {
        const copyOperators = { ...oldOperators };
        const copyOperatorData = { ...copyOperators[operatorName] };
        (copyOperatorData as any)[property] = value;
        copyOperators[operatorName] = copyOperatorData;
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
          <Tab label="Placeholder" {...a11yProps(2)} />
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
                  <TableSortLabel
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
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {operatorJson
              .filter((op) =>
                op.name.toLowerCase().includes(operatorFilter.toLowerCase())
              )
              .sort((a, b) => operatorComparator(operators[a.name], operators[b.name], orderBy) 
              || defaultSortComparator(operators[a.name], operators[b.name]))
              .map((op) => (
                <OperatorDataTableRow
                  key={op.name}
                  operator={operators[op.name]}
                  onChange={handleChange}
                />
              ))}
          </TableBody>
        </Table>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <div className={classes.collectionContainer}>
          {operatorJson
            .filter((op) => operators[op.name].potential > 0)
            .sort((a, b) => operatorComparator(operators[a.name], operators[b.name], orderBy) 
            || defaultSortComparator(operators[a.name], operators[b.name]))
            .map((op) => (
              <OperatorCollectionBlock
                key={op.name}
                operator={operators[op.name]}
              />
            ))}
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

