import { Grid } from "@material-ui/core";
import React from "react";
import slugify from "slugify";
import { useState } from "react";
import { Operator } from "../App";

interface Props {
  operator: Operator;
  onChange: (operatorName: string, property: string, value: number | boolean) => void;
}

function OperatorDataTableRow(props: Props) {
  const { operator, onChange } = props;
  
  let intermediate = operator.name;
  if (operator.promotion === 2) {
    intermediate += " elite 2";
  } else if (operator.promotion === 1 && operator.name === "Amiya") {
    intermediate += " elite 1";
  }

  const imgUrl = `https://res.cloudinary.com/samidare/image/upload/v1/arknights/operators/${slugify(
    intermediate,
    { lower: true, replacement: "-" }
  )}`;

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item>
        <input 
          name="owned"
          type="checkbox" 
          checked={operator.owned} 
          onChange={(e) => onChange(operator.name, e.target.name, e.target.checked)}
        />
      </Grid>
      <Grid item>
        <img
          style={{opacity :  (operator.owned ? 1 : 0.2)}}
          className="table-icon-small" 
          src={imgUrl} 
          alt={operator.name} />
      </Grid>
      <Grid item>{operator.rarity}</Grid>
      <Grid item>{operator.name}</Grid>
      <Grid item>
        <input 
          name="potential"
          type="number"
          value={operator.potential}
          disabled={!operator.owned}
          onChange={(e) => onChange(operator.name, e.target.name, e.target.valueAsNumber)} 
        />
      </Grid>
      <Grid item>
        <input 
          name="promotion"
          type="number"
          value={operator.promotion}
          disabled={!operator.owned}
          onChange={(e) => onChange(operator.name, e.target.name, e.target.valueAsNumber)} 
        />
      </Grid>
      <Grid item>
        <input 
          name="level"
          type="number"
          value={operator.level}
          disabled={!operator.owned}
          onChange={(e) => onChange(operator.name, e.target.name, e.target.valueAsNumber)} 
        />
      </Grid>
      <Grid item>
        <input 
          name="skillLevel"
          type="number"
          value={operator.skillLevel}
          disabled={!operator.owned}
          onChange={(e) => onChange(operator.name, e.target.name, e.target.valueAsNumber)} 
        />
      </Grid>
      <Grid item>
        <input 
          name="skill1Mastery"
          type="number"
          value={operator.skill2Mastery}
          disabled={operator.promotion<2 || operator.skillLevel<7 || !operator.owned}
          onChange={(e) => onChange(operator.name, e.target.name, e.target.valueAsNumber)} 
        />
      </Grid>
      <Grid item>
        <input 
          name="skill1Mastery"
          type="number"
          value={operator.skill2Mastery}
          disabled={operator.promotion<2 || operator.skillLevel<7 || !operator.owned}
          onChange={(e) => onChange(operator.name, e.target.name, e.target.valueAsNumber)} 
        />
      </Grid>
      <Grid item>
        <input 
          name="skill2Mastery"
          type="number"
          value={operator.skill2Mastery}
          disabled={operator.promotion<2 || operator.skillLevel<7 || !operator.owned}
          onChange={(e) => onChange(operator.name, e.target.name, e.target.valueAsNumber)} 
        />
      </Grid>
    </Grid>
  );
}
export default OperatorDataTableRow;
