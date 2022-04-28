import React from "react";
import { Operator } from "../../App";
import operatorJson from "../../data/operators.json";
import { makeStyles } from "@material-ui/core";
import DataTabOperatorButton from "./DataTabOperatorButton";

const useStyles = makeStyles({
  opDisplay: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, 90px)",
    justifyContent: "center",
    gridGap: "3px",
    margin: "0px",
    padding: "0px",
  },
  li: {
    listStyleType: "none",
  },
});

interface Props {
  operators: Record<string, Operator>;
  onClick: (op: Operator) => void;
  filter?: (op: any) => boolean;
  toggleGroup?: string[];
}

const DataTabOperatorSelector = React.memo((props: Props) => {
  const { operators, onClick, filter, toggleGroup } = props;
  const classes = useStyles();

  function sortComparator(a: any, b: any) {
    return (
      b.rarity - a.rarity ||
      a.name.localeCompare(b.name)
    );
  }

  // Operator Selector Component
  return (
    <ul className={classes.opDisplay}>
      {
        Object.values(operatorJson)
          .filter((op: any) => op.class !== "Token" && op.class !== "Trap")
          .filter(filter ?? (() => true))
          .sort(sortComparator)
          .map((op: any) => {
            return <li className={classes.li} key={op.id}>
              <DataTabOperatorButton
                op={operators[op.id]}
                onClick={() => onClick(op)}
                toggleGroup={toggleGroup ?? []}
              />
            </li>
          })
      }
    </ul>)
});
export default DataTabOperatorSelector;
