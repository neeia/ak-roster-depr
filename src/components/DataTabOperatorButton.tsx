import React from "react";
import slugify from "slugify";
import { Operator } from "../App";
import { makeStyles } from "@material-ui/core";
import { useRarityStyles } from "./StyleRarityUnderline";
import clsx from "clsx";
import FormButton from "./FormButton";

const useStyles = makeStyles({
  opIcon: {
    width: "64px",
    height: "64px",
    marginBottom: "2px",
  },
  smallText: {
    fontSize: "12px",
  },
  opButton: {
    display: "flex",
    flexDirection: "column",
    boxShadow: "2px 2px 8px rgb(0 0 0 / 30%)",
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
    <span className={classes.smallText}>
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
      <div>
        <img
          className={opIconStyle}
          src={imgUrl}
          alt=""
        />
        <div>
          {opName}
        </div>
      </div>
    </FormButton>
  );
});
export default DataTabOperatorButton;
