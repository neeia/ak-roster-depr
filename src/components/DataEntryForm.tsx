import { ButtonBase, makeStyles, TextField } from "@material-ui/core";
import React from "react";
import slugify from "slugify";
import { Operator } from "../App"; 
import FormButton from "./FormButton";
import DataEntrySkillLevel from "./DataEntrySkillLevel";
import { useBoxStyles } from "./BoxStyles"
import { disableByProperty, errorForNumericProperty, MAX_LEVEL_BY_RARITY } from "./RosterTable";
import clsx from "clsx";
import operatorJson from "../data/operators.json";

const useStyles = makeStyles({
  displayBox: {
    display: "grid",
    gridTemplateRows: "auto 0.6fr 1fr 1fr auto auto",
    padding: "8px",
    boxShadow: "2px 2px 8px rgb(0 0 0 / 30%)",
  },
  disabled: {
    opacity: "0.3",
  },
  opName: {
    marginLeft: "8px",
    fontSize: "36px",
    paddingTop: "12px",
  },
  alterTitle: {
    marginLeft: "8px",
    fontSize: "18px",
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
    gap: "3px",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-evenly",
    gap: "4px",
  },
  opImgNameBox: {
    textAlign: "left",
    display: "flex",
    alignItems: "center",
    paddingBottom: "12px",
  },
  center: {
    textAlign: "center"
  },
  buttonContent: {
    fontSize: "14px",
    paddingTop: "2px",
    paddingBottom: "4px",
  },
  unborder: {
    border: "none"
  },
  hr: {
    borderColor: "grey",
    borderWidth: "2px"
  },
  textField: {
    textAlign: "right",
    maxWidth: "30px",
  },
  flex: {
    flexGrow: 1,
  },
  noSkill: {
    border: "2px solid gray",
  }
});

interface Props {
  op: Operator;
  opClass: string;
  onChange: (
    operatorId: string,
    property: string,
    value: number | boolean
  ) => void;
}

const DataEntryForm = React.memo((props: Props) => {
  const { op, opClass, onChange } = props;
  const classes = useStyles();
  const boxStyle = useBoxStyles();
  const opInfo = (operatorJson as any)[op.id];

  let intermediate = op.name;
  if (op.promotion === 2) {
    intermediate += " elite 2";
  } else if (op.promotion === 1 && op.name === "Amiya") {
    intermediate += " elite 1";
  }
  const imgUrl = `https://res.cloudinary.com/samidare/image/upload/v1/arknights/operators/${slugify(
    intermediate,
    { lower: true, replacement: "-", remove: /[-"]/g }
  )}`;

  let opName = (
    <span className={classes.opName}>
      {op.name}
    </span>
  )
  if (op.name.includes(" the ")) {
    const splitName = op.name.split(" the ");
    opName = (
      <span>
        <span className={classes.opName}>
          {splitName[0]}
        </span>
        <span className={classes.alterTitle}>
          {splitName[1]}
        </span>
      </span>
    )
  }

  const unborderStyle = clsx({
    [boxStyle.boxStyle]: "true",
    [classes.unborder]: "true",
  });


  const boxBox = clsx({
    [boxStyle.boxStyle]: "true",
    [classes.displayBox]: "true",
  });

  const [potentialField, setPotentialField] = React.useState<number | string>(op.potential);
  const [levelField, setLevelField] = React.useState<number | string>(op.level);

  function updatePotential(pot: string | number) {
    if (typeof pot === "number") {
      onChange(op.id, "potential", pot);
      setPotentialField(Math.min(Math.max(pot, 1), 6).toString());
    }
    else if (parseInt(pot)) {
      onChange(op.id, "potential", parseInt(pot));
      setPotentialField(Math.min(Math.max(parseInt(pot), 1), 6).toString());
    }
    else {
      setPotentialField("");
    }
  };

  function updateLevel(lvl: string | number) {
    if (typeof lvl === "number") {
      onChange(op.id, "level", lvl);
      setLevelField(Math.max(Math.min(lvl, MAX_LEVEL_BY_RARITY[op.rarity][op.promotion]), 1).toString());
    }
    else if (parseInt(lvl)) {
      onChange(op.id, "level", parseInt(lvl));
      setLevelField(Math.max(Math.min(parseInt(lvl), MAX_LEVEL_BY_RARITY[op.rarity][op.promotion]), 1).toString());
    }
    else {
      setLevelField("");
    }
  };

  return (
    <div className={boxBox}>
      <div className={classes.opImgNameBox}>
        <img 
          className={classes.opIcon}
          src={imgUrl}
          alt=""
        />
        {/*<img
          className={classes.classIcon}
          src={`https://res.cloudinary.com/samidare/image/upload/v1/arknights/classes/${opClass}`}
          alt={opClass}
        />*/}
        {opName}
      </div>
      
      {/* Owned, Favorite */}
      <div className={classes.editButtonContainer}>
        <FormButton 
          onClick={() => {
            onChange(op.id, "owned", !op.owned);
          }}
          toggled={op.owned}
        >
          <div className={classes.buttonContent}>
            Owned
          </div>
        </FormButton>
        <FormButton
          onClick={() => onChange(op.id, "favorite", !op.favorite)}
          toggled={op.favorite}
        >
          <div className={classes.buttonContent}>
            Favorite
          </div>
        </FormButton>
      </div>

      <div className={classes.buttonContainer}>
      {/* Potential and Promotion */}
        {/* Potential */}
        {disableByProperty(op, "potential") ? "" : 
          <div className={classes.propContentContainer}>
            <div className={classes.center}>
              Potential
            </div>
            <div className = {classes.editButtonContainer}>
              <FormButton 
                onClick={() => updatePotential(op.potential - 1)}
                toggled={false}
              >
                <div className={classes.buttonContent}>
                  -1
                </div>
              </FormButton>
              <div className={classes.flex}>
                <TextField
                  className={classes.textField}
                  value={potentialField}
                  onChange={(e) =>
                  {
                    updatePotential(e.target.value)
                  }}
                />
              </div>
              <FormButton
                onClick={() => updatePotential(op.potential + 1)}
              >
                <div className={classes.buttonContent}>
                  +1
                </div>
              </FormButton>
              <FormButton
                onClick={() => updatePotential(6)}
              >
                <div className={classes.buttonContent}>
                  6
                </div>
              </FormButton>
            </div>
          </div>
        }
        {/* Promotion */}
        {disableByProperty(op, "promotion") ? "" : 
          <div className={classes.propContentContainer}>
            <div className={classes.center}>
              Promotion
            </div>
            <div className = {classes.editButtonContainer}>
              {[...Array(3)].map((x, i) =>
                <FormButton 
                  onClick={() => onChange(op.id, "promotion", i)}
                  toggled={op.promotion === i}
                >
                  <div className={classes.buttonContent}>
                    {i.toString()}
                  </div>
                </FormButton>
              )}
            </div>
          </div>
        }
      </div>
      {/* Level */}
        <div className={classes.buttonContainer}>
        <div className={classes.propContentContainer}>
          <div className={classes.center}>
            Level
          </div>
          <div className = {classes.editButtonContainer}>
              <FormButton onClick={() => updateLevel(op.level - 10)}>-10</FormButton>
              <FormButton onClick={() => updateLevel(op.level - 1)}>-1</FormButton>
              <div className={classes.flex}>
                <TextField
                  className={classes.textField}
                  value={levelField}
                  onChange={(e) => {
                    updateLevel(e.target.value)
                  }}
                />
              </div>
              <FormButton onClick={() => updateLevel(op.level + 1)}>
                <div className={classes.buttonContent}>
                  +1
                </div></FormButton>
              <FormButton onClick={() => updateLevel(op.level + 10)}>
                <div className={classes.buttonContent}>
                  +10
                </div>
              </FormButton>
              <FormButton 
                onClick={() => updateLevel(9999)}
                toggled={op.level === MAX_LEVEL_BY_RARITY[op.rarity][op.promotion]}
                >
                  <div className={classes.buttonContent}>
                    Max
                  </div>
              </FormButton>
            </div>
          </div>
        </div>
      <hr className={classes.hr} />
      <DataEntrySkillLevel op={op} onChange={onChange} />
    </div>
  );
});
export default DataEntryForm;
