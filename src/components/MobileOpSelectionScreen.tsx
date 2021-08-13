import { Box, makeStyles } from "@material-ui/core";
import React from "react";
import { Operator } from "../App"; 
import operatorJson from "../data/operators.json";

const useStyles = makeStyles({
  opBox: {
    justifyContent: "space-between",
    backgroundColor: "#444455",
    padding: "12px",
    margin: "12px",
    border: "2px solid pink",
    borderRadius: "5px",
  },
  item: {
    display: "inline-block",
  },
  skillsDisplay: {
    height: "42px",
    justifyContent: "space-between",
  },
  level: {
    fontSize: "40px",
    textAlign: "center",
  },
  icon: {
    width: "60px",
    height: "60px",
  },
  fav: {
    fontSize: "32px",
  },
  opName: {
    fontSize: "24px",
  },
});

interface Props {

}

const classes = [
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

  const noneStr = "none";
  let selectedClass : string = noneStr;
  
  const sortedOperators = Object.values(operatorJson)
    .filter((op: any) => (op.class.toLowerCase() === "guard"))
    .sort(sortComparator)
    .map((op: any) => (
      <div key={op.id}>{op.name}</div>
    ));

  return (
    <div className={classes.opBox}> 
      {selectedClass === noneStr ? "none" : sortedOperators}
    </div>
  );
});
export default MobileOpSelectionScreen;
