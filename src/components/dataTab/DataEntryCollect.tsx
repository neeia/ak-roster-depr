import React from "react";
import { Operator } from "../../App";
import { Grid, Hidden, makeStyles } from "@material-ui/core";
import FormButton from "../FormButton";
import { useDataStyles } from "./DataTabSharedStyles";
import clsx from "clsx";
import DataLabel from "./DataLabel";

const useStyles = makeStyles({
  /* OWNED, FAV */
  ownedFavRow: {
    display: "flex",
    justifyItems: "center",
    gap: "4px",
  },
  ofButton: {
    width: "40px",
    height: "40px",
    display: "grid",
    gridTemplateAreas: `"stack"`,
    flexGrow: 1,
  },
  /* POTENTIAL */
  potentialButton: {
    width: "calc(100% - 2px)",
    height: "40px",
  },
  potentialIcon: {
    width: "32px",
    height: "32px",
  },
  potentialIconUnselected: {
    gridArea: "stack",
    width: "32px",
    height: "32px",
    opacity: "0.75",
  },
});

interface Props {
  op: Operator;
  onChange: (
    operatorId: string,
    property: string,
    value: number | boolean
  ) => void;
}

const DataEntryCollect = React.memo((props: Props) => {
  const { op, onChange } = props;
  const classes = useStyles();
  const style = useDataStyles();

  return (
    <Grid container>
      {/* Owned, Favorite */}
      <Grid item xs={12} sm={4} >
        <Grid container>
          <DataLabel label={"General"} part={false} />
          <DataLabel label={"General"} part={true} />
          <Grid item xs={7} sm={12} className={clsx({ [classes.ownedFavRow]: true, [style.block]: true })}>
            <FormButton
              className={classes.ofButton}
              onClick={() => {
                onChange(op.id, "owned", !op.owned);
              }}
              toggled={op.owned}
            >
              <div>
                Own
              </div>
            </FormButton>
            <FormButton
              className={classes.ofButton}
              onClick={() => onChange(op.id, "favorite", !op.favorite)}
              toggled={op.favorite}
            >
              {op.favorite ? "❤️" : "🤍"}
            </FormButton>
          </Grid>
        </Grid>
      </Grid>
      <Hidden xsDown>
        <Grid item sm={1} className={style.dividerContainer}>
          <hr className={style.verticalDivider} />
        </Grid>
      </Hidden>
      <Hidden smUp>
        <Grid item xs={12}>
          <hr className={style.horizontalDivider} />
        </Grid>
      </Hidden>
      {/* Potential */}
      <Grid item xs={12} sm={7}>
        <Grid container>
          <DataLabel label={"Potential"} part={false} />
          <DataLabel label={"Potential"} part={true} />
          <Grid item xs={7} sm={12}>
            <Grid container className={style.block}>
              {[...Array(6)].map((_, i) => {
                const disabled = !op.owned;
                return (
                  <Grid item xs={4} sm={2} key={`potential${i + 1}Button`}>
                    <FormButton
                      className={classes.potentialButton}
                      onClick={() => onChange(op.id, "potential", i + 1)}
                      toggled={op.potential === i + 1}
                      disabled={disabled}
                    >
                      <img
                        className={op.potential === i + 1 ? classes.potentialIcon : classes.potentialIconUnselected}
                        src={`https://res.cloudinary.com/samidare/image/upload/v1/arknights/potential/${i + 1}`}
                        alt={`Potential ${i + 1} Button`}
                      />
                    </FormButton>
                  </Grid>
                )
              })}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
});
export default DataEntryCollect;
