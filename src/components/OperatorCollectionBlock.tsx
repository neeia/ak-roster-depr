import React from "react";
import slugify from "slugify";
import { Operator } from "../App";
import { makeStyles } from "@material-ui/core";
import { useRarityStyles } from "./StyleRarityUnderline";
import clsx from "clsx";
import SkillDisplayBox from "./SkillDisplayBox";

const useStyles = makeStyles({
  opContainer: {
    display: "grid",
    gridTemplateAreas: `"img name"
                       "img info"`,
    gridTemplateRows: "auto auto",
    gridTemplateColumns: "auto 1fr",
    width: "300px",
    padding: "4px",
    border: "1px solid white",
    borderRadius: "4px",
    backgroundColor: "#333333",
    boxShadow: "2px 2px 8px rgb(0 0 0 / 30%)",
    margin: "6px",
  },
  opIconArea: {
    gridArea: "img",
    width: "60px",
    height: "60px",
    marginRight: "4px"
  },
  fav: {
    gridArea: "img",
    fontSize: "16px",
    alignSelf: "end",
  },
  opNameArea: {
    gridArea: "name",
  },
  opInfoArea: {
    gridArea: "info",
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr) 12px repeat(3, 1fr)",
  },
  opInfoIcon: {
    fontSize: "24px",
    textAlign: "center",
    width: "30px",
    height: "30px",
  },
  opName: {
    fontSize: "24px",
  },
  alterTitle: {
    marginLeft: "8px",
    fontSize: "14px",
  },
});

interface Props {
  op: Operator;
}

const OperatorCollectionBlock = React.memo((props: Props) => {
  const { op } = props;
  const classes = useStyles();
  const rarity = useRarityStyles();

  let intermediate = op.name;
  if (op.promotion === 2) {
    intermediate += " elite 2";
  } else if (op.promotion === 1 && op.name === "Amiya") {
    intermediate += " elite 1";
  }

  const potentialUrl = `https://res.cloudinary.com/samidare/image/upload/v1/arknights/potential/${op.potential}`;
  const promotionUrl = `https://res.cloudinary.com/samidare/image/upload/v1/arknights/elite/${op.promotion}`;
  const opImgUrl = `https://res.cloudinary.com/samidare/image/upload/v1/arknights/operators/${slugify(
    intermediate,
    { lower: true, replacement: "-", remove: /[-"]/g }
  )}`;

  let opName = (
    <span className={classes.opName}>
      {op.name}
    </span>
  )
  if (op.name.includes(" the ")) {
    const splitName = op.name.split(" the ");
    opName = (
      <span>
        <span className={classes.opName}>
          {splitName[0]}
        </span>
        <span className={classes.alterTitle}>
          {splitName[1]}
        </span>
      </span>
    )
  }

  // merge operator portrait with rarity drop-shadow
  const opIconStyle = clsx({
    [rarity.rarityOne]: op.rarity === 1,
    [rarity.rarityTwo]: op.rarity === 2,
    [rarity.rarityThree]: op.rarity === 3,
    [rarity.rarityFour]: op.rarity === 4,
    [rarity.rarityFive]: op.rarity === 5,
    [rarity.raritySix]: op.rarity === 6,
    [classes.opIconArea]: true,
  })

  return (
    <div className={classes.opContainer}>
      <img
        src={opImgUrl}
        className={opIconStyle}
        alt=""
      />
      <div className={classes.fav}>
        {op.favorite ? "❤️" : ""}
      </div>
      <div className={classes.opNameArea}>
        {opName}
      </div>
      <div className={classes.opInfoArea}>
        <img
          src={promotionUrl}
          className={classes.opInfoIcon}
          alt={`Elite ${op.promotion} icon`}
        />
        <span className={classes.opInfoIcon}>
          {op.level}
        </span>
        <img
          src={potentialUrl}
          className={classes.opInfoIcon}
          alt={`Potential ${op.potential} icon`}
        />
        <div/>
        {(op.rarity > 2 ?
          <span className={classes.opInfoIcon}>
            <SkillDisplayBox operator={op} skill={1} />
          </span>
        : <div />)}
        {(op.rarity > 3 ?
          <span className={classes.opInfoIcon}>
            <SkillDisplayBox operator={op} skill={2} />
          </span>
        : <div />)}
        {(op.rarity === 6 || op.name === "Amiya" ?
          <span className={classes.opInfoIcon}>
            <SkillDisplayBox operator={op} skill={3} />
          </span>
        : <div />)}
      </div>
    </div>
  );
});
export default OperatorCollectionBlock;
