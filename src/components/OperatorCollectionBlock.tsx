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
    gridTemplateAreas: `"name name"
                       "img skill"`,
    gridTemplateRows: "auto 1fr",
    gridTemplateColumns: "auto 1fr",
    padding: "4px",
    border: "1px solid #808080",
    borderRadius: "4px",
    backgroundColor: "#40403E",
    boxShadow: "2px 2px 8px rgb(0 0 0 / 30%)",
    margin: "4px 16px 20px 16px",
  },
  opNameArea: {
    gridArea: "name",
  },
  opName: {
    fontSize: "14px",
    lineHeight: "20px",
    marginLeft: "1px",
  },
  opNameSmaller: {
    fontSize: "12px",
    lineHeight: "20px",
  },
  alterName: {
    fontSize: "9px",
    lineHeight: "8px",
  },
  alterTitle: {
    fontSize: "12px",
    lineHeight: "12px",
  },
  opIconArea: {
    gridArea: "img",
    width: "120px",
    height: "120px",
  },
  fav: {
    gridArea: "img",
    fontSize: "16px",
    alignSelf: "end",
  },
  imgArea: {
    gridArea: "img",
    display: "grid",
    gridTemplateAreas: `"level"`,
    position: "relative",
  },
  levelPromotionContainer: {
    position: "absolute",
    left: "-12px",
    bottom: "-8px",
    display: "grid",
    gridTemplateAreas: `"potential" "elite" "level"`,
  },
  levelBubble: {
    gridArea: "level",
    width: "48px",
    height: "48px",
    fontSize: "26px",
    lineHeight: "26px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: "-4px",
    marginBottom: "-2px",
  },
  levelBubbleLabel: {
    gridArea: "level",
    fontSize: "9px",
    lineHeight: "3px",
    display: "flex",
  },
  promotionBox: {
    gridArea: "elite",
    width: "24px",
    height: "32px",
    display: "flex",
    alignItems: "end",
    justifyContent: "center",
    marginBottom: "4px",
  },
  promotionIcon: {
    width: "32px",
    height: "32px",
  },
  promotionBoxLabel: {
    gridArea: "elite",
    width: "24px",
    fontSize: "9px",
    lineHeight: "14px",
    color: "#EEEEEE",
    display: "grid",
    alignItems: "start",
    justifyContent: "center",
  },
  potentialBox: {
    display: "grid",
    gridTemplateAreas: `"potential"`,
    gridArea: "potential",
    marginLeft: "3px",
    marginBottom: "6px",
    justifySelf: "start",
  },
  potentialSVG: {
    gridArea: "potential",
    width: "25px",
    height: "28px",
    alignSelf: "center",
    justifySelf: "center",
  },
  potentialIcon: {
    gridArea: "potential",
    width: "24px",
    height: "24px",
    alignSelf: "center",
    justifySelf: "center",
  },
  opSkillArea: {
    position: "absolute",
    top: "8px",
    right: "-16px",
    gridArea: "skill",
    display: "flex",
    flexDirection: "column",
    alignSelf: "center",
    gap: "4px",
    marginLeft: "-6px"
  },
  middleSkill: {
    marginLeft: "0px",
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

  const reg = /( the )|\(/g;
  const nameSplitTitle = op.name.split(reg);
  const name = nameSplitTitle.length > 1 ? nameSplitTitle[2].split(")")[0] : nameSplitTitle[0];
  const nameIsLong = name.split(" ").length > 1 && name.length > 11;

  let opName = (
    <span className={nameIsLong ? classes.opNameSmaller : classes.opName}>
      {op.name}
    </span>
  )
  if (op.name.includes(" the ")) {
    const splitName = op.name.split(" the ");
    opName = (
      <span>
        <div className={classes.alterName}>
          {splitName[1]}
        </div>
        <div className={classes.alterTitle}>
          {splitName[0]}
        </div>
      </span>
    )
  }
  if (op.name.includes(" (")) {
    const name = op.name.split(" (");
    const title = name[1].split(")");
    opName = (
      <span>
        <span className={classes.opName}>
          {name[0]}
        </span>
        <span className={classes.alterTitle}>
          {title[0]}
        </span>
      </span>
    )
  }

  const potentialBlock =
    <div className={classes.potentialBox}>
      <svg
        className={classes.potentialSVG}
      >
        <rect x="0" y="0" className={classes.potentialSVG}
          fill="#323232" fillOpacity="0.95" stroke="#808080" strokeWidth="1" />
      </svg>
      <img
        src={potentialUrl}
        className={classes.potentialIcon}
        alt={`Potential ${op.potential} icon`}
      />
    </div>

  const levelBubble =
    <div className={classes.imgArea}>
      <div className={classes.levelPromotionContainer}>
        {potentialBlock}
        <svg
          className={classes.promotionBox}
        >
          <rect x="0" y="0" className={classes.promotionBox}
            fill="#323232" fillOpacity="0.95" stroke="#808080" strokeWidth="2" />
        </svg>
        <div className={classes.promotionBoxLabel}>
          E{op.promotion}
        </div>
        <div className={classes.promotionBox}>
          <img
            src={promotionUrl}
            className={classes.promotionIcon}
            alt={`Elite ${op.promotion} icon`}
          />
        </div>
        <svg
          className={classes.levelBubble}
        >
          <circle cx="24" cy="24" r="22" className={classes.levelBubble}
            fill="#323232" fillOpacity="0.95" stroke="#808080" strokeWidth="2" />
        </svg >
        <div className={classes.levelBubble} >
          <div className={classes.levelBubbleLabel}>
            LV
          </div>
          {op.level}
        </div >
      </div >
    </div>

  const skillBlock =
    <div className={classes.imgArea}>
      <div className={classes.opSkillArea}>
        {(op.rarity > 2 ?
          <SkillDisplayBox operator={op} skill={1} />
          : <div />)}
        {(op.rarity > 3 ?
          <div className={classes.middleSkill}>
            <SkillDisplayBox operator={op} skill={2} />
          </div>
          : <div />)}
        {(op.rarity === 6 || op.name === "Amiya" ?
          <SkillDisplayBox operator={op} skill={3} />
          : <div />)}
      </div>
    </div>

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
      <div className={classes.opNameArea}>
        {opName}
      </div>
      <img
        src={opImgUrl}
        className={opIconStyle}
        alt=""
      />
      {/*<div className={classes.fav}>
        {op.favorite ? "❤️" : ""}
      </div>*/}
      {levelBubble}
      {skillBlock}
    </div>
  );
});
export default OperatorCollectionBlock;
