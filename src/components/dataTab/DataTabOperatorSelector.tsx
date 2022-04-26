import React from "react";
import { Operator } from "../../App";
import operatorJson from "../../data/operators.json";
import { makeStyles } from "@material-ui/core";
import DataTabOperatorButton from "./DataTabOperatorButton";

const useStyles = makeStyles({
  container: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
  marginBottom: {
    marginBottom: "16px",
  },
  mobileOpDisplay: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(88px, max-content))",
    justifyContent: "center",
    gridGap: "3px",
  },
  opIcon: {
    width: "64px",
    height: "64px",
    marginBottom: "2px",
  },
  smallText: {
    fontSize: "12px",
  },
});

interface Props {
  operators: Record<string, Operator>;
  onClick: (op: Operator) => void;
  filter?: (op: any) => boolean;
}

const DataTabOperatorSelector = React.memo((props: Props) => {
  const { operators, onClick, filter } = props;
  const classes = useStyles();

  function sortComparator(a: any, b: any) {
    return (
      b.rarity - a.rarity ||
      a.name.localeCompare(b.name)
    );
  }

  // Operator Selector Component
  return (
    <div className={classes.mobileOpDisplay}>
      {
        Object.values(operatorJson)
          .filter(filter ?? (()=> true))
          .sort(sortComparator)
          .map((op: any) => {
            return <DataTabOperatorButton op={operators[op.id]} onClick={() => onClick(op)} />;
          })
      }
    </div>)
});
export default DataTabOperatorSelector;
