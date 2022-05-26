import React from "react";
import { Operator } from "../../App";
import { makeStyles } from "@material-ui/core";
import clsx from "clsx";

interface Props {
  operator: Operator;
  skill: number;
  className?: string;
}

const useStyles = makeStyles({
  skillBox: {
    display: "grid",
  },
  skillImg: {
    gridRow: 1,
    gridColumn: 1,
  },
  imageBG: {
    opacity: ".8",
  },
  imageActive: {
    opacity: ".95",
  },
  imageInactive: {
    opacity: ".1",
  },
});

const SkillDisplayBox = React.memo((props: Props) => {
  const { operator, skill, className } = props;
  const classes = useStyles();

  const skillLvlUrl = `https://res.cloudinary.com/samidare/image/upload/f_auto,h_192,w_192/v1/arknights/skill-levels/${operator.skillLevel}`;
  const skillBGImgUrl = `https://res.cloudinary.com/samidare/image/upload/f_auto,h_192,w_192/v1/arknights/skill-levels/bg`;
  const skillMastery = (operator as any)[`skill${skill}Mastery`];
  const skillMasteryUrl = `https://res.cloudinary.com/samidare/image/upload/f_auto,h_144,w_144/v1/arknights/mastery/${skillMastery}`;

  const classBG = clsx({
    [classes.skillImg]: true,
    [classes.imageBG]: true,
    [className ?? ""]: true,
  })
  const classImg = clsx({
    [classes.skillImg]: true,
    [classes.imageActive]: operator.promotion >= skill - 1,
    [classes.imageInactive]: operator.promotion < skill - 1,
    [className ?? ""]: true,
  })

  return (
    <div className={classes.skillBox}>
      <img
        className={classBG}
        src={skillBGImgUrl}
        alt={``}
      />
      {(!skillMastery || skillMastery === 0
        ? <img
          className={classImg}
          src={skillLvlUrl}
          alt={`Level ${operator.skillLevel}`}
        />
        : <img
          className={classImg}
          src={skillMasteryUrl}
          alt={`${skill} Mastery Level ${skillMastery}`}
        />
      )}
    </div>
  );
});

export default SkillDisplayBox;