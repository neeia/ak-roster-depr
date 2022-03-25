import React from "react";
import { Operator } from "../App";
import { makeStyles } from "@material-ui/core";
import FormButton from "./FormButton";

const useStyles = makeStyles({
  container: {
    display: "grid",
    gridTemplateColumns: "auto auto 1fr",
  },
  label: {
    fontSize: "18px",
    marginBottom: "4px",
    lineHeight: "20px",
    width: "96px",
    borderBottom: "2px solid #909090",
    justifySelf: "center",
  },
  /* OWNED, FAV */
  ownedFavContainer: {
    display: "grid",
    gridTemplateRows: "auto 1fr",
    width: "150px",
    justifyItems: "center",
  },
  ownedFavRow: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    justifyItems: "center",
  },
  ownedButton: {
    width: "40px",
    height: "40px",
    marginTop: "4px",
    display: "grid",
    gridTemplateAreas: `"stack"`,
    marginRight: "4px",
  },
  favButton: {
    width: "40px",
    height: "40px",
    marginTop: "4px",
    display: "grid",
    gridTemplateAreas: `"stack"`,
    marginLeft: "4px",
  },
  /* DIVIDER */
  verticalDivider: {
    backgroundColor: "#909090",
    width: "2px",
    height: "44px",
    alignSelf: "end",
    marginLeft: "8px",
    marginRight: "8px",
  },
  /* POTENTIAL */
  potentialContainer: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    justifyContent: "start",
    alignItems: "center",
    width: "275px",
  },
  potentialButtonContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(6, 1fr)",
  },
  potentialButton: {
    width: "40px",
    height: "40px",
    marginTop: "4px",
    display: "grid",
    gridTemplateAreas: `"stack"`,
    "& +$potentialButton": {
      marginRight: "4px",
    },
  },
  potentialIcon: {
    gridArea: "stack",
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

  return (
    <div className={classes.container}>
      {/* Owned, Favorite */}
      <div className={classes.ownedFavContainer} >
        <div className={classes.label}>
          General
        </div>
        <div className={classes.ownedFavRow}>
          <FormButton
            className={classes.ownedButton}
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
            className={classes.favButton}
            onClick={() => onChange(op.id, "favorite", !op.favorite)}
            toggled={op.favorite}
          >
            {op.favorite ? "❤️" : "🤍"}
          </FormButton>
        </div>
      </div>
      <div className={classes.verticalDivider} />
      {/* Potential */}
      <div className={classes.potentialContainer}>
        <div className={classes.label} >
          Potential
        </div>
        <div className={classes.potentialButtonContainer}>
          {[...Array(6)].map((_, i) => {
            const disabled = !op.owned;
            return (
              <FormButton
                key={`potential${i + 1}Button`}
                className={classes.potentialButton}
                onClick={() => onChange(op.id, "potential", i + 1)}
                toggled={op.potential === i + 1}
                disabled={disabled}
              >
                <img
                  className={op.potential === i + 1 ? classes.potentialIcon : classes.potentialIconUnselected}
                  src={`https://res.cloudinary.com/samidare/image/upload/v1/arknights/potential/${i + 1}`}
                  alt={`Potential ${i+1} Button`}
                />
              </FormButton>
            )
          })}
        </div>
      </div>
    </div>
  );
});
export default DataEntryCollect;
