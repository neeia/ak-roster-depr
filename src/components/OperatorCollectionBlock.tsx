import { Box, makeStyles } from "@material-ui/core";
import React from "react";
import slugify from "slugify";
import { Operator } from "../App";
import SkillDisplayBox from "./SkillDisplayBox";

const useStyles = makeStyles({
  opBox: {
    justifyContent: "space-between",
    backgroundColor: "#444455",
    padding: "12px",
    margin: "12px",
    border: "2px solid pink",
    borderRadius: "5px",
  },
  item: {
    display: "inline-block",
  },
  skillsDisplay: {
    height: "42px",
    justifyContent: "space-between",
  },
  level: {
    fontSize: "40px",
    textAlign: "center",
  },
  icon: {
    width: "60px",
    height: "60px",
  },
  fav: {
    fontSize: "32px",
  },
  opName: {
    fontSize: "24px",
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

  const opImgUrl = `https://res.cloudinary.com/samidare/image/upload/v1/arknights/operators/${slugify(
    intermediate,
    { lower: true, replacement: "-", remove: /-/g }
  )}`;

  const opBoxStyle = {
    backgroundImage: `url("${opImgUrl}")`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "160px 160px",
  }

  return (
    <div className={classes.opBox}>
      <Box style={opBoxStyle} className={classes.item} position="relative" height="160px" width="220px">
        <Box position="absolute" left={0} bottom={0}>
          <div>{"⭐\n".repeat(operator.rarity)}</div>
        </Box>
        <Box position="absolute" right={0} top={60} width={60} height={60}>
          <div className={classes.level}>{operator.level}</div>
        </Box>
        <Box position="absolute" left={0} top={0}>
          <div className={classes.fav}>{operator.favorite ? "❤️":""}</div>
        </Box>
        <Box position="absolute" right={0} bottom={-10}>
          <img
              src={potentialUrl}
              className={classes.icon}
              alt={`Potential ${operator.potential} icon`}
          />
        </Box>
        <Box position="absolute" right={0} top={0}>
          <img
              src={promotionUrl}
              className={classes.icon}
              alt={`Elite ${operator.promotion} icon`}
            />
        </Box>
      </Box>
      <div className={classes.opName}>{operator.name}</div>
      {(
        <div className={classes.skillsDisplay}>
          {(operator.rarity > 2 ?
            <SkillDisplayBox operator={operator} skill={1} />
          : <div />)}
          {(operator.rarity > 3 ?
            <SkillDisplayBox operator={operator} skill={2} />
          : <div />)}
          {(operator.rarity === 6 || operator.name === "Amiya" ?
            <SkillDisplayBox operator={operator} skill={3} />
          : <div />)}
        </div>
        )
      }
    </div>
  );
});
export default OperatorCollectionBlock;
