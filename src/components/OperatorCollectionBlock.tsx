import { Box, makeStyles } from "@material-ui/core";
import { url } from "inspector";
import React from "react";
import slugify from "slugify";
import { Operator } from "../App";

const useStyles = makeStyles({
  opBox: {
    justifyContent: "space-between",
  },
  row: {
    justifyContent: "space-between",
  },
  item: {
    display: "inline-block",
  },
  level: {
    fontSize: "48px",
    textAlign: "center",
  },
  opName: {
    fontSize: "24px"
  },
  masteryImage: {
    height: "160px"
  },
});

interface Props {
  operator: Operator;
}

const OperatorCollectionBlock = React.memo((props: Props) => {
  const { operator } = props;
  const classes = useStyles();
  const potentialUrl = `https://res.cloudinary.com/samidare/image/upload/v1/arknights/potential/${operator.potential}`;
  const promotionUrl = `https://res.cloudinary.com/samidare/image/upload/v1/arknights/elite/${operator.promotion}`;

  let intermediate = operator.name;
  if (operator.promotion === 2) {
    intermediate += " elite 2";
  } else if (operator.promotion === 1 && operator.name === "Amiya") {
    intermediate += " elite 1";
  }

  const imgUrl = `https://res.cloudinary.com/samidare/image/upload/v1/arknights/operators/${slugify(
    intermediate,
    { lower: true, replacement: "-", remove: /-/g }
  )}`;

  const opBoxStyle = {
    backgroundImage: `url("${imgUrl}")`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "auto",
  }

  return (
    <div className="opBox">
      <Box style={opBoxStyle} className={classes.item} position="relative" height="180px" width="240px">
        <Box position="absolute" left={0} bottom={0}>
          <div className={classes.item}>{"⭐\n".repeat(operator.rarity)}</div>
        </Box>
        <Box position="absolute" right={0} top={0}>
            <div className={classes.level}>{operator.level}</div>
        </Box>
        <Box position="absolute" left={0} top={0}>
            <div className={classes.level}>{operator.favorite ? "🤍":""}</div>
        </Box>
        <Box position="absolute" right={0} top={60}>
            <img
                src={potentialUrl}
                width={60}
                height={60}
                alt={`Potential ${operator.potential} icon`}
            />
        </Box>
        <Box position="absolute" right={0} bottom={0}>
          <img
              src={promotionUrl}
              width={60}
              height={60}
              alt={`Elite ${operator.promotion} icon`}
            />
        </Box>
      </Box>
      {(operator.skillLevel < 7 || operator.promotion < 2) ? (
        <div className={classes.item}>Skill Level {operator.skillLevel}</div>
      ) : (
        <div className={classes.item}>
          <img
            className={classes.masteryImage} 
            src={`https://res.cloudinary.com/samidare/image/upload/v1/arknights/mastery/${operator.skill1Mastery}`}
          />
          <img 
            className={classes.masteryImage} 
            src={`https://res.cloudinary.com/samidare/image/upload/v1/arknights/mastery/${operator.skill2Mastery}`}
          />
          <img 
            className={classes.masteryImage} 
            src={`https://res.cloudinary.com/samidare/image/upload/v1/arknights/mastery/${operator.skill3Mastery}`}
          />
        </div>
      )}
      <div className={classes.opName}>{operator.name}</div>
    </div>
  );
});
export default OperatorCollectionBlock;
