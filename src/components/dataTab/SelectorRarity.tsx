import React from "react";
import { Grid, makeStyles } from "@material-ui/core";
import FormButton from "../FormButton";
import { useDataStyles } from "./DataTabSharedStyles";
import { useRarityStyles } from "../StyleRarityUnderline";
import clsx from "clsx";
import Drawer from "../Drawer";
import { MdStarBorder } from "react-icons/md";

const useStyles = makeStyles({
  labelContainer: {
    display: "grid",
    gridTemplateColumns: "1fr auto",
    alignItems: "center",
  },
  h4: {
    display: "inline",
    fontSize: "14px",
    margin: "0px",
    fontWeight: "normal",
    justifySelf: "center",
    alignSelf: "center",
    textAlign: "end",
  },
  buttonText: {
    display: "flex",
    fontSize: "14px",
    marginTop: "2px",
    marginBottom: "2px",
    paddingBottom: "2px",
    justifyContent: "center",
    alignItems: "center",
  },
});

interface Props {
  onClick: (rarity: number) => void;
  activeRarities: number[];
}

const SelectorRarity = React.memo((props: Props) => {
  const { onClick, activeRarities } = props;
  const classes = useStyles();
  const style = useDataStyles();
  const rarity = useRarityStyles();

  return (
    <Drawer label={"Rarity"} open={true} labelClass={style.drawer2}>
      <Grid container>
        <Grid container item xs={12} sm={12}>
          {[...Array(6)].map((_: any, rar: number) => {
            rar++;
            return (
              <Grid item xs={2} key={rar}>
                <FormButton
                  className={style.filterButton}
                  onClick={(() => onClick(rar))}
                  toggled={activeRarities.includes(rar)}
                >
                  <div className={clsx({
                    [rarity.rarityOne]: rar === 1,
                    [rarity.rarityTwo]: rar === 2,
                    [rarity.rarityThree]: rar === 3,
                    [rarity.rarityFour]: rar === 4,
                    [rarity.rarityFive]: rar === 5,
                    [rarity.raritySix]: rar === 6,
                    [style.filterButton]: true,
                    [classes.buttonText]: true,
                  })}>
                    {rar}
                    <MdStarBorder size={14} />
                  </div>
                </FormButton>
              </Grid>
            ) // end return
          })
          }
        </Grid>
      </Grid>
    </Drawer>
  );
});
export default SelectorRarity;
