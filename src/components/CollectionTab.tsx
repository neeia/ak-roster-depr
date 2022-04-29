import React, { useState } from "react";
import { Operator } from "../App";
import operatorJson from "../data/operators.json";
import { makeStyles } from "@material-ui/core";
import OperatorCollectionBlock from "./collectionTab/OperatorCollectionBlock";
import { classList } from "./DataTab";
import SelectorClass from "./dataTab/SelectorClass";
import SelectorRarity from "./dataTab/SelectorRarity";
import Drawer from "./Drawer";
import SelectorSortOptions from "./collectionTab/SelectorSortOptions";
import useLocalStorage from "../UseLocalStorage";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
  },
  collectionContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "12px 11px",
  },
  drawerBox: {
    width: "100%",
    maxWidth: "800px",
    display: "flex",
    flexDirection: "column",
    justifySelf: "center",
  },
  horizontalDivider: {
    backgroundColor: "#909090",
    width: "70%",
    height: "2px",
    borderWidth: "0px",
    marginTop: "6px",
    marginBottom: "6px",
    marginLeft: "20px",
  },
});

interface Props {
  operators: Record<string, Operator>;
}

const CollectionTab = React.memo((props: Props) => {
  const { operators } = props;
  const classes = useStyles();

  const [selectedClasses, setSelectedClasses] = useState<string[]>([]);
  const [selectedRarities, setSelectedRarities] = useState<number[]>([]);
  const [sortFavorites, setSortFavorites] = useLocalStorage<boolean>("sortFav", false);
  const filterBar =
    <Drawer
      label={"Filter"}
    >
      <SelectorClass
        onClick={((cl: string) => {
          const index = selectedClasses.indexOf(cl);
          if (index > -1) {
            selectedClasses.splice(index, 1)
            setSelectedClasses(selectedClasses => [...selectedClasses]);
          }
          else {
            setSelectedClasses(selectedClasses => [...selectedClasses, cl]);
          }
        })}
        activeClasses={selectedClasses}
      />
      <SelectorRarity
        onClick={((rar: number) => {
          const index = selectedRarities.indexOf(rar);
          if (index > -1) {
            selectedRarities.splice(index, 1)
            setSelectedRarities(selectedRarities => [...selectedRarities]);
          }
          else {
            setSelectedRarities(selectedRarities => [...selectedRarities, rar]);
          }
        })}
        activeRarities={selectedRarities}
      />
      <SelectorSortOptions
        sortFav={sortFavorites}
        setSortFav={setSortFavorites}
        clearFilter={() => {
          setSelectedClasses([]);
          setSelectedRarities([]);
          setSortFavorites(false);
        }}
      />
    </Drawer>

  const filterObject = (op: any) => {
    const a = operators[op.id];
    return a.owned
      && (selectedClasses.length === 0 || selectedClasses.includes(op.class))
      && (selectedRarities.length === 0 || selectedRarities.includes(op.rarity))
  }

  function defaultSortComparator(x: any, y: any) {
    const a = operators[x.id];
    const b = operators[y.id];
    return (
      (b.favorite ? 1 : 0) - (a.favorite ? 1 : 0) ||
      (b.owned ? 1 : 0) - (a.owned ? 1 : 0) ||
      b.promotion - a.promotion ||
      b.level - a.level ||
      b.rarity - a.rarity ||
      classList.indexOf(x.class) - classList.indexOf(y.class) ||
      (b.module?.length ?? 0) - (a.module?.length ?? 0) ||
      a.name.localeCompare(b.name)
    );
  }

  const collection =
    Object.values(operatorJson)
      .filter((op: any) => op.class !== "Token" && op.class !== "Trap")
      .filter(filterObject)
      .sort(defaultSortComparator)

  return (
    <div className={classes.container}>
      <div className={classes.drawerBox}>
        {filterBar}
      </div>
      <div className={classes.horizontalDivider} />
      <div className={classes.collectionContainer}>
        {collection
          .map((op: any) => (
            <OperatorCollectionBlock key={op.id} op={operators[op.id]} />
          ))
        }
      </div>
    </div>
  );

});
export default CollectionTab;
