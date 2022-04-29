import React from "react";
import { Grid, makeStyles } from "@material-ui/core";
import FormButton from "../FormButton";
import { useDataStyles } from "../dataTab/DataTabSharedStyles";
import clsx from "clsx";
import Drawer from "../Drawer";

const useStyles = makeStyles({
  button: {
    padding: "8px 4px 6px 4px",
  },
});

interface Props {
  sortFav: boolean;
  setSortFav: (fav: boolean) => void;
  clearFilter: () => void;
}

const SelectorSortOptions = React.memo((props: Props) => {
  const { sortFav, setSortFav, clearFilter } = props;
  const classes = useStyles();
  const style = useDataStyles();

  const buttonClass = clsx({ [style.filterButton]: true, [classes.button]: true})

  const favButton =
    <FormButton
      className={buttonClass}
      onClick={() => setSortFav(!sortFav)}
      toggled={sortFav}
    >
      {sortFav ? "Group Favorites" : "Ungroup Favorites"}
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
        <Grid item xs={2} />
        <Grid item xs={3}>
          {favButton}
        </Grid>
        <Grid item xs={2} />
        <Grid item xs={3}>
          {filterButton}
        </Grid>
        <Grid item xs={2} />
      </Grid>
    </Drawer>
  );
});
export default SelectorSortOptions;
