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
      <input type="checkbox" />
      <Grid item>
        <img className="table-icon-small" src={imgUrl} alt={name} />
      </Grid>
      <Grid item>{name}</Grid>
      <Grid item><input defaultValue={potential}/></Grid>
      <Grid item><input defaultValue={promotion}/></Grid>
      <Grid item><input defaultValue={level}/></Grid>
      <Grid item><input defaultValue={skillLevel}/></Grid>
      <Grid item><input defaultValue={skill1Mastery}/></Grid>
      <Grid item><input defaultValue={skill2Mastery}/></Grid>
      <Grid item><input defaultValue={skill3Mastery}/></Grid>
    </Grid>
  );
}
export default OperatorDataTableRow;
