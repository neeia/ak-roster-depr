import { Box, makeStyles } from "@material-ui/core";
import React from "react";
import { Operator } from "../App";
import operatorJson from "../data/operators.json";

interface Props {
  operator: Operator;
  skill : number;
}

const useStyles = makeStyles({
  skillsDisplay: {
    justifyContent: "space-between",
  },
  skillBox: {
    display: "inline-block",
    height: "42px",
    width: "42px",
    marginRight: "20px",
  },
  image: {
    height: "40px",
  },
  skillPlaceAbsolute: {
    position: "absolute",
    left: "50%",
    transform: "translate(-50%, 0)",
  },
});

const SkillDisplayBox = React.memo((props : Props) => {
  const { operator, skill } = props;
  const classes = useStyles();

  const opInfo = (operatorJson as any)[operator.id];
  const skillImgUrl = `https://res.cloudinary.com/samidare/image/upload/v1/arknights/skills/${opInfo.skills[skill - 1].iconId 
    ?? opInfo.skills[skill - 1].skillId}`;
  const skillLvlUrl = `https://res.cloudinary.com/samidare/image/upload/v1/arknights/skill-levels/${operator.skillLevel}`;
  const skillBGImgUrl = `https://res.cloudinary.com/samidare/image/upload/v1/arknights/skill-levels/bg`;
  const skillMastery = (operator as any)[`skill${skill}Mastery`];
  const skillMasteryUrl = `https://res.cloudinary.com/samidare/image/upload/v1/arknights/mastery/${skillMastery}`;

  return (
    <Box className={classes.skillBox} position="relative">
      <Box className={classes.skillPlaceAbsolute}>
        <img
          className={classes.image}
          src={skillImgUrl}
          style={{ opacity: (operator.promotion >= skill - 1 ? 1 : 0.25) }}
          alt={`Skill ${skill} Icon  ${opInfo.skills[0].skillName}`}
        />
      </Box>
      <Box className={classes.skillPlaceAbsolute}>
        <img
          className={classes.image}
          src={skillBGImgUrl}
          style={{ opacity: (operator.promotion >= skill - 1 ? 0.625 : 0.875) }}
          alt={`Skill Level Background`}
        />
      </Box>
      <Box className={classes.skillPlaceAbsolute}>
        {(!skillMastery || skillMastery === 0
        ? <img
            className={classes.image}
            src={skillLvlUrl}
            style={{ opacity: (operator.promotion >= skill - 1 ? 1 : 0.5) }}
            alt={`Skill Level ${operator.skillLevel} icon`}
          />
        : <img
            className={classes.image}
            src={skillMasteryUrl}
            style={{ opacity: (operator.promotion >= skill - 1 ? 1 : 0.25) }}
            alt={`Skill ${skill} Mastery Level ${operator.skill1Mastery}`}
          />
        )}
      </Box>
    </Box>
  );
});

export default SkillDisplayBox;