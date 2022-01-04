import { makeStyles } from "@material-ui/core";
import React, { useState } from "react";
import { defaultSortComparator, Operator, MOBILE_BREAKPOINT, TABLET_BREAKPOINT } from "../App";
import CollectionTabNavbar from "./CollectionTabNavbar";
import OperatorCollectionBlock from "./OperatorCollectionBlock";
import useViewportWidth from "./UseWindowSize";


const useStyles = makeStyles({
  collectionContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, 236px)",
    gap: "10px",
  },
  collectionContainerMobile: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, 320px)",
  },
});

interface Props {
  operators: Record<string, Operator>;
}

const CollectionTab = React.memo((props: Props) => {
  const classes = useStyles();
  const { operators } = props;

  const collection = Object.values(operators)
    .filter((op: any) => operators[op.id].owned && operators[op.id].potential > 0)
    .sort((a: any, b: any) =>
      defaultSortComparator(operators[a.id], operators[b.id])
    );

  const [selectedClass, setSelectedClass] = useState("");
  const width = useViewportWidth();
  const numOps = 21;
  const [page, setPage] = useState(1);
  const numPages = Math.ceil(collection.length / numOps);

  function validSetPage(newPage: number): void {
    if (newPage > 0 && newPage <= numPages) {
      setPage(newPage);
    }
  }

  return (
    <div>
      <CollectionTabNavbar page={page} setPage={validSetPage} numPages={numPages} />
      <div className={width <= MOBILE_BREAKPOINT ? classes.collectionContainerMobile : classes.collectionContainer}>
        {collection.slice(numOps * (page - 1), numOps * page)
          .map((op: any) => (
            <OperatorCollectionBlock key={op.id} op={operators[op.id]} />
          ))
        }
      </div>
    </div>
  );

});
export default CollectionTab;
