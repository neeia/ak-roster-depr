import React from 'react';
import { Container } from '@material-ui/core';
import './App.css';

import OperatorDataTable, { OperatorProps } from './components/OperatorDataTable';
import OpForm from './components/OpForm';
import operators from "./data/operators.json"

const operatorList : OperatorProps[] = []

operators.forEach(op => {
  const prop : OperatorProps = {
    name: op.name,
    potential: 1,
    promotion: 0,
    level: 0,
    skillLevel: 1,
    skill1Mastery: 0,
    skill2Mastery: 0,
    skill3Mastery: 0
  }
  operatorList.push(prop);
});


function App() {
  // let columns : OperatorProps[][] = [];
  // for (var i = 0; i < operatorList.length; i+=colSize) {
  //   columns.push(operatorList.slice(i,i+colSize));
  // }
  return (
    <div className="App">
        <OpForm/>
        <Container>
          <div className="operator-data-table">
            {operatorList.map((op) => (<OperatorDataTable {...op}/>))} 
          </div>
        </Container>
    </div>
  );
}

export default App;
