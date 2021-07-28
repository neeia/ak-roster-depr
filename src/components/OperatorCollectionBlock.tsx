import { Box, makeStyles } from "@material-ui/core";
import React from "react";
import slugify from "slugify";
import { Operator } from "../App";
import operatorJson from "../data/operators.json";

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
  skillImage: {
    height: "120px"
  },
  masteryImage: {
    height: "40px"
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
  const opInfo = (operatorJson as any)[operator.id];

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

  const skillImgUrl = `https://res.cloudinary.com/samidare/image/upload/v1/arknights/skill-levels/${operator.skillLevel}`;

  const skillBGImgUrl = `https://res.cloudinary.com/samidare/image/upload/v1/arknights/skill-levels/bg`;

  const opBoxStyle = {
    backgroundImage: `url("${opImgUrl}")`,
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
      {(
        <div className={classes.item}>
          {(operator.promotion === 2 && (operator.rarity === 6 || operator.name === "Amiya") ?
            <Box className={classes.item} position="relative" height="160px" width="160px">
              <img
                className={classes.skillImage}
                src={`https://res.cloudinary.com/samidare/image/upload/v1/arknights/skills/${opInfo.skills[0].iconId ?? opInfo.skills[0].skillId}`}
                alt={`Skill 1 Icon  ${opInfo.skills[0].skillName}`}
              />
              <Box position="absolute" right={20} top={-20}>
                <img
                  className={classes.masteryImage}
                  src={skillBGImgUrl}
                  alt={`Skill Level Background`}
                />
              </Box>
              <Box position="absolute" right={20} top={-20}>
                {(operator.skill1Mastery == null || operator.skill1Mastery === 0
                ? <img
                    className={classes.masteryImage}
                    src={skillImgUrl}
                    alt={`Skill Level ${operator.skillLevel} icon`}
                  />
                : <img
                    className={classes.masteryImage}
                    src={`https://res.cloudinary.com/samidare/image/upload/v1/arknights/mastery/${operator.skill1Mastery}`}
                    alt={`Skill 1 Mastery Level ${operator.skill1Mastery}`}
                  />
                )}
              </Box>
            </Box>
          : "")}
          {(operator.promotion === 2 && (operator.rarity === 6 || operator.name === "Amiya") ?
            <Box className={classes.item} position="relative" height="160px" width="160px">
              <img
                className={classes.skillImage}
                src={`https://res.cloudinary.com/samidare/image/upload/v1/arknights/skills/${opInfo.skills[1].iconId ?? opInfo.skills[1].skillId}`}
                alt={`Skill 2 Icon  ${opInfo.skills[1].skillName}`}
              />
              <Box position="absolute" right={20} top={-20}>
                <img
                  className={classes.masteryImage}
                  src={skillBGImgUrl}
                  alt={`Skill Level Background`}
                />
              </Box>
              <Box position="absolute" right={20} top={-20}>
                {(operator.skill2Mastery == null || operator.skill1Mastery === 0
                ? <img
                    className={classes.masteryImage}
                    src={skillImgUrl}
                    alt={`Skill Level ${operator.skillLevel} icon`}
                  />
                : <img
                    className={classes.masteryImage}
                    src={`https://res.cloudinary.com/samidare/image/upload/v2/arknights/mastery/${operator.skill2Mastery}`}
                    alt={`Skill 2 Mastery Level ${operator.skill2Mastery}`}
                  />
                )}
              </Box>
            </Box>
          : "")}
          {(operator.promotion === 2 && (operator.rarity === 6 || operator.name === "Amiya") ?
            <Box className={classes.item} position="relative" height="160px" width="160px">
              <img
                className={classes.skillImage}
                src={`https://res.cloudinary.com/samidare/image/upload/v1/arknights/skills/${opInfo.skills[2].iconId ?? opInfo.skills[2].skillId}`}
                alt={`Skill 3 Icon ${opInfo.skills[2].skillName}`}
              />
              <Box position="absolute" right={20} top={-20}>
                <img
                  className={classes.masteryImage}
                  src={skillBGImgUrl}
                  alt={`Skill Level Background`}
                />
              </Box>
              <Box position="absolute" right={20} top={-20}>
                {(operator.skill3Mastery == null || operator.skill1Mastery === 0
                ? <img
                    className={classes.masteryImage}
                    src={skillImgUrl}
                    alt={`Skill Level ${operator.skillLevel} icon`}
                  />
                : <img
                    className={classes.masteryImage}
                    src={`https://res.cloudinary.com/samidare/image/upload/v3/arknights/mastery/${operator.skill3Mastery}`}
                    alt={`Skill 3 Mastery Level ${operator.skill3Mastery}`}
                  />
                )}
              </Box>
            </Box>
          : "")}
        </div>
        )
      }
      <div className={classes.opName}>{operator.name}</div>
    </div>
  );
});
export default OperatorCollectionBlock;
