import React from "react";
import { Operator } from "../../App";
import { makeStyles } from "@material-ui/core";
import clsx from "clsx";
import { Box, SxProps, Theme } from "@mui/material";

interface Props {
  operator: Operator;
  skill: number;
  sx?: SxProps<Theme>;
}

const useStyles = makeStyles({
  skillBox: {
    display: "grid",
  },
});

const SkillDisplayBox = React.memo((props: Props) => {
  const { operator, skill, sx } = props;
  const classes = useStyles();

  const skillLvlUrl = `/img/rank/${operator.skillLevel}.png`;
  const skillBGImgUrl = `/img/rank/bg.png`;
  const skillMastery = (operator as any)[`skill${skill}Mastery`];
  const skillMasteryUrl = `/img/rank/m-${skillMastery}.png`;

  return (
    <div className={classes.skillBox}>
      <Box
        component="img"
        sx={{
          gridRow: 1,
          gridColumn: 1,
          opacity: ".8",
          ...sx
        }}
        src={skillBGImgUrl}
        alt={``}
      />
      {(!skillMastery || skillMastery === 0
        ? <Box
          component="img"
          sx={{
            gridRow: 1,
            gridColumn: 1,
            opacity: operator.promotion >= skill - 1 ? ".95" : "0.1",
            ...sx
          }}
          src={skillLvlUrl}
          alt={`Level ${operator.skillLevel}`}
        />
        : <Box
          component="img"
          sx={{
            gridRow: 1,
            gridColumn: 1,
            opacity: operator.promotion >= skill - 1 ? ".95" : "0.1",
            ...sx
          }}
          src={skillMasteryUrl}
          alt={`${skill} Mastery Level ${skillMastery}`}
        />
      )}
    </div>
  );
});

export default SkillDisplayBox;