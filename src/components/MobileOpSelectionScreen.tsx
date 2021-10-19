import { makeStyles } from "@material-ui/core";
import FormButton from "./FormButton";
import React from "react";
import slugify from "slugify";
import { useState } from "react";
import { Operator } from "../App"; 
import operatorJson from "../data/operators.json";
import MobileOpEditForm from "./MobileOpEditForm";
import { useBoxStyles } from "./BoxStyles"

const useStyles = makeStyles({
  displayBox: {
    justifyContent: "space-between",
    // backgroundColor: "#444455",
    // padding: "12px",
    // margin: "12px",
    // border: "2px solid pink",
    // borderRadius: "5px",
  },
  item: {
    // margin: "12px",
  },
  classDisplay: {
    // justifyContent: "space-between",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(64px, 1fr))",
    gap: "2px",
    width: "100%",
  },
  classIcon: {
    width: "48px",
    height: "48px",
  },
  opIcon: {
    width: "64px",
    height: "64px",
  },
  classButtonContent: {
    display: "block",
  },
  classNameText: {
    fontSize: "12px",
  },
  operatorDisplay: {
    // justifyContent: "space-between",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(96px, 1fr))",
    rowGap: "20px",
    gap: "2px",
    width: "100%",
  },
});

interface Props {
  operators: Record<string, Operator>;
  onChange: (
    operatorID: string,
    property: string,
    value: number | boolean
  ) => void;
}

const classList = [
  "guard",
  "vanguard",
  "caster",
  "sniper",
  "defender",
  "medic",
  "supporter",
  "specialist",
]

function sortComparator(a: any, b: any) {
  return (
    b.rarity - a.rarity ||
    a.name.localeCompare(b.name)
  );
}

const MobileOpSelectionScreen = React.memo((props: Props) => {
  const classes = useStyles();
  const { operators, onChange } = props;
  const boxStyle = useBoxStyles();

  const noneStr = "none";
  const [selectedClass, setSelectedClass] = useState(noneStr);
  const [selectedOp, setSelectedOp] = useState(noneStr);

  const classSelector = classList
  .map((cl: string) => (
    <FormButton
      onClick={(()=>{setSelectedClass(cl); setSelectedOp(noneStr)})}
      toggled={selectedClass == cl}
    >
      {<div className={classes.classButtonContent}>
        <img 
          className={classes.classIcon}
          src={`https://res.cloudinary.com/samidare/image/upload/v1/arknights/classes/${cl}`}
        />
        {/* <div className={classes.classNameText}>{cl}</div> */}
      </div>}
    </FormButton>
  ));

  const sortedOperators = Object.values(operatorJson)
  .filter((op: any) => (op.class.toLowerCase() === selectedClass))
  .sort(sortComparator)
  .map((op: any) => (
    <div key={op.id}>{
      <FormButton
        onClick={(()=>{setSelectedOp(op.id)})}
      >
      {<div className={classes.classButtonContent}>
        <img
          className={classes.opIcon}
          src={`https://res.cloudinary.com/samidare/image/upload/v1/arknights/operators/${slugify(
              op.name, { lower: true, replacement: "-", remove: /-/g }
            )}`
          }
        />
        <div className={classes.classNameText}>{op.name}</div>
      </div>}
      </FormButton>}
    </div>
  ));

  return (
    <div className={classes.displayBox}>
      <div className={classes.classDisplay}>
        {classSelector}
      </div>
      <div className={classes.operatorDisplay}>
      {selectedClass === noneStr ? "" 
      : (selectedOp === noneStr ? sortedOperators 
      : <MobileOpEditForm op={operators[selectedOp]} opClass={selectedClass} onChange={onChange}/>)}
      </div>
    </div>
  );
});
export default MobileOpSelectionScreen;
