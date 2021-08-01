import { Box, makeStyles } from "@material-ui/core";
import React from "react";
import slugify from "slugify";
import { Operator } from "../App";
import operatorJson from "../data/operators.json";

const useStyles = makeStyles({
  opBox: {
    justifyContent: "space-between",
    marginBottom: "20px",
  },
  row: {
    justifyContent: "space-between",
  },
  item: {
    display: "inline-block",
  },
  level: {
    fontSize: "54px",
    textAlign: "center",
  },
  fav: {
    fontSize: "48px",
  },
  opName: {
    fontSize: "24px",
  },
  skillBox: {
    justifyContent: "space-between",
    height: "60px",
    width: "120px",
    marginLeft: "20px",
  },
  skillImage: {
    display: "inline-block",
    height: "54px",
  },
  bgImage: {
    height: "54px"
  },
  masteryImage: {
    height: "51px"
  },
  skillLvlBox: {
    position:"absolute",
    right: "0px",
    top: "0px",
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
    backgroundSize: "180px 180px",
  }

  return (
    <div className={classes.opBox}>
      <Box style={opBoxStyle} className={classes.item} position="relative" height="180px" width="240px">
        <Box position="absolute" left={0} bottom={0}>
          <div>{"⭐\n".repeat(operator.rarity)}</div>
        </Box>
        <Box position="absolute" right={0} top={60} width={60} height={60}>
          <div className={classes.level}>{operator.level}</div>
        </Box>
        <Box position="absolute" left={0} top={0}>
          <div className={classes.fav}>{operator.favorite ? "🤍":""}</div>
        </Box>
        <Box position="absolute" right={0} bottom={-10}>
          <img
              src={potentialUrl}
              width={60}
              height={60}
              alt={`Potential ${operator.potential} icon`}
          />
        </Box>
        <Box position="absolute" right={0} top={0}>
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
          {(operator.rarity > 2 ?
            <Box className={classes.skillBox} position="relative">
              <img
                className={classes.skillImage}
                src={`https://res.cloudinary.com/samidare/image/upload/v1/arknights/skills/${opInfo.skills[0].iconId ?? opInfo.skills[0].skillId}`}
                alt={`Skill 1 Icon  ${opInfo.skills[0].skillName}`}
              />
              <Box className={classes.skillLvlBox}>
                <img
                  className={classes.bgImage}
                  src={skillBGImgUrl}
                  alt={`Skill Level Background`}
                />
              </Box>
              <Box className={classes.skillLvlBox}>
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
          : <div />)}
          {(operator.rarity > 3 ?
            <Box className={classes.skillBox} position="relative">
              <img
                className={classes.skillImage}
                src={`https://res.cloudinary.com/samidare/image/upload/v1/arknights/skills/${opInfo.skills[1].iconId ?? opInfo.skills[1].skillId}`}
                style={{ opacity: operator.promotion > 0 ? 1 : 0.2 }}
                alt={`Skill 2 Icon  ${opInfo.skills[1].skillName}`}
              />
              <Box className={classes.skillLvlBox}>
                <img
                  className={classes.bgImage}
                  src={skillBGImgUrl}
                  alt={`Skill Level Background`}
                />
              </Box>
              <Box className={classes.skillLvlBox}>
                {(operator.skill2Mastery == null || operator.skill2Mastery === 0
                ? <img
                    className={classes.masteryImage}
                    src={skillImgUrl}
                    style={{ opacity: operator.promotion > 0 ? 1 : 0.2 }}
                    alt={`Skill Level ${operator.skillLevel} icon`}
                  />
                : <img
                    className={classes.masteryImage}
                    src={`https://res.cloudinary.com/samidare/image/upload/v2/arknights/mastery/${operator.skill2Mastery}`}
                    style={{ opacity: operator.promotion > 0 ? 1 : 0.2 }}
                    alt={`Skill 2 Mastery Level ${operator.skill2Mastery}`}
                  />
                )}
              </Box>
            </Box>
          : <div />)}
          {(operator.rarity === 6 || operator.name === "Amiya" ?
            <Box className={classes.skillBox} position="relative">
              <img
                className={classes.skillImage}
                src={`https://res.cloudinary.com/samidare/image/upload/v1/arknights/skills/${opInfo.skills[2].iconId ?? opInfo.skills[2].skillId}`}
                style={{ opacity: operator.promotion === 2 ? 1 : 0.2 }}
                alt={`Skill 3 Icon ${opInfo.skills[2].skillName}`}
              />
              <Box className={classes.skillLvlBox}>
                <img
                  className={classes.bgImage}
                  src={skillBGImgUrl}
                  alt={`Skill Level Background`}
                />
              </Box>
              <Box className={classes.skillLvlBox}>
                {(operator.skill3Mastery == null || operator.skill3Mastery === 0
                ? <img
                    className={classes.masteryImage}
                    src={skillImgUrl}
                    style={{ opacity: operator.promotion === 2 ? 1 : 0.2 }}
                    alt={`Skill Level ${operator.skillLevel} icon`}
                  />
                : <img
                    className={classes.masteryImage}
                    src={`https://res.cloudinary.com/samidare/image/upload/v3/arknights/mastery/${operator.skill3Mastery}`}
                    style={{ opacity: operator.promotion === 2 ? 1 : 0.2 }}
                    alt={`Skill 3 Mastery Level ${operator.skill3Mastery}`}
                  />
                )}
              </Box>
            </Box>
          : <div />)}
        </div>
        )
      }
      <div className={classes.opName}>{operator.name}</div>
    </div>
  );
});
export default OperatorCollectionBlock;
