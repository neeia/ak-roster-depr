import React from "react";
import { Container } from "@material-ui/core";
import "./App.css";

import OperatorDataTableRow, {
  OperatorProps,
} from "./components/OperatorDataTableRow";
import OpForm from "./components/OpForm";
import operators from "./data/operators.json";

const operatorList: OperatorProps[] = [];

operators.forEach((op) => {
  const prop: OperatorProps = {
    name: op.name,
    potential: 1,
    promotion: 0,
    level: 0,
    skillLevel: 1,
    skill1Mastery: 0,
    skill2Mastery: 0,
    skill3Mastery: 0,
  };
  operatorList.push(prop);
});

function App() {
  return (
    <Container>
      {operatorList.map((op) => (
        <OperatorDataTableRow {...op} />
      ))}
    </Container>
  );
}

export default App;
