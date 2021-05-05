import React from 'react';
import './App.css';

import OperatorDataTable, { OperatorProps } from './OperatorDataTable';
import OpForm from './OpForm';


const angelinaProp : OperatorProps = {
  name: "Angelina",
  rarity: 6,
  potential: 5,
  promotion: 2,
  level: 90,
  skillLevel: 7,
  skill1Mastery: 0,
  skill2Mastery: 3,
  skill3Mastery: 3
}
const weedyProp : OperatorProps = {
  name: "Weedy",
  rarity: 6,
  potential: 2,
  promotion: 2,
  level: 90,
  skillLevel: 7,
  skill1Mastery: 3,
  skill2Mastery: 3,
  skill3Mastery: 3
}
const hoshigumaProp : OperatorProps = {
  name: "Hoshiguma",
  rarity: 6,
  potential: 2,
  promotion: 2,
  level: 80,
  skillLevel: 7,
  skill1Mastery: 0,
  skill2Mastery: 1,
  skill3Mastery: 3
}
const amiyaProp : OperatorProps = {
  name: "Amiya",
  rarity: 5,
  potential: 6,
  promotion: 1,
  level: 70,
  skillLevel: 7,
  skill1Mastery: 0,
  skill2Mastery: 0,
  skill3Mastery: 0
}
const exusiaiProp : OperatorProps = {
  name: "Exusiai",
  rarity: 6,
  potential: 2,
  promotion: 2,
  level: 70,
  skillLevel: 7,
  skill1Mastery: 0,
  skill2Mastery: 0,
  skill3Mastery: 3
}
const myrtleProp : OperatorProps = {
  name: "Myrtle",
  rarity: 4,
  potential: 6,
  promotion: 2,
  level: 70,
  skillLevel: 7,
  skill1Mastery: 3,
  skill2Mastery: 3,
  skill3Mastery: 0
}
const adnachielProp : OperatorProps = {
  name: "Adnachiel",
  rarity: 3,
  potential: 6,
  promotion: 0,
  level: 40,
  skillLevel: 1,
  skill1Mastery: 0,
  skill2Mastery: 0,
  skill3Mastery: 0
}
const amiyaGuardProp : OperatorProps = {
  name: "Amiya (Guard)",
  rarity: 5,
  potential: 6,
  promotion: 2,
  level: 1,
  skillLevel: 1,
  skill1Mastery: 0,
  skill2Mastery: 0,
  skill3Mastery: 0
}
const corruptingProp : OperatorProps = {
  name: "Skadi the Corrupting Heart",
  rarity: 6,
  potential: 1,
  promotion: 0,
  level: 0,
  skillLevel: 1,
  skill1Mastery: 0,
  skill2Mastery: 0,
  skill3Mastery: 0
}


const operatorList : OperatorProps[] = [angelinaProp, weedyProp, hoshigumaProp, amiyaProp, 
  exusiaiProp, myrtleProp, adnachielProp, corruptingProp]

function App() {
  // let columns : OperatorProps[][] = [];
  // for (var i = 0; i < operatorList.length; i+=colSize) {
  //   columns.push(operatorList.slice(i,i+colSize));
  // }
  return (
    <div className="App">
        <OpForm/>
        <div className="operator-data-table"> 
          {operatorList.map((op) => (<OperatorDataTable {...op}/>))} 
        </div>
    </div>
  );
}

export default App;
