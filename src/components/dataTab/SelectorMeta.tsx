import React from "react";
import { Grid, makeStyles } from "@material-ui/core";
import FormButton from "../FormButton";
import { useDataStyles } from "./DataTabSharedStyles";
import clsx from "clsx";
import Drawer from "../Drawer";

const useStyles = makeStyles({
  button: {
    padding: "8px 4px 6px 4px",
  },
});

interface Props {
  activeOwned: boolean | undefined;
  setActiveOwned: (own: boolean | undefined) => void;
  showCNOps: boolean;
  setShowCNOps: (cn: boolean) => void;
  sortFav: boolean;
  setSortFav: (fav: boolean) => void;
  clearFilter: () => void;
}

const SelectorMeta = React.memo((props: Props) => {
  const { activeOwned, setActiveOwned, showCNOps, setShowCNOps, sortFav, setSortFav, clearFilter } = props;
  const classes = useStyles();
  const style = useDataStyles();

  const buttonClass = clsx({ [style.filterButton]: true, [classes.button]: true})

  const ownedButton =
    <FormButton
      className={buttonClass}
      onClick={() => setActiveOwned(activeOwned ? undefined : true)}
      toggled={activeOwned}
    >
      {"Owned"}
    </FormButton>
  const unownedButton =
    <FormButton
      className={buttonClass}
      onClick={() => setActiveOwned(activeOwned === false ? undefined : false)}
      toggled={activeOwned === false}
    >
      {"Unowned"}
    </FormButton>

  const cnButton =
    <FormButton
      className={buttonClass}
      onClick={() => setShowCNOps(!showCNOps)}
      toggled={showCNOps}
    >
      {showCNOps ? "All Operators" : "EN Operators"}
    </FormButton>

  const favButton =
    <FormButton
      className={buttonClass}
      onClick={() => setSortFav(!sortFav)}
      toggled={sortFav}
    >
      {sortFav ? "Sorting Favorites" : "Group Favorites"}
    </FormButton>

  const filterButton =
    <FormButton
      className={buttonClass}
      onClick={clearFilter}
    >
      Reset Filter
    </FormButton>

  return (
    <Drawer label={"Display"} open={true} labelClass={style.drawer2}>
      <Grid container>
        <Grid item xs={2}>
          {ownedButton}
        </Grid>
        <Grid item xs={2}>
          {unownedButton}
        </Grid>
        <Grid item xs={3}>
          {cnButton}
        </Grid>
        <Grid item xs={3}>
          {favButton}
        </Grid>
        <Grid item xs={2}>
          {filterButton}
        </Grid>
      </Grid>
    </Drawer>
  );
});
export default SelectorMeta;
