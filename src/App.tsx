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
});

export interface Operator {
  name: string;
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
    []
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
  const [value, setValue] = useLocalStorage("tabValue" ,0);
  const handleTabChange = (event: any, newValue: number) => {
    setValue(newValue);
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
              <TableCell align="right">Owned</TableCell>
              <TableCell align="right">Icon</TableCell>
              <TableCell>Rarity</TableCell>
              <TableCell>Operator</TableCell>
              <TableCell align="right">Potential</TableCell>
              <TableCell align="right">Promotion</TableCell>
              <TableCell align="right">Level</TableCell>
              <TableCell align="right">Skill Level</TableCell>
              <TableCell align="right">S1</TableCell>
              <TableCell align="right">S2</TableCell>
              <TableCell align="right">S3</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {operatorJson
              .filter((op) =>
                op.name.toLowerCase().includes(operatorFilter.toLowerCase())
              )
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
