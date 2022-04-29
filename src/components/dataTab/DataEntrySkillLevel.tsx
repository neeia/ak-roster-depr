import React from "react";
import { Operator } from "../../App";
import operatorJson from "../../data/operators.json";
import { disableByProperty } from "../RosterTable";
import { ButtonBase, Grid, Hidden, makeStyles } from "@material-ui/core";
import FormButton from "../FormButton";
import clsx from "clsx";
import { useDataStyles } from "./DataTabSharedStyles";
import DataLabel from "./DataLabel";

const useStyles = makeStyles({
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
  /* MASTERIES */
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
    fontSize: "13px",
  },
  skillIcon: {
    width: "48px",
    height: "48px",
    margin: "2px",
  },
  skillMasteryButton: {
    width: "40px",
    height: "40px",
    margin: "2px",
    display: "grid",
    gridTemplateAreas: `"stack"`,
  },
  skillMasteryIcon: {
    gridArea: "stack",
    width: "32px",
    height: "32px",
  },
  unselected: {
    opacity: "0.5",
  },
  svg: {
    "&:focus": {
      boxShadow: "0px 0px 0px 1px #fcf3dc inset",
      background: "#505050"
    }
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
  const style = useDataStyles();
  const opInfo = (operatorJson as any)[op.id];

  const skillLvlImgUrl = `https://res.cloudinary.com/samidare/image/upload/f_auto,h_192,w_192/v1/arknights/skill-levels/${op.skillLevel}`;
  const skillBGImgUrl = `https://res.cloudinary.com/samidare/image/upload/f_auto,h_192,w_192/v1/arknights/skill-levels/bg`;
  const previousSkillLevel = op.skillLevel > 4 ? 4 : 1;
  const nextSkillLevel = op.skillLevel < 4 ? 4 : 7;
  const skillPrvImgUrl = `https://res.cloudinary.com/samidare/image/upload/f_auto,h_192,w_192/v1/arknights/skill-levels/${previousSkillLevel}`;
  const skillNxtImgUrl = `https://res.cloudinary.com/samidare/image/upload/f_auto,h_192,w_192/v1/arknights/skill-levels/${nextSkillLevel}`;

  const skillLevelSection = (
    <Grid item xs={12} sm={4}>
      <Grid container>
        <DataLabel label={"Skill Level"} part={false} />
        <DataLabel label={"Skill Level"} part={true} />
        <Grid item xs={7} sm={12} className={clsx({ [classes.skillLevelInputContainer]: true, [style.block]: true })}>
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
              root: clsx({ [classes.skillLevelNext]: true, [classes.svg]: true }),
              disabled: classes.disabled
            }}
            onClick={() => (onChange(op.id, "skillLevel", nextSkillLevel))}
            disabled={!op.owned || op.rarity < 3 || op.skillLevel >= (op.promotion === 0 ? 4 : 7)}
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
              root: clsx({ [classes.skillLevelPrevious]: true, [classes.svg]: true }),
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
              root: clsx({ [classes.skillLevelRaise]: true, [classes.svg]: true }),
              disabled: classes.disabled
            }}
            onClick={() => (onChange(op.id, "skillLevel", op.skillLevel + 1))}
            disabled={!op.owned || op.rarity < 3 || op.skillLevel >= (op.promotion === 0 ? 4 : 7)}
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
              root: clsx({ [classes.skillLevelDecrease]: true, [classes.svg]: true }),
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
        </Grid>
      </Grid>
    </Grid>);

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
    <Grid item xs={12} sm={7}>
      <Grid container>
        <DataLabel label={"Masteries"} part={false} />
        <DataLabel label={"Masteries"} part={true} />
        <Grid item xs={7} sm={12}>
          {[...Array(3)].map((x, i) => {
            const disabled = !op.owned || !hasSkill(i) || disableByProperty(op, `skill${i + 1}Mastery`);
            return (
              <div
                key={"skill" + (i + 1) + "MasteryBlock"}
                className={classes.skillMastery}
              >
                {opInfo === undefined
                  ? <div className={classes.skillName}>
                    {`Skill ${i + 1}`}
                  </div>
                  : hasSkill(i)
                    ? <div className={classes.skillName}>
                      {opInfo.skills[i].skillName}
                    </div>
                    : <div className={classes.skillName}>
                      No Skill
                    </div>
                }
                <Hidden xsDown>
                  {hasSkill(i) && opInfo !== undefined
                    ? <img
                      className={clsx({
                        [classes.skillIcon]: true,
                        [classes.unselected]: !op.owned || op.promotion < i,
                      })}
                      src={`https://res.cloudinary.com/samidare/image/upload/f_auto,h_240,w_240/v1/arknights/skills/${opInfo.skills[i].iconId ?? opInfo.skills[i].skillId}`}
                      alt={`Skill ${i}`}
                    />
                    : <svg
                      className={classes.skillIcon}
                    >
                      <rect x="0" y="0" className={classes.skillIcon} fill="transparent" stroke="gray" strokeWidth="4" />
                      <path d="M 12 36 L 36 12" fill="transparent" stroke="gray" strokeWidth="3" />
                      alt={`Skill ${i}`}
                    </svg>}
                </Hidden>
                {[...Array(4)].map((_, j) =>
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
                      className={clsx({
                        [classes.skillMasteryIcon]: true,
                        [classes.unselected]: getSkillMastery(i + 1) === j,
                      })}
                      src={`https://res.cloudinary.com/samidare/image/upload/f_auto,h_144,w_144/v1/arknights/mastery/${j}`}
                      alt={`Mastery ${i + 1}`}
                    />
                  </FormButton>
                )}
              </div>
            );
          })}
        </Grid>
      </Grid>
    </Grid>);

  return (
    <Grid container>
      {/* Skill Level */}
      {skillLevelSection}
      <Hidden xsDown>
        <Grid item sm={1} className={style.dividerContainer}>
          <hr className={style.verticalDivider} />
        </Grid>
      </Hidden>
      <Hidden smUp>
        <Grid item xs={12}>
          <hr className={style.horizontalDivider} />
        </Grid>
      </Hidden>
      {/* Mastery */}
      {skillMasterySection}
    </Grid>
  );
});
export default DataEntrySkillLevel;
