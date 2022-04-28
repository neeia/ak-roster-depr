import React from "react";
import slugify from "slugify";
import { Operator } from "../../App";
import { makeStyles } from "@material-ui/core";
import { useRarityStyles } from "../StyleRarityUnderline";
import clsx from "clsx";
import FormButton from "../FormButton";
import { MdFavorite } from "react-icons/md";

const useStyles = makeStyles({
  opButton: {
    display: "flex",
    width: "90px",
    flexDirection: "column",
    boxShadow: "2px 2px 8px rgb(0 0 0 / 30%)",
  },
  iconStack: {
    display: "grid"
  },
  opIcon: {
    width: "64px",
    height: "67px",
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
    fontSize: "13px",
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

interface Props {
  op: Operator;
  onClick: () => void;
  toggleGroup?: string[]
}

const DataTabOperatorButton = React.memo((props: Props) => {
  const classes = useStyles();
  const rarity = useRarityStyles();
  const { op, onClick, toggleGroup } = props;

  const reg = /( the )|\(/g;
  const nameSplitTitle = op.name.split(reg);
  const name = nameSplitTitle.length > 1 ? nameSplitTitle[2].split(")")[0] : nameSplitTitle[0];
  const nameIsLong = name.split(" ").length > 1 && name.length > 11;

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

  let intermediate = op.name;
  const elt = op["promotion"];
  if (elt === 2) {
    intermediate += " elite 2";
  } else if (elt === 1 && op.name === "Amiya") {
    intermediate += " elite 1";
  }
  const imgUrl = `https://res.cloudinary.com/samidare/image/upload/f_auto,h_256,w_256/v1/arknights/operators/${slugify(
    intermediate,
    { lower: true, replacement: "-", remove: /[-"]/g }
  )}`;


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
            size={18}
            color={"#ff4d4d"}
          />
          : ""}
      </div>
      {opName}
    </FormButton>
  )
});
export default DataTabOperatorButton;
