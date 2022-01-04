import { Box, makeStyles } from "@material-ui/core";
import React from "react";
import slugify from "slugify";
import { Operator, MOBILE_BREAKPOINT, TABLET_BREAKPOINT } from "../App";
import SkillDisplayBox from "./SkillDisplayBox";
import useViewportWidth from "./UseWindowSize";
import { COLOR_BY_RARITY } from "./DataTab";

const useStyles = makeStyles({
  opBox: {
    justifyContent: "space-between",
    backgroundColor: "#333333",
    padding: "8px",
    border: "1px solid white",
    borderRadius: "5px",
    width: "236px",
    height: "260px",
    boxShadow: "2px 2px 8px rgb(0 0 0 / 30%)"
  },
  opBoxMobile: {
    justifyContent: "space-between",
    backgroundColor: "#333333",
    padding: "8px",
    margin: "8px",
    border: "1px solid white",
    borderRadius: "5px",
    width: "300px",
    height: "80px",
  },
  item: {
    display: "inline-block",
  },
  skillsDisplay: {
    justifyContent: "space-between",
  },
  level: {
    fontSize: "40px",
    textAlign: "center",
  },
  levelMobile: {
    fontSize: "24px",
    textAlign: "center",
  },
  icon: {
    width: "60px",
    height: "60px",
  },
  iconMobile: {
    width: "30px",
    height: "30px",
  },
  opIcon: {
    width: "160px",
    height: "160px",
  },
  fav: {
    fontSize: "32px",
  },
  favMobile: {
    fontSize: "18px",
  },
  opName: {
    fontSize: "24px",
  },
  alterTitle: {
    fontSize: "16px",
  },
  gapRight: {
    marginRight: "20px",
  },
});

interface Props {
  op: Operator;
}

const OperatorCollectionBlock = React.memo((props: Props) => {
  const { op } = props;
  const classes = useStyles();
  const potentialUrl = `https://res.cloudinary.com/samidare/image/upload/v1/arknights/potential/${op.potential}`;
  const promotionUrl = `https://res.cloudinary.com/samidare/image/upload/v1/arknights/elite/${op.promotion}`;

  const width = useViewportWidth();

  let intermediate = op.name;
  if (op.promotion === 2) {
    intermediate += " elite 2";
  } else if (op.promotion === 1 && op.name === "Amiya") {
    intermediate += " elite 1";
  }

  const opImgUrl = `https://res.cloudinary.com/samidare/image/upload/v1/arknights/operators/${slugify(
    intermediate,
    { lower: true, replacement: "-", remove: /-/g }
  )}`;

  const opBoxStyleMobile = {
    backgroundImage: `url("${opImgUrl}")`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "60px 60px",
  }

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
        {(width < MOBILE_BREAKPOINT ? "" :
        <span className={classes.alterTitle}>
          {" the " + splitName[1]}
        </span>)}
      </span>
    )
  }

  if (width < MOBILE_BREAKPOINT) {
    return (
      <div className={classes.opBoxMobile}>
        <Box style={opBoxStyleMobile} className={classes.item} position="relative" height="80px" width="260px">
          <Box position="absolute" left={64} top={-2}>
            <div className={classes.opName}>{opName}</div>
          </Box>
          <Box position="absolute" right={0} top={30}>
            <div className={classes.skillsDisplay}>
              {(op.rarity > 2 ?
                <SkillDisplayBox operator={op} skill={1} mobile={true} />
                : <div />)}
              {(op.rarity > 3 ?
                <SkillDisplayBox operator={op} skill={2} mobile={true} />
                : <div />)}
              {(op.rarity === 6 || op.name === "Amiya" ?
                <SkillDisplayBox operator={op} skill={3} mobile={true} />
                : <div />)}
            </div>
          </Box>
          <div style={{height: 60}} />
          <div style={{ width: 60, height: 3, backgroundColor: COLOR_BY_RARITY[op.rarity], marginBottom: 3 }} />
          <Box position="absolute" left={0} top={0}>
            <div className={classes.favMobile}>{op.favorite ? "❤️" : ""}</div>
          </Box>
          <Box position="absolute" left={64} top={30}>
            <img
              src={promotionUrl}
              className={classes.iconMobile}
              alt={`Elite ${op.promotion} icon`}
            />
          </Box>
          <Box position="absolute" left={80} top={30} width={60} height={60}>
            <div className={classes.levelMobile}>{op.level}</div>
          </Box>
          <Box position="absolute" left={126} top={32}>
            <img
              src={potentialUrl}
              className={classes.iconMobile}
              alt={`Potential ${op.potential} icon`}
            />
          </Box>
        </Box>
      </div>
    );
  }

  return (
    <div className={classes.opBox}>
      <Box className={classes.item} position="relative" height="160px" width="220px">
        <img
          className={classes.opIcon}
          src={opImgUrl}
          alt=""
        />
        <Box position="absolute" left={0} bottom={-4}>
          <div style={{ width: 160, height: 4, backgroundColor: COLOR_BY_RARITY[op.rarity] }} />
        </Box>
        <Box position="absolute" left={0} top={0}>
          <div className={classes.fav}>{op.favorite ? "❤️":""}</div>
        </Box>
        <Box position="absolute" right={0} bottom={0}>
          <img
              src={potentialUrl}
              className={classes.icon}
              alt={`Potential ${op.potential} icon`}
          />
        </Box>
        <Box position="absolute" right={0} top={52} width={60} height={60}>
          <div className={classes.level}>{op.level}</div>
        </Box>
        <Box position="absolute" right={0} top={0}>
          <img
              src={promotionUrl}
              className={classes.icon}
              alt={`Elite ${op.promotion} icon`}
            />
        </Box>
      </Box>
      <div className={classes.opName}>{opName}</div>
      {(
        <div className={classes.skillsDisplay}>
          {(op.rarity > 2 ?
            <span className={classes.gapRight}> 
              <SkillDisplayBox operator={op} skill={1} />
            </span>
          : <div />)}
          {(op.rarity > 3 ?
            <span className={classes.gapRight}>
              <SkillDisplayBox operator={op} skill={2} />
            </span>
          : <div />)}
          {(op.rarity === 6 || op.name === "Amiya" ?
            <span>
              <SkillDisplayBox operator={op} skill={3} />
            </span>
          : <div />)}
        </div>
        )
      }
    </div>
  );
});
export default OperatorCollectionBlock;
