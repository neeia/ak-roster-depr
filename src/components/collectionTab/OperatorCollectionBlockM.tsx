import React from "react";
import { Operator } from "../../App";
import { makeStyles } from "@material-ui/core";
import { useRarityStyles } from "../StyleRarityUnderline";
import clsx from "clsx";
import SkillDisplayBox from "./SkillDisplayBox";
import { MdFavorite } from "react-icons/md";

const useStyles = makeStyles({
  opContainer: {
    display: "grid",
    gridTemplateAreas: `"name"
                       "img"`,
    gridTemplateRows: "auto 1fr",
    padding: "4px",
    border: "1px solid #808080",
    borderRadius: "4px",
    backgroundColor: "#40403E",
    boxShadow: "2px 2px 8px rgb(0 0 0 / 30%)",
    margin: "0px 8px 6px 12px",
  },
  opNameArea: {
    gridArea: "name",
    display: "grid",
    gridTemplateColumns: "1fr auto",
  },
  opName: {
    fontSize: "12px",
    lineHeight: "18px",
  },
  nineColoredDeer: {
    fontSize: "8px",
    lineHeight: "9px",
  },
  opNameSmaller: {
    fontSize: "9px",
    lineHeight: "18px",
  },
  alterName: {
    fontSize: "7px",
    lineHeight: "6px",
  },
  alterTitle: {
    fontSize: "11px",
    lineHeight: "12px",
  },
  opIconArea: {
    gridArea: "img",
    width: "80px",
    height: "80px",
  },
  fav: {
    alignSelf: "center",
    justifySelf: "end",
    marginTop: "-4px",
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
    width: "32px",
    height: "32px",
    fontSize: "18px",
    lineHeight: "16px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: "-4px",
    marginBottom: "-2px",
  },
  levelBubbleLabel: {
    gridArea: "level",
    fontSize: "6px",
    lineHeight: "6px",
    textDecoration: "none",
    border: "none",
  },
  promotionBox: {
    gridArea: "elite",
    width: "12px",
    height: "18px",
    display: "flex",
    alignItems: "end",
    justifyContent: "center",
    marginBottom: "4px",
    marginLeft: "-2px",
  },
  promotionIcon: {
    width: "20px",
    height: "20px",
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
    width: "14px",
    height: "20px",
    alignSelf: "center",
    justifySelf: "center",
  },
  potentialIcon: {
    gridArea: "potential",
    width: "12px",
    height: "12px",
    marginTop: "2px",
    alignSelf: "center",
    justifySelf: "center",
  },
  moduleContainer: {
    gridArea: "img",
    display: "flex",
    flexDirection: "row-reverse",
    alignSelf: "end",
    marginBottom: "-8px",
    marginRight: "-8px",
  },
  moduleSVG: {
    display: "grid",
    gridTemplateAreas: `"grid"`,
    gridArea: "module",
    width: "24px",
    height: "24px",
    alignSelf: "center",
    justifySelf: "center",
  },
  moduleIcon: {
    gridArea: "module",
    width: "20px",
    height: "20px",
    alignSelf: "center",
    justifySelf: "center",
  },
  opSkillArea: {
    position: "absolute",
    top: "4px",
    right: "-10px",
    display: "flex",
    flexDirection: "column",
    alignSelf: "center",
    gap: "2px",
  },
  skillIcon: {
    height: "16px",
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
  const nameIsLong = getTextWidth(op.name, classes.opName) > 56;

  let opName = (
    <span className={nameIsLong ? classes.opNameSmaller : classes.opName}>
      {name}
    </span>
  )
  if (op.name === "Nine-Colored Deer") {
    const name = op.name.split(" ");
    opName = (
      <span>
        <div className={classes.nineColoredDeer}>
          {name[0]}
        </div>
        <div className={classes.nineColoredDeer}>
          {name[1]}
        </div>
      </span>
    )
  }
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
        <svg
          className={classes.levelBubble}
        >
          <circle cx="16" cy="16" r="15" className={classes.levelBubble}
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
          <SkillDisplayBox operator={op} skill={1} className={classes.skillIcon} />
          : <div />)}
        {(op.rarity > 3 ?
          <SkillDisplayBox operator={op} skill={2} className={classes.skillIcon} />
          : <div />)}
        {(op.rarity === 6 || op.name === "Amiya" ?
          <SkillDisplayBox operator={op} skill={3} className={classes.skillIcon} />
          : <div />)}
      </div>
    </div>

  const opModuleUrls: string[] = op.module?.map((lvl: number) =>
    lvl > 0 ? `https://res.cloudinary.com/samidare/image/upload/f_auto/v1/arknights/equip/uniequip_002_${op.id}` : ""
  ) ?? []
  const moduleBlock =
    <div className={classes.moduleContainer}>
      {opModuleUrls.map((url: string) =>
        url
          ? <div key={url} className={classes.moduleSVG}>
            <svg
              className={classes.moduleSVG}
            >
              <rect x="0" y="0" className={classes.moduleSVG}
                fill="#323232" fillOpacity="0.95" strokeWidth="1"
                stroke={"#808080"} />
            </svg>
            <img
              className={classes.moduleIcon}
              src={`https://res.cloudinary.com/samidare/image/upload/f_auto,h_256,w_256/v1/arknights/equip/uniequip_002_${op.id.split("_")[2]}`}
            />
          </div>
          : "")}
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
            size={10}
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
      {moduleBlock}
    </div>
  );
});
export default OperatorCollectionBlock;
