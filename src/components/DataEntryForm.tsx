import { ButtonBase, makeStyles, TextField } from "@material-ui/core";
import React from "react";
import slugify from "slugify";
import { Operator } from "../App"; 
import FormButton from "./FormButton";
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
  skillContainer: {
    display: "grid",
    gridTemplateColumns: "auto auto 1fr",
  },
  skillLevelContainer: {
    display: "grid",
    gridTemplateRows: "1fr auto 1fr",
    gridTemplateColumns: "1fr auto 1fr",
  },
  skillLevel: {
    gridArea: "2 / 2",
    justifySelf: "center",
    alignSelf: "center",
    display: "grid",
    margin: "4px"
  },
  skillLevelStack: {
    gridArea: "1 / 1",
    width: "48px",
    height: "48px",
  },
  skillLevelPrevious: {
    gridArea: "2 / 1",
    justifySelf: "right",
    alignSelf: "center",
    display: "grid",
    gridTemplateAreas: `"label" "stack"`,
  },
  skillLevelNext: {
    gridArea: "2 / 3",
    justifySelf: "left",
    alignSelf: "center",
    display: "grid",
    gridTemplateAreas: `"label" "stack"`,
  },
  skillLevelRaise: {
    gridArea: "1 / 2",
    alignSelf: "end",
    display: "grid",
    gridTemplateAreas: `"label" "stack"`,
  },
  skillLevelDecrease: {
    gridArea: "3 / 2",
    alignSelf: "start",
    display: "grid",
    gridTemplateAreas: `"stack" "label"`,
  },
  disabled: {
    opacity: "0.3",
  },
  skillButtonStack: {
    gridArea: "stack",
    width: "40px",
    height: "40px",
  },
  skillButtonHalf: {
    gridArea: "stack",
    width: "40px",
    height: "20px",
  },
  skillVerticalDivider: {
    backgroundColor: "#909090",
    width: "2px",
    height: "240px",
    alignSelf: "center",
    marginLeft: "16px",
    marginRight: "16px",
  },
  skillMasteryContainer: {
    display: "grid",
    gridTemplateRows: "1fr 1fr 1fr",
  },
  skillMastery: {
    display: "grid",
    gridTemplateAreas: `"name name name name name"
                        "icon m m m m"`,
    gridTemplateColumns: `"auto repeat(4, 1fr)"`,
    gridTemplateRows: "auto 1fr",
    justifyItems: "center",
    alignItems: "center",
  },
  skillName: {
    gridArea: "name",
    fontSize: "16px",
  },
  skillIcon: {
    width: "60px",
    height: "60px",
    marginRight: "4px",
  },
  skillMasteryButton: {
    width: "48px",
    height: "48px",
    marginLeft: "2px",
  },
  skillMasteryIcon: {
    width: "32px",
    height: "32px",
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

  const skillLvlImgUrl = `https://res.cloudinary.com/samidare/image/upload/v1/arknights/skill-levels/${op.skillLevel}`;
  const skillBGImgUrl = `https://res.cloudinary.com/samidare/image/upload/v1/arknights/skill-levels/bg`;
  const previousSkillLevel = op.skillLevel > 4 ? 4 : 1;
  const nextSkillLevel = op.skillLevel < 4 ? 4 : 7;
  const skillPrvImgUrl = `https://res.cloudinary.com/samidare/image/upload/v1/arknights/skill-levels/${previousSkillLevel}`;
  const skillNxtImgUrl = `https://res.cloudinary.com/samidare/image/upload/v1/arknights/skill-levels/${nextSkillLevel}`;
  const minusSkillLevel = op.skillLevel === 1 ? 1 : op.skillLevel - 1;
  const plusSkillLevel = op.skillLevel === 7 ? 7 : op.skillLevel + 1;
  const skillMnsImgUrl = `https://res.cloudinary.com/samidare/image/upload/v1/arknights/skill-levels/${minusSkillLevel}`;
  const skillPlsImgUrl = `https://res.cloudinary.com/samidare/image/upload/v1/arknights/skill-levels/${plusSkillLevel}`;

  const skillLevelSection = (
    <div className={classes.skillLevelContainer}>
      <div className={classes.skillLevel}>
        <img
          className={classes.skillLevelStack}
          src={skillBGImgUrl}
        />
        <img
          className={classes.skillLevelStack}
          src={skillLvlImgUrl}
        />
      </div>
      <ButtonBase
        classes={{
          root: classes.skillLevelNext,
          disabled: classes.disabled
        }}
        onClick={() => (onChange(op.id, "skillLevel", nextSkillLevel))}
        disabled={op.skillLevel >= 7}
      >
        <img
          className={classes.skillButtonStack}
          src={skillBGImgUrl}
        />
        <img
          className={classes.skillButtonStack}
          src={skillNxtImgUrl}
        />
      </ButtonBase>
      <ButtonBase
        classes={{
          root: classes.skillLevelPrevious,
          disabled: classes.disabled
        }}
        onClick={() => (onChange(op.id, "skillLevel", previousSkillLevel))}
        disabled={op.skillLevel <= 1}
      >
        <img
          className={classes.skillButtonStack}
          src={skillBGImgUrl}
        />
        <img
          className={classes.skillButtonStack}
          src={skillPrvImgUrl}
        />
      </ButtonBase>
      <ButtonBase
        classes={{
          root: classes.skillLevelRaise,
          disabled: classes.disabled
        }}
        onClick={() => (onChange(op.id, "skillLevel", op.skillLevel + 1))}
        disabled={op.skillLevel >= 7}
      >
        <svg
          className={classes.skillButtonHalf}
        >
          <rect x="0" y="0" className={classes.skillButtonHalf} fill="transparent" stroke="#808080" strokeWidth="1" />
          <path d="M 8 15 L 20 7 L 32 15" fill="transparent" stroke="white" strokeLinecap="round" strokeWidth="3" />
        </svg>
      </ButtonBase>
      <ButtonBase
        classes={{
          root: classes.skillLevelDecrease,
          disabled: classes.disabled
        }}
        onClick={() => (onChange(op.id, "skillLevel", op.skillLevel - 1))}
        disabled={op.skillLevel <= 1}
      >
        <svg
          className={classes.skillButtonHalf}
        >
          <rect x="0" y="0" className={classes.skillButtonHalf} fill="transparent" stroke="#808080" strokeWidth="1" />
          <path d="M 8 5 L 20 13 L 32 5" fill="transparent" stroke="white" strokeLinecap="round" strokeWidth="3" />
        </svg>
      </ButtonBase>
    </div>);

  // returns whether an operator has a skill of the given number
  const hasSkill = (skill: number) => {
    switch (skill) {
      case 0:
        return op.rarity > 2;
      case 1:
        return op.rarity > 3;
      case 2:
        return op.rarity === 6 || op.name === "Amiya";
      default: return undefined;
    }
  }

  // returns operator's current skill mastery of the given skill
  function getSkillMastery(skill: number) {
    switch (skill) {
      case 1: return op.skill1Mastery;
      case 2: return op.skill2Mastery;
      case 3: return op.skill3Mastery;
      default: return undefined;
    }
  }

  const skillMasterySection = (
    <div className={classes.skillMasteryContainer}>
      {[...Array(3)].map((x, i) => {
        const disabled = disableByProperty(op, `skill${i + 1}Mastery`);
        return (
          <div className={classes.skillMastery}>
          {hasSkill(i)
            ? <div className={classes.skillName}>
              {opInfo.skills[i].skillName}
            </div>
            : <div className={classes.skillName}>
              No Skill
            </div>
          }
          {hasSkill(i)
            ?
            <img
              className={classes.skillIcon}
              src={`https://res.cloudinary.com/samidare/image/upload/v1/arknights/skills/${opInfo.skills[i].iconId ?? opInfo.skills[i].skillId}`}
            />
            : <svg
              className={classes.skillIcon}
            >
              <rect x="0" y="0" className={classes.skillIcon} fill="transparent" stroke="gray" strokeWidth="4" />
              <path d="M 16 48 L 48 16" fill="transparent" stroke="gray" strokeWidth="3" />
            </svg>}
          {[...Array(4)].map((x, j) =>
            <FormButton
              className={classes.skillMasteryButton}
              onClick={() => onChange(op.id, `skill${i + 1}Mastery`, j)}
              toggled={getSkillMastery(i + 1) === j}
              disabled={!hasSkill(i)}
            >
              <img
                className={classes.skillMasteryIcon}
                src={`https://res.cloudinary.com/samidare/image/upload/v1/arknights/mastery/${j}`}
              />
            </FormButton>
          )}
        </div>
        );
      })}
    </div>);
  
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
      <hr className={classes.hr}
      />
      <div className={classes.skillContainer}>
        {/* Skill Level */}
        {skillLevelSection}
        <div className={classes.skillVerticalDivider} />
        {/* Mastery */}
        {skillMasterySection}
      </div>
    </div>
  );
});
export default DataEntryForm;
