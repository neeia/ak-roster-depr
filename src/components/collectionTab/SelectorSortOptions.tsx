import React from "react";
import { Grid, makeStyles } from "@material-ui/core";
import FormButton from "../FormButton";
import { useDataStyles } from "../dataTab/DataTabSharedStyles";
import clsx from "clsx";
import Drawer from "../Drawer";
import { SortMode } from "../CollectionTab";

const useStyles = makeStyles({
  button: {
    padding: "8px 4px 6px 4px",
  },
});

interface Props {
  sortFav: boolean;
  setSortFav: (fav: boolean) => void;
  sortMode: SortMode;
  setSortMode: (sm: SortMode) => void;
  clearFilter: () => void;
}

const SelectorSortOptions = React.memo((props: Props) => {
  const { sortFav, setSortFav, sortMode, setSortMode, clearFilter } = props;
  const classes = useStyles();
  const style = useDataStyles();

  const buttonClass = clsx({ [style.filterButton]: true, [classes.button]: true})

  const sortLevel =
    <FormButton
      className={buttonClass}
      onClick={() => setSortMode(SortMode.Level)}
      toggled={sortMode === SortMode.Level}
    >
      {"Sort Level"}
    </FormButton>
  const sortRarity =
    <FormButton
      className={buttonClass}
      onClick={() => setSortMode(SortMode.Rarity)}
      toggled={sortMode === SortMode.Rarity}
    >
      {"Sort Rarity"}
    </FormButton>

  const favButton =
    <FormButton
      className={buttonClass}
      onClick={() => setSortFav(!sortFav)}
      toggled={sortFav}
    >
      {"Favorites"}
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
        <Grid item xs={3}>
          {sortLevel}
        </Grid>
        <Grid item xs={3}>
          {sortRarity}
        </Grid>
        <Grid item xs={3}>
          {favButton}
        </Grid>
        <Grid item xs={3}>
          {filterButton}
        </Grid>
      </Grid>
    </Drawer>
  );
});
export default SelectorSortOptions;
