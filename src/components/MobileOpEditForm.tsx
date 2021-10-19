import { makeStyles } from "@material-ui/core";
import React from "react";
import slugify from "slugify";
import { useState } from "react";
import { Operator } from "../App"; 
import FormButton from "./FormButton";
import { useBoxStyles } from "./BoxStyles"
import { disableByProperty, errorForNumericProperty } from "./RosterTable";

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

      {/* Owned, Favorite */}
      <div className={classes.editButtonContainer}>
        <FormButton 
          onClick={() => onChange(op.id, "owned", !op.owned)}
          toggled={op.owned}
        >
          Owned
        </FormButton>
        <FormButton
          onClick={() => onChange(op.id, "favorite", !op.favorite)}
          toggled={op.favorite}
        >
          Favorite
        </FormButton>
      </div>

      {/* Potential and Promotion */}
      {disableByProperty(op, "potential") ? "" : 
        <div className={classes.buttonContainer}>

          {/* Potential */}
          <div className={classes.propContentContainer}>
            <div className={classes.center}>
              Potential
            </div>
            <div className = {classes.editButtonContainer}>
              <FormButton 
                onClick={() => onChange(op.id, "potential", op.potential - 1)}
                toggled={false}
              >
                -1
              </FormButton>
              <div className = {boxStyle.unborderStyle}>
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

          {/* Promotion */}
          <div className={classes.propContentContainer}>
            <div className={classes.center}>
              Promotion
            </div>
            <div className = {classes.editButtonContainer}>
              {[...Array(3)].map((x, i) =>
                <FormButton 
                  onClick={() => onChange(op.id, "promotion", i)}
                  toggled={op.promotion==i}
                >
                  {i.toString()}
                </FormButton>
              )}
            </div>
          </div>
        </div>
      }
      {/* Level */}
      {disableByProperty(op, "level") ? "" : 
        <div className={classes.buttonContainer}>
          <div className={classes.propContentContainer}>
            <div className={classes.center}>
              Level
            </div>
            <div className = {classes.editButtonContainer}>
              <FormButton onClick={() => onChange(op.id, "level", op.level - 10)}>-10</FormButton>
              <FormButton onClick={() => onChange(op.id, "level", op.level - 1)}>-1</FormButton>
              <div className = {boxStyle.unborderStyle}>
                {op.level}
              </div>
              <FormButton onClick={() => onChange(op.id, "level", op.level + 1)}>+1</FormButton>
              <FormButton onClick={() => onChange(op.id, "level", op.level + 10)}>+10</FormButton>
              <FormButton onClick={() => onChange(op.id, "level", 90)}>Max</FormButton>
            </div>
          </div>
        </div>
      }
      {/* Skill Level */}
      {disableByProperty(op, "skillLevel") ? "" : 
        <div className={classes.buttonContainer}>
          <div className={classes.propContentContainer}>
            <div className={classes.center}>
              Skill Level
            </div>
            <div className = {classes.editButtonContainer}>
              {[...Array(7)].map((x, i) =>
                <FormButton
                  onClick={() => onChange(op.id, "skillLevel", i+1)}
                  toggled={op.skillLevel==i+1}
                >
                  {i+1}
                </FormButton>
              )}
            </div>
          </div>
        </div>
      }

      {/* Mastery */}
      {disableByProperty(op, "skill1Mastery") ? "" : 
      <div className={classes.buttonContainer}>
          {/* <SkillDisplayBox operator={op} skill={1} hideLevel={true}/> */}
          <div className={classes.propContentContainer}>
            <div className={classes.center}>
              Skill 1 Mastery
            </div>
            <div className = {classes.editButtonContainer}>
              {[...Array(4)].map((x, i) =>
                <FormButton 
                  onClick={() => onChange(op.id, "skill1Mastery", i)}
                  toggled={op.skill1Mastery==i}
                >
                  {i.toString()}
                </FormButton>
              )}
            </div>
          </div>
        </div>
      }
      {disableByProperty(op, "skill2Mastery") ? "" : 
        <div className={classes.buttonContainer}>
          {/* <SkillDisplayBox operator={op} skill={2} hideLevel={true}/> */}
          <div className={classes.propContentContainer}>
            <div className={classes.center}>
              Skill 2 Mastery
            </div>
            <div className = {classes.editButtonContainer}>
              {[...Array(4)].map((x, i) =>
                <FormButton 
                  onClick={() => onChange(op.id, "skill2Mastery", i)}
                  toggled={op.skill2Mastery==i}
                >
                  {i.toString()}
                </FormButton>
              )}
            </div>
          </div>
        </div>
      }
      {disableByProperty(op, "skill3Mastery") ? "" : 
        <div className={classes.buttonContainer}>
          {/* <SkillDisplayBox operator={op} skill={3} hideLevel={true}/> */}
          <div className={classes.propContentContainer}>
            <div className={classes.center}>
              Skill 3 Mastery
            </div>
            <div className = {classes.editButtonContainer}>
              {[...Array(4)].map((x, i) =>
                <FormButton 
                  onClick={() => onChange(op.id, "skill3Mastery", i)}
                  toggled={op.skill3Mastery==i}
                >
                  {i.toString()}
                </FormButton>
              )}
            </div>
          </div>
        </div>
      }
    </div>
  );
});
export default MobileOpEditForm;
