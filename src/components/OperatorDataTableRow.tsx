import { Grid } from "@material-ui/core";
import React from "react";
import slugify from "slugify";

export interface OperatorProps {
  name: string;
  potential: number;
  promotion: number;
  level?: number;
  skillLevel: number;
  skill1Mastery?: number;
  skill2Mastery?: number;
  skill3Mastery?: number;
}

function OperatorDataTableRow(props: OperatorProps) {
  const {
    name,
    potential,
    promotion,
    level,
    skillLevel,
    skill1Mastery,
    skill2Mastery,
    skill3Mastery,
  } = props;
  let whatever = name;

  if (promotion === 2) {
    whatever += " elite 2";
  } else if (promotion === 1 && name === "Amiya") {
    whatever += " elite 1";
  }

  const imgUrl = `https://res.cloudinary.com/samidare/image/upload/v1/arknights/operators/${slugify(
    whatever,
    { lower: true, replacement: "-" }
  )}`;

  return (
    <Grid container spacing={2}>
      <Grid item>
        <img className="img-field" src={imgUrl} alt={name} />
      </Grid>
      <Grid item>{name}</Grid>
      <Grid item>{potential}</Grid>
      <Grid item>{promotion}</Grid>
      <Grid item>{level}</Grid>
      <Grid item>{skillLevel}</Grid>
      <Grid item>{skill1Mastery}</Grid>
      <Grid item>{skill2Mastery}</Grid>
      <Grid item>{skill3Mastery}</Grid>
    </Grid>
  );
}
export default OperatorDataTableRow;
