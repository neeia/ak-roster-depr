import React from "react";
import { Operator } from "../../App";
import { makeStyles } from "@material-ui/core";
import { useRarityStyles } from "../StyleRarityUnderline";
import clsx from "clsx";
import FormButton from "../FormButton";
import { MdFavorite } from "react-icons/md";

const useStyles = makeStyles({
  opButton: {
    display: "flex",
    width: "78px",
    flexDirection: "column",
    boxShadow: "2px 2px 8px rgb(0 0 0 / 30%)",
  },
  iconStack: {
    display: "grid"
  },
  opIcon: {
    width: "60px",
    height: "63px",
    marginBottom: "2px",
    gridArea: "1 / 1",
    textAlign: "left",
    lineHeight: "112px",
  },
  fav: {
    gridArea: "1 / 1",
    textAlign: "left",
    lineHeight: "112px",
  },
  opNameContainer: {
    height: "20px",
    marginBottom: "1px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  opName: {
    fontSize: "14px",
  },
  lineWrap: {
    marginTop: "2px",
    fontSize: "11px",
    lineHeight: "10px",
  },
  unowned: {
    opacity: "0.5",
  },
});


function getTextWidth(text: string, font: string): number {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  if (context) {
    context.font = font;
    const metrics = context.measureText(text);
    return metrics.width;
  }
  return 0;
}

interface Props {
  op: Operator;
  onClick: () => void;
  toggleGroup?: string[]
}

const DataTabOperatorButton = React.memo((props: Props) => {
  const classes = useStyles();
  const rarity = useRarityStyles();
  const { op, onClick, toggleGroup } = props;
  
  const nameSplitTitle = op.name.split(" the ");
  const name = nameSplitTitle.length > 1 ? nameSplitTitle[1] : nameSplitTitle[0];
  const nameIsLong = getTextWidth(op.name, classes.opName) > 48;

  // Process operator name
  let opName = (nameSplitTitle.length > 1
    ?
    <span className={classes.opNameContainer}>
      <abbr
        title={op.name}
        className={nameIsLong ? classes.lineWrap : classes.opName}
      >
        {nameIsLong
          ? <span>
            {name.split(" ")[0]}
            <br />
            {name.split(" ")[1]}
          </span>
          : name}
      </abbr>
    </span>
    :
    <span className={classes.opNameContainer}>
      <div className={nameIsLong ? classes.lineWrap : classes.opName} >
        {name}
      </div>
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

  let intermediate = op.id;
  const elt = op["promotion"];
  if (elt === 2) {
    intermediate += "_2";
  } else if (elt === 1 && op.name === "Amiya") {
    intermediate += "_1+";
  }
  const imgUrl = `https://res.cloudinary.com/samidare/image/upload/f_auto/v1/arknights/avatars/${intermediate}`;


  return (
    <FormButton
      className={classes.opButton}
      onClick={onClick}
      toggled={toggleGroup?.includes(op.id) ?? false}
    >
      <div className={classes.iconStack}>
        <img
          className={opIconStyle}
          src={imgUrl}
          alt=""
        />
        {op.favorite
          ? <MdFavorite
            className={classes.fav}
            size={15}
            color={"#ff4d4d"}
          />
          : ""}
      </div>
      {opName}
    </FormButton>
  )
});
export default DataTabOperatorButton;
