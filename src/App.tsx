import React, { useState } from "react";
import {
  Container,
  createMuiTheme,
  CssBaseline,
  ThemeProvider,
} from "@material-ui/core";
import "./App.css";

import OperatorDataTableRow from "./components/OperatorDataTableRow";
import operatorJson from "./data/operators.json";


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
      // operatorData[property] = value;
      setOperators(copyOperators);
    };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container>
        {operatorJson.map((op) =>
          {
            const opData = operators[op.name];
            return <OperatorDataTableRow 
                    operator={opData} 
                    onChange = {handleChange} />;
          })
        }
      </Container>
    </ThemeProvider>
  )
}

export default App;