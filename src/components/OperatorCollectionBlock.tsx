import { makeStyles } from "@material-ui/core";
import React from "react";
import slugify from "slugify";
import { Operator } from "../App";
import SkillDisplayBox from "./SkillDisplayBox";
import clsx from "clsx";

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
  },
  opIconArea: {
    gridArea: "img",
    width: "60px",
    height: "60px",
    marginRight: "4px"
  },
  fav: {
    gridArea: "img",
    fontSize: "18px",
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
    fontSize: "14px",
  },
  raritySix: {
    boxShadow: "0px 3px #f96601",
  },
  rarityFive: {
    boxShadow: "0px 3px #fbae02",
  },
  rarityFour: {
    boxShadow: "0px 3px #dbb1db",
  },
  rarityThree: {
    boxShadow: "0px 3px #00b2f6",
  },
  rarityTwo: {
    boxShadow: "0px 3px #dce537",
  },
  rarityOne: {
    boxShadow: "0px 3px #9f9f9f",
  }
});

interface Props {
  op: Operator;
}

const OperatorCollectionBlock = React.memo((props: Props) => {
  const { op } = props;
  const classes = useStyles();

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
          {"  " + splitName[1]}
        </span>
      </span>
    )
  }

  // merge operator portrait with rarity drop-shadow
  const opIconStyle = clsx({
    [classes.rarityOne]: op.rarity == 1,
    [classes.rarityTwo]: op.rarity == 2,
    [classes.rarityThree]: op.rarity == 3,
    [classes.rarityFour]: op.rarity == 4,
    [classes.rarityFive]: op.rarity == 5,
    [classes.raritySix]: op.rarity == 6,
    [classes.opIconArea]: true,
  })

  return (
    <div className={classes.opContainer}>
      <img
        src={opImgUrl}
        className={opIconStyle}
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
