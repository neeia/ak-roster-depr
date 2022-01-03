import { Box, makeStyles } from "@material-ui/core";
import React from "react";
import { Operator } from "../App";
import operatorJson from "../data/operators.json";

interface Props {
  operator: Operator;
  skill: number;
  mobile?: boolean
}

const useStyles = makeStyles({
  skillsDisplay: {
    justifyContent: "space-between",
  },
  skillBox: {
    display: "inline-block",
    height: "42px",
    width: "42px",
  },
  image: {
    height: "40px",
  },
  skillBoxMobile: {
    display: "inline-block",
    height: "32px",
    width: "32px",
  },
  imageMobile: {
    height: "30px",
  },
  skillPlaceAbsolute: {
    position: "absolute",
    left: "50%",
    transform: "translate(-50%, 0)",
  },
});

const SkillDisplayBox = React.memo((props : Props) => {
  const { operator, skill, mobile=false } = props;
  const classes = useStyles();

  const opInfo = (operatorJson as any)[operator.id];
  const skillImgUrl = `https://res.cloudinary.com/samidare/image/upload/v1/arknights/skills/${opInfo.skills[skill - 1].iconId 
    ?? opInfo.skills[skill - 1].skillId}`;
  const skillLvlUrl = `https://res.cloudinary.com/samidare/image/upload/v1/arknights/skill-levels/${operator.skillLevel}`;
  const skillBGImgUrl = `https://res.cloudinary.com/samidare/image/upload/v1/arknights/skill-levels/bg`;
  const skillMastery = (operator as any)[`skill${skill}Mastery`];
  const skillMasteryUrl = `https://res.cloudinary.com/samidare/image/upload/v1/arknights/mastery/${skillMastery}`;

  return (
    <Box className={mobile ? classes.skillBoxMobile : classes.skillBox} position="relative">
      <Box className={classes.skillPlaceAbsolute}>
        <img
          className={mobile ? classes.imageMobile : classes.image}
          src={skillImgUrl}
          style={{ opacity: (operator.promotion >= skill - 1 ? 1 : 0.1) }}
          alt={`Skill ${skill} ${opInfo.skills[0].skillName}`}
        />
      </Box>
      <Box className={classes.skillPlaceAbsolute}>
        <img
          className={mobile ? classes.imageMobile : classes.image}
          src={skillBGImgUrl}
          style={{ opacity: 0.9 }}
          alt={``}
        />
      </Box>
      <Box className={classes.skillPlaceAbsolute}>
        {(!skillMastery || skillMastery === 0
        ? <img
            className={mobile ? classes.imageMobile : classes.image}
            src={skillLvlUrl}
            style={{ opacity: (operator.promotion >= skill - 1 ? 1 : 0.1) }}
            alt={`Level ${operator.skillLevel}`}
          />
        : <img
            className={mobile ? classes.imageMobile : classes.image}
            src={skillMasteryUrl}
            alt={`${skill} Mastery Level ${skillMastery}`}
          />
        )}
      </Box>
    </Box>
  );
});

export default SkillDisplayBox;