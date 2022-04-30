import React from "react";
import { Operator } from "../../App";
import { makeStyles } from "@material-ui/core";
import { useRarityStyles } from "../StyleRarityUnderline";
import clsx from "clsx";
import SkillDisplayBox from "../SkillDisplayBox";
import { MdFavorite } from "react-icons/md";

const useStyles = makeStyles({
  opContainer: {
    display: "grid",
    gridTemplateAreas: `"name"
                       "img"`,
    gridTemplateRows: "auto 1fr",
    padding: "6px",
    border: "1px solid #808080",
    borderRadius: "4px",
    backgroundColor: "#40403E",
    boxShadow: "2px 2px 8px rgb(0 0 0 / 30%)",
    margin: "0px 14px 12px 14px",
  },
  opNameArea: {
    gridArea: "name",
    display: "grid",
    gridTemplateColumns: "1fr auto"
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
    alignSelf: "center",
    justifySelf: "end",
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
    textDecoration: "none",
    border: "none",
  },
  promotionBox: {
    gridArea: "elite",
    width: "20px",
    height: "32px",
    display: "flex",
    alignItems: "end",
    justifyContent: "center",
    marginBottom: "4px",
    marginLeft: "-2px",
  },
  promotionIcon: {
    width: "32px",
    height: "32px",
  },
  promotionBoxLabel: {
    gridArea: "elite",
    width: "20px",
    fontSize: "9px",
    lineHeight: "14px",
    color: "#EEEEEE",
    display: "grid",
    alignItems: "start",
    justifyContent: "center",
    textDecoration: "none",
    border: "none",
    marginLeft: "-2px",
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
    top: "4px",
    right: "-16px",
    display: "flex",
    flexDirection: "column",
    alignSelf: "center",
    gap: "2px",
    marginRight: "-4px"
  },
  skillIcon: {
    height: "24px",
  },
  topSkill: {
    marginLeft: "-2px",
  },
  middleSkill: {
    marginLeft: "4px",
  },
  bottomSkill: {
    marginLeft: "6px",
  },
});

interface Props {
  op: Operator;
}

const OperatorCollectionBlock = React.memo((props: Props) => {
  const { op } = props;
  const classes = useStyles();
  const rarity = useRarityStyles();

  let intermediate = op.id;
  if (op.promotion === 2) {
    intermediate += "_2";
  } else if (op.promotion === 1 && op.name === "Amiya") {
    intermediate += "_1+";
  }

  const potentialUrl = `https://res.cloudinary.com/samidare/image/upload/f_auto,h_96,w_96/v1/arknights/potential/${op.potential}`;
  const promotionUrl = `https://res.cloudinary.com/samidare/image/upload/f_auto,h_128,w_128/v1/arknights/elite/${op.promotion}`;
  const opImgUrl = `https://res.cloudinary.com/samidare/image/upload/f_auto/v1/arknights/avatars/${intermediate}`;

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
        <div className={classes.alterName}>
          {title[0]}
        </div>
        <div className={classes.alterTitle}>
          {name[0]}
        </div>
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
        alt={`Potential ${op.potential}`}
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
        <div className={classes.promotionBox}>
          <img
            src={promotionUrl}
            className={classes.promotionIcon}
            alt={``}
          />
        </div>
        <abbr
          className={classes.promotionBoxLabel}
          title={`E${op.promotion}`}
        >
          E{op.promotion}
        </abbr>
        <svg
          className={classes.levelBubble}
        >
          <circle cx="24" cy="24" r="22" className={classes.levelBubble}
            fill="#323232" fillOpacity="0.95" stroke="#808080" strokeWidth="2" />
        </svg >
        <div className={classes.levelBubble} >
          <abbr
            className={classes.levelBubbleLabel}
            title={`Level`}
          >
            LV
          </abbr>
          {op.level}
        </div >
      </div >
    </div>

  const skillBlock =
    <div className={classes.imgArea}>
      <div className={classes.opSkillArea}>
        {(op.rarity > 2 ?
          <div className={classes.topSkill}>
            <SkillDisplayBox operator={op} skill={1} className={classes.skillIcon} />
          </div>
          : <div />)}
        {(op.rarity > 3 ?
          <div className={classes.middleSkill}>
            <SkillDisplayBox operator={op} skill={2} className={classes.skillIcon} />
          </div>
          : <div />)}
        {(op.rarity === 6 || op.name === "Amiya" ?
          <div className={classes.bottomSkill}>
            <SkillDisplayBox operator={op} skill={3} className={classes.skillIcon} />
          </div>
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
        {op.favorite
          ? <MdFavorite
            className={classes.fav}
            size={18}
            color={"#ff4d4d"}
          />
          : ""}
      </div>
      <img
        src={opImgUrl}
        className={opIconStyle}
        alt=""
      />
      {skillBlock}
      {levelBubble}
    </div>
  );
});
export default OperatorCollectionBlock;
