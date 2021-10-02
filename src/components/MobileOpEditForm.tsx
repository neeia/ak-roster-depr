import { makeStyles } from "@material-ui/core";
import React from "react";
import slugify from "slugify";
import { useState } from "react";
import { Operator } from "../App"; 
import operatorJson from "../data/operators.json";
import FormButton from "./FormButton";
import { useBoxStyles } from "./BoxStyles"

const useStyles = makeStyles({
  displayBox: {
    justifyContent: "space-between",
    // backgroundColor: "#444455",
    // padding: "12px",
    // margin: "12px",
    // border: "2px solid pink",
    // borderRadius: "5px",
  },
  item: {
    // margin: "12px",
  },
  classIcon: {
    width: "48px",
    height: "48px",
  },
  opIcon: {
    width: "64px",
    height: "64px",
  },
  propContentContainer: {
    display: "inline-block",
    justifyContent: "flex",
    margin: "4px",
    flexGrow: 1,
  },
  editButtonContainer: {
    display: "flex",
    justifyContent: "space-evenly",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-evenly",
  },
  center: {
    textAlign: "center"
  }
});

interface Props {
  op: Operator;
  opClass: string;
  onChange: (
    operatorName: string,
    property: string,
    value: number | boolean
  ) => void;
}

const MobileOpEditForm = React.memo((props: Props) => {
  const { op, opClass, onChange } = props;
  const classes = useStyles();
  const boxStyle = useBoxStyles();

  const noneStr = "none";
  const [selectedClass, setSelectedClass] = useState(noneStr);

  let intermediate = op.name;
  if (op.promotion === 2) {
    intermediate += " elite 2";
  } else if (op.promotion === 1 && op.name === "Amiya") {
    intermediate += " elite 1";
  }
  const imgUrl = `https://res.cloudinary.com/samidare/image/upload/v1/arknights/operators/${slugify(
    intermediate,
    { lower: true, replacement: "-", remove: /-/g }
  )}`;

  return (
    <div className={classes.displayBox}>
      <img 
        className={classes.opIcon}
        src={imgUrl}
      />
      <img 
        className={classes.classIcon}
        src={`https://res.cloudinary.com/samidare/image/upload/v1/arknights/classes/${opClass}`}
      />
      {op.name}
      <div className={classes.editButtonContainer}>
        <FormButton 
          onClick={() => onChange(op.id, "owned", !op.owned)}
        >
          Owned
        </FormButton>
        <FormButton
          onClick={() => onChange(op.id, "favorite", !op.favorite)}
        >
          Favorite
        </FormButton>
      </div>
      <div className={classes.buttonContainer}>
        <div className={classes.propContentContainer}>
          <div className={classes.center}>
            Potential
          </div>
          <div className = {classes.editButtonContainer}>
            <FormButton 
              onClick={() => onChange(op.id, "potential", op.potential - 1)}
            >
              -1
            </FormButton>
            <div className = {boxStyle.borderStyle}>
              {op.potential}
            </div>
            <FormButton
              onClick={() => onChange(op.id, "potential", op.potential + 1)}
            >
              +1
            </FormButton>
            <FormButton
              onClick={() => onChange(op.id, "potential", 6)}
            >
              6
            </FormButton>
          </div>
        </div>
        <div className={classes.propContentContainer}>
          <div className={classes.center}>
            Promotion
          </div>
          <div className = {classes.editButtonContainer}>
            <FormButton onClick={() => onChange(op.id, "promotion", 0)}>0</FormButton>
            <FormButton onClick={() => onChange(op.id, "promotion", 1)}>1</FormButton>
            <FormButton onClick={() => onChange(op.id, "promotion", 2)}>2</FormButton>
          </div>
        </div>
      </div>
      <div className={classes.buttonContainer}>
        <div className={classes.propContentContainer}>
          <div className={classes.center}>
            Level
          </div>
          <div className = {classes.editButtonContainer}>
            <FormButton onClick={() => onChange(op.id, "level", op.level - 10)}>-10</FormButton>
            <FormButton onClick={() => onChange(op.id, "level", op.level - 1)}>-1</FormButton>
            {op.level}
            <FormButton onClick={() => onChange(op.id, "level", op.level + 1)}>+1</FormButton>
            <FormButton onClick={() => onChange(op.id, "level", op.level + 10)}>+10</FormButton>
            <FormButton onClick={() => onChange(op.id, "level", 90)}>Max</FormButton>
          </div>
        </div>
      </div>
      <div className={classes.buttonContainer}>
        <div className={classes.propContentContainer}>
          <div className={classes.center}>
            Skill Level
          </div>
          <div className = {classes.editButtonContainer}>
            <FormButton onClick={() => onChange(op.id, "skillLevel", 1)}>1</FormButton>
            <FormButton onClick={() => onChange(op.id, "skillLevel", 2)}>2</FormButton>
            <FormButton onClick={() => onChange(op.id, "skillLevel", 3)}>3</FormButton>
            <FormButton onClick={() => onChange(op.id, "skillLevel", 4)}>4</FormButton>
            <FormButton onClick={() => onChange(op.id, "skillLevel", 5)}>5</FormButton>
            <FormButton onClick={() => onChange(op.id, "skillLevel", 6)}>6</FormButton>
            <FormButton onClick={() => onChange(op.id, "skillLevel", 7)}>7</FormButton>
          </div>
        </div>
      </div>
      <div className={classes.buttonContainer}>
        <div className={classes.propContentContainer}>
          <div className={classes.center}>
            Skill 1 Mastery
          </div>
          <div className = {classes.editButtonContainer}>
            <FormButton onClick={() => onChange(op.id, "skill1Mastery", 1)}>1</FormButton>
            <FormButton onClick={() => onChange(op.id, "skill1Mastery", 2)}>2</FormButton>
            <FormButton onClick={() => onChange(op.id, "skill1Mastery", 3)}>3</FormButton>
          </div>
        </div>
        <div className={classes.propContentContainer}>
          <div className={classes.center}>
            Skill 2 Mastery
          </div>
          <div className = {classes.editButtonContainer}>
            <FormButton onClick={() => onChange(op.id, "skill2Mastery", 1)}>1</FormButton>
            <FormButton onClick={() => onChange(op.id, "skill2Mastery", 2)}>2</FormButton>
            <FormButton onClick={() => onChange(op.id, "skill2Mastery", 3)}>3</FormButton>
          </div>
        </div>
        <div className={classes.propContentContainer}>
          <div className={classes.center}>
            Skill 3 Mastery
          </div>
          <div className = {classes.editButtonContainer}>
            <FormButton onClick={() => onChange(op.id, "skill3Mastery", 1)}>1</FormButton>
            <FormButton onClick={() => onChange(op.id, "skill3Mastery", 2)}>2</FormButton>
            <FormButton onClick={() => onChange(op.id, "skill3Mastery", 3)}>3</FormButton>
          </div>
        </div>
      </div>
    </div>
  );
});
export default MobileOpEditForm;
