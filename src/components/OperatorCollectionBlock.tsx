import { Box, makeStyles } from "@material-ui/core";
import React from "react";
import slugify from "slugify";
import { Operator } from "../App";

const useStyles = makeStyles({
  opBox: {
    justifyContent: "space-between",
    flexBasis: "45%",
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
          <div>{"⭐\n".repeat(operator.rarity)}</div>
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
      {(operator.skillLevel < 7 || operator.promotion < 2) 
        ? (<div className={classes.item}>R{operator.skillLevel}</div>)
        : (
        <div className={classes.item}>
          {(operator.skill1Mastery == null ? "" :
          <img
            className={classes.masteryImage}
            src={`https://res.cloudinary.com/samidare/image/upload/v1/arknights/mastery/${operator.skill1Mastery}`}
            alt={`Skill 1 Mastery Level ${operator.skill1Mastery}`}
          />
          )}
          {(operator.skill2Mastery == null ? "" :
          <img 
            className={classes.masteryImage} 
            src={`https://res.cloudinary.com/samidare/image/upload/v1/arknights/mastery/${operator.skill2Mastery}`}
            alt={`Skill 2 Mastery Level ${operator.skill1Mastery}`}
          />
          )}
          {(operator.skill3Mastery == null ? "" :
          <img 
            className={classes.masteryImage} 
            src={`https://res.cloudinary.com/samidare/image/upload/v1/arknights/mastery/${operator.skill3Mastery}`}
            alt={`Skill 3 Mastery Level ${operator.skill1Mastery}`}
          />
          )}
        </div>
        )
      }
      <div className={classes.opName}>{operator.name}</div>
    </div>
  );
});
export default OperatorCollectionBlock;
