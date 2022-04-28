import React, { useState } from "react";
import { defaultSortComparator, Operator } from "../App";
import operatorJson from "../data/operators.json";
import useWindowSize, { Size } from "./UseWindowSize";
import { makeStyles } from "@material-ui/core";
import CollectionTabNavbar from "./CollectionTabNavbar";
import OperatorCollectionBlock from "./OperatorCollectionBlock";


const useStyles = makeStyles({
  collectionContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "12px 16px",
  },
});

interface Props {
  operators: Record<string, Operator>;
}

const CollectionTab = React.memo((props: Props) => {
  const classes = useStyles();
  const { operators } = props;

  const size: Size = useWindowSize();
  const widthOfBox = 160 + 16;
  const heightOfBox = 140 + 12;
  
  const width = size.width === undefined ? 1920 : size.width;
  const x = Math.floor((width * 0.99) / widthOfBox);
  const height = size.height === undefined ? 1080 : size.height;
  const y = Math.floor((height - 120) / heightOfBox);

  const none = "none";
  const [filterType, setFilterType] = useState(none);
  const [filter, setFilter] = useState<string | number>(none);
  
  const collection = Object.values(operatorJson)
    .filter((op: any) => operators[op.id].owned && operators[op.id].potential > 0)
    .filter((op: any) => filterType !== none && filter !== none ? op[filterType] === filter : true)
    .sort((a: any, b: any) =>
      defaultSortComparator(operators[a.id], operators[b.id])
    );

  const numOps = x * y;
  const [page, setPage] = useState(1);
  const numPages = Math.ceil(collection.length / numOps);

  function updateFilterType(newFilterType: string): void {
    setFilterType(filterType === newFilterType ? none : newFilterType);
    updateFilter(none);
  }
  function updateFilter(newFilter: string | number): void {
    setFilter(filter === newFilter ? none : newFilter);
  }

  function validSetPage(newPage: number): void {
    if (newPage > 0 && newPage <= numPages) {
      setPage(newPage);
    }
  }

  return (
    <div>
      <CollectionTabNavbar
        page={page}
        setPage={validSetPage}
        numPages={numPages}
        filterType={filterType}
        setFilterType={updateFilterType}
        filter={filter}
        setFilter={updateFilter}
      />
      <div className={classes.collectionContainer}>
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
