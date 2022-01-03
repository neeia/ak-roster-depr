import { makeStyles } from "@material-ui/core";
import React from "react";
import { defaultSortComparator, Operator } from "../App";
import OperatorCollectionBlock from "./OperatorCollectionBlock";


const useStyles = makeStyles({
  collectionContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, 264px)",
    width: "100%",
  },
});

interface Props {
  operators: Record<string, Operator>;
}

const CollectionTab = React.memo((props: Props) => {
  const classes = useStyles();
  const { operators } = props;

  return (
    <div className={classes.collectionContainer}>
      {Object.values(operators)
      .filter((op: any) => operators[op.id].owned && operators[op.id].potential > 0)
      .sort((a: any, b: any) =>
        defaultSortComparator(operators[a.id], operators[b.id])
      )
      .map((op: any) => (
        <OperatorCollectionBlock key={op.id} op={operators[op.id]} />
      ))}
    </div>
  );

});
export default CollectionTab;
