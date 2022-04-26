import React from "react";
import { Operator } from "../App";
import operatorJson from "../data/operators.json";
import { makeStyles } from "@material-ui/core";

interface Props {
  operator: Operator;
  skill: number;
}

const useStyles = makeStyles({
  skillBox: {
    display: "grid",
    height: "30px",
    width: "30px",
  },
  skillImg: {
    gridRow: 1,
    gridColumn: 1,
  },
  image: {
    height: "30px",
  },

});

const SkillDisplayBox = React.memo((props : Props) => {
  const { operator, skill } = props;
  const classes = useStyles();

  const opInfo = (operatorJson as any)[operator.id];
  const skillImgUrl = `https://res.cloudinary.com/samidare/image/upload/f_auto/v1/arknights/skills/${opInfo.skills[skill - 1].iconId
    ?? opInfo.skills[skill - 1].skillId}`;
  const skillLvlUrl = `https://res.cloudinary.com/samidare/image/upload/f_auto/v1/arknights/skill-levels/${operator.skillLevel}`;
  const skillBGImgUrl = `https://res.cloudinary.com/samidare/image/upload/f_auto/v1/arknights/skill-levels/bg`;
  const skillMastery = (operator as any)[`skill${skill}Mastery`];
  const skillMasteryUrl = `https://res.cloudinary.com/samidare/image/upload/f_auto/v1/arknights/mastery/${skillMastery}`;

  return (
    <div className={classes.skillBox}>
      <div className={classes.skillImg}>
        <img
          className={classes.image}
          src={skillImgUrl}
          style={{ opacity: (operator.promotion >= skill - 1 ? 1 : 0.1) }}
          alt={`Skill ${skill} ${opInfo.skills[0].skillName}`}
        />
      </div>
      <div className={classes.skillImg}>
        <img
          className={classes.image}
          src={skillBGImgUrl}
          alt={``}
        />
      </div>
      <div className={classes.skillImg}>
        {(!skillMastery || skillMastery === 0
          ? <img
            className={classes.image}
            src={skillLvlUrl}
            style={{ opacity: (operator.promotion >= skill - 1 ? 1 : 0.1) }}
            alt={`Level ${operator.skillLevel}`}
          />
          : <img
            className={classes.image}
            src={skillMasteryUrl}
            alt={`${skill} Mastery Level ${skillMastery}`}
          />
        )}
      </div>
    </div>
  );
});

export default SkillDisplayBox;