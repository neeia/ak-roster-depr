import { ButtonBase, makeStyles } from "@material-ui/core";
import React from "react";
import { Operator } from "../App";
import FormButton from "./FormButton";
import { disableByProperty } from "./RosterTable";
import operatorJson from "../data/operators.json";

const useStyles = makeStyles({
  skillContainer: {
    display: "grid",
    gridTemplateColumns: "auto auto 1fr",
  },
  label: {
    fontSize: "18px",
    marginBottom: "4px",
    lineHeight: "20px",
    width: "96px",
    borderBottom: "2px solid #909090",
    justifySelf: "center",
  },
  /* SKILL LEVEL */
  skillLevelContainer: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    justifyContent: "start",
    alignItems: "center",
    width: "150px",
  },
  skillLevelInputContainer: {
    display: "grid",
    gridTemplateRows: "1fr auto 1fr",
    gridTemplateColumns: "1fr auto 1fr",
    margin: "4px",
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
    gridTemplateAreas: `"stack"`,
  },
  skillLevelNext: {
    gridArea: "2 / 3",
    justifySelf: "left",
    alignSelf: "center",
    display: "grid",
    gridTemplateAreas: `"stack"`,
  },
  skillLevelRaise: {
    gridArea: "1 / 2",
    alignSelf: "end",
    display: "grid",
    gridTemplateAreas: `"stack"`,
  },
  skillLevelDecrease: {
    gridArea: "3 / 2",
    alignSelf: "start",
    display: "grid",
    gridTemplateAreas: `"stack"`,
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
  /* DIVIDER */
  skillVerticalDivider: {
    backgroundColor: "#909090",
    width: "2px",
    height: "240px",
    alignSelf: "end",
    marginLeft: "8px",
    marginRight: "8px",
    marginBottom: "10px",
  },
  /* MASTERIES */
  skillMasteryContainer: {
    display: "grid",
    gridTemplateRows: "auto 1fr 1fr 1fr",
    width: "275px",
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
    width:  "60px",
    height: "60px",
    marginRight: "4px",
  },
  skillMasteryButton: {
    width:  "48px",
    height: "48px",
    marginLeft: "2px",
    display: "grid",
    gridTemplateAreas: `"stack"`,
  },
  skillMasteryIcon: {
    gridArea: "stack",
    width: "36px",
    height: "36px",
  },
  skillMasteryIconUnselected: {
    gridArea: "stack",
    width: "36px",
    height: "36px",
    opacity: "0.75",
  },
  noSkill: {
    border: "2px solid gray",
  }
});

interface Props {
  op: Operator;
  onChange: (
    operatorId: string,
    property: string,
    value: number | boolean
  ) => void;
}

const DataEntrySkillLevel = React.memo((props: Props) => {
  const { op, onChange } = props;
  const classes = useStyles();
  const opInfo = (operatorJson as any)[op.id];

  const skillLvlImgUrl = `https://res.cloudinary.com/samidare/image/upload/v1/arknights/skill-levels/${op.skillLevel}`;
  const skillBGImgUrl = `https://res.cloudinary.com/samidare/image/upload/v1/arknights/skill-levels/bg`;
  const previousSkillLevel = op.skillLevel > 4 ? 4 : 1;
  const nextSkillLevel = op.skillLevel < 4 ? 4 : 7;
  const skillPrvImgUrl = `https://res.cloudinary.com/samidare/image/upload/v1/arknights/skill-levels/${previousSkillLevel}`;
  const skillNxtImgUrl = `https://res.cloudinary.com/samidare/image/upload/v1/arknights/skill-levels/${nextSkillLevel}`;

  const skillLevelSection = (
    <div className={classes.skillLevelContainer}>
      <div className={classes.label}>
        Skill Level
      </div>
      <div className={classes.skillLevelInputContainer}>
        <div className={classes.skillLevel}>
          <img
            className={classes.skillLevelStack}
            src={skillBGImgUrl}
            alt={""}
          />
          {op.skillLevel > 0
            ? <img
              className={classes.skillLevelStack}
              src={skillLvlImgUrl}
              alt={`Skill Level ${op.skillLevel}`}
            />
            : <svg
              className={classes.skillLevelStack}
            >
              <path d="M 18 24 H 30" fill="transparent" stroke="#808080" strokeLinecap="butt" strokeWidth="3" />
            </svg>}
        </div>
        <ButtonBase
          classes={{
            root: classes.skillLevelNext,
            disabled: classes.disabled
          }}
          onClick={() => (onChange(op.id, "skillLevel", nextSkillLevel))}
          disabled={!op.owned || op.rarity < 3 || op.skillLevel >= 7}
        >
          <img
            className={classes.skillButtonStack}
            src={skillBGImgUrl}
            alt={""}
          />
          <img
            className={classes.skillButtonStack}
            src={skillNxtImgUrl}
            alt={`Jump to Skill Level ${nextSkillLevel}`}
          />
        </ButtonBase>
        <ButtonBase
          classes={{
            root: classes.skillLevelPrevious,
            disabled: classes.disabled
          }}
          onClick={() => (onChange(op.id, "skillLevel", previousSkillLevel))}
          disabled={!op.owned || op.rarity < 3 || op.skillLevel <= 1}
        >
          <img
            className={classes.skillButtonStack}
            src={skillBGImgUrl}
            alt={""}
          />
          <img
            className={classes.skillButtonStack}
            src={skillPrvImgUrl}
            alt={`Jump to Skill Level ${previousSkillLevel}`}
          />
        </ButtonBase>
        <ButtonBase
          classes={{
            root: classes.skillLevelRaise,
            disabled: classes.disabled
          }}
          onClick={() => (onChange(op.id, "skillLevel", op.skillLevel + 1))}
          disabled={!op.owned || op.rarity < 3 || op.skillLevel >= 7}
        >
          <svg
            className={classes.skillButtonHalf}
          >
            <rect x="0" y="0" className={classes.skillButtonHalf} fill="transparent" stroke="#808080" strokeWidth="1" />
            <path d="M 8 15 L 20 7 L 32 15" fill="transparent" stroke="white" strokeLinecap="round" strokeWidth="3" />
            alt={`Plus 1`}
          </svg>
        </ButtonBase>
        <ButtonBase
          classes={{
            root: classes.skillLevelDecrease,
            disabled: classes.disabled
          }}
          onClick={() => (onChange(op.id, "skillLevel", op.skillLevel - 1))}
          disabled={!op.owned || op.rarity < 3 || op.skillLevel <= 1}
        >
          <svg
            className={classes.skillButtonHalf}
          >
            <rect x="0" y="0" className={classes.skillButtonHalf} fill="transparent" stroke="#808080" strokeWidth="1" />
            <path d="M 8 5 L 20 13 L 32 5" fill="transparent" stroke="white" strokeLinecap="round" strokeWidth="3" />
            alt={`Minus 1`}
          </svg>
        </ButtonBase>
      </div>
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
      <div className={classes.label}>
        Masteries
      </div>
      {[...Array(3)].map((x, i) => {
        const disabled = !op.owned || !hasSkill(i) || disableByProperty(op, `skill${i + 1}Mastery`);
        return (
          <div
            key={"skill" + (i+1) + "MasteryBlock"}
            className={classes.skillMastery}
          >
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
                alt={`Skill ${i}`}
              />
              : <svg
                className={classes.skillIcon}
              >
                <rect x="0" y="0" className={classes.skillIcon} fill="transparent" stroke="gray" strokeWidth="4" />
                <path d="M 16 48 L 48 16" fill="transparent" stroke="gray" strokeWidth="3" />
                alt={`Skill ${i}`}
              </svg>}
            {[...Array(4)].map((x, j) =>
              <FormButton
                key={`mastery${j}Button`}
                className={classes.skillMasteryButton}
                onClick={() => onChange(op.id, `skill${i + 1}Mastery`, j)}
                toggled={getSkillMastery(i + 1) === j}
                disabled={disabled}
              >
                <img
                  className={classes.skillMasteryIcon}
                  src={skillBGImgUrl}
                  alt={""}
                />
                <img
                  className={getSkillMastery(i + 1) === j ? classes.skillMasteryIcon : classes.skillMasteryIconUnselected}
                  src={`https://res.cloudinary.com/samidare/image/upload/v1/arknights/mastery/${j}`}
                  alt={`Mastery ${i+1}`}
                />
              </FormButton>
            )}
          </div>
        );
      })}
    </div>);

  return (
    <div className={classes.skillContainer}>
      {/* Skill Level */}
      {skillLevelSection}
      <div className={classes.skillVerticalDivider} />
      {/* Mastery */}
      {skillMasterySection}
    </div>
  );
});
export default DataEntrySkillLevel;
