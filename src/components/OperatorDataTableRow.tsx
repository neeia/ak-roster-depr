import { Grid } from "@material-ui/core";
import React from "react";
import slugify from "slugify";
import { useState } from "react";

interface Props {
  name: string;
  rarity: number;
}

function OperatorDataTableRow(props: Props) {
  const { name, rarity } = props;
  let potential = 0;
  const [promotion, setPromotion] = useState(0);
  let level = 0;
  const [skillLevel, setSkillLevel] = useState(0);
  let skill1Mastery = 0;
  let skill2Mastery = 0;
  let skill3Mastery = 0;
  const [owned, setOwned] = useState(false);
  
  let intermediate = name;
  if (promotion === 2) {
    intermediate += " elite 2";
  } else if (promotion === 1 && name === "Amiya") {
    intermediate += " elite 1";
  }

  const imgUrl = `https://res.cloudinary.com/samidare/image/upload/v1/arknights/operators/${slugify(
    intermediate,
    { lower: true, replacement: "-" }
  )}`;


  const listenerOwned = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOwned(e.target.checked);
  };
  
  const listenerPromotion = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPromotion(e.target.valueAsNumber);
  };

  const listenerSkillLevel = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSkillLevel(e.target.valueAsNumber);
  };

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item><input type="checkbox" checked={owned} onChange={listenerOwned} /></Grid>
      <Grid item>
        <img
          style={{opacity :  (owned ? 1 : 0.2)}}
          className="table-icon-small" 
          src={imgUrl} 
          alt={name} />
      </Grid>
      <Grid item>{rarity}</Grid>
      <Grid item>{name}</Grid>
      <Grid item><input defaultValue={potential} disabled={!owned}/></Grid>
      <Grid item><input defaultValue={promotion} onChange={listenerPromotion} disabled={!owned}/></Grid>
      <Grid item><input defaultValue={level} disabled={!owned}/></Grid>
      <Grid item><input defaultValue={skillLevel} onChange={listenerSkillLevel} disabled={!owned}/></Grid>
      <Grid item><input defaultValue={skill1Mastery} disabled={promotion<2 || skillLevel<7 || !owned}/></Grid>
      <Grid item><input defaultValue={skill2Mastery} disabled={promotion<2 || skillLevel<7 || !owned}/></Grid>
      <Grid item><input defaultValue={skill3Mastery} disabled={promotion<2 || skillLevel<7 || !owned}/></Grid>
    </Grid>
  );
}
export default OperatorDataTableRow;
