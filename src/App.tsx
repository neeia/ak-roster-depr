import React, { useState } from "react";
import {
  createMuiTheme,
  CssBaseline,
  ThemeProvider,
} from "@material-ui/core";
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import "./App.css";

import OperatorDataTableRow from "./components/OperatorDataTableRow";
import operatorJson from "./data/operators.json";
import OpForm from "./components/OpForm";


const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
  },
});

export interface Operator {
 name : string;
 rarity : number;
 potential : number;
 promotion : number;
 owned: boolean;
 level : number;
 skillLevel : number;
 skill1Mastery?: number;
 skill2Mastery?: number;
 skill3Mastery?: number;
}

function App() {
  const [operators, setOperators] = useState<Record<string, Operator>>(
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
          skillLevel: 0
          }]))
  );

  const handleChange = (
    operatorName: string,
    property: string,
    value: number | boolean) => {
      const copyOperators = {...operators};
      const operatorData = copyOperators[operatorName];
      (operatorData as any)[property] = value;
      setOperators(copyOperators);
  };

  const [operatorFilter, setOperatorFilter] = useState<string>("");

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <OpForm onChange={setOperatorFilter}/>
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
          {operatorJson.map((op) =>
            {
              const opData = operators[op.name];
              if (op.name.toLowerCase().includes(operatorFilter.toLowerCase())) {
                return <OperatorDataTableRow 
                        operator={opData} 
                        onChange = {handleChange} />;
              }
            })
          }
        </TableBody>
      </Table>
    </ThemeProvider>
  )
}

export default App;