import React from "react";
import slugify from "slugify";
import { Operator } from "../App";
import { makeStyles } from "@material-ui/core";
import { useRarityStyles } from "./StyleRarityUnderline";
import clsx from "clsx";
import FormButton from "./FormButton";

const useStyles = makeStyles({
  iconStack: {
    display: "grid"
  },
  opIcon: {
    width: "64px",
    height: "64px",
    marginBottom: "2px",
    gridArea: "1 / 1",
    textAlign: "left",
    lineHeight: "112px",
  },
  opButton: {
    display: "flex",
    width: "94px",
    flexDirection: "column",
    boxShadow: "2px 2px 8px rgb(0 0 0 / 30%)",
  },
  opName: {
    fontSize: "12px",
    marginTop: "4px",
  },
  unowned: {
    opacity: "0.5",
  },
});

interface Props {
  op: Operator;
  onClick: () => void;
}

const DataTabOperatorButton = React.memo((props: Props) => {
  const classes = useStyles();
  const rarity = useRarityStyles();
  const { op, onClick } = props;

  // turns Skadi the Corrupting Heart into Skadi (CH)
  function titlefy(title: string): string {
    return title ? " (" + title?.split(" ").map((value: string) => value.charAt(0)).join("") + ")" : "";
  }

  // Process operator name
  let opName = (
    <span className={classes.opName}>
      {op.name.split(" the ")[0].split(" (")[0]}
      {(titlefy(op.name.split(" the ")[1]))}
      {(titlefy(op.name.split(" (")[1]))}
    </span>
  )
  const opIconStyle = clsx({
    [rarity.rarityOne]: op.rarity === 1,
    [rarity.rarityTwo]: op.rarity === 2,
    [rarity.rarityThree]: op.rarity === 3,
    [rarity.rarityFour]: op.rarity === 4,
    [rarity.rarityFive]: op.rarity === 5,
    [rarity.raritySix]: op.rarity === 6,
    [classes.opIcon]: true,
    [classes.unowned]: !op.owned
  })

  let intermediate = op.name;
  const elt = op["promotion"];
  if (elt === 2) {
    intermediate += " elite 2";
  } else if (elt === 1 && op.name === "Amiya") {
    intermediate += " elite 1";
  }
  const imgUrl = `https://res.cloudinary.com/samidare/image/upload/v1/arknights/operators/${slugify(
    intermediate,
    { lower: true, replacement: "-", remove: /[-"]/g }
  )}`;


  return (
    <FormButton className={classes.opButton} onClick={onClick} key={op.id}>
      <div className={classes.iconStack}>
        <img
          className={opIconStyle}
          src={imgUrl}
          alt=""
        />
        <div className={classes.opIcon}>
          {op.favorite ? "❤️" : ""}
        </div>
      </div>
      {opName}
    </FormButton>
  );
});
export default DataTabOperatorButton;
