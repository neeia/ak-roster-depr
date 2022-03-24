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
        display: "flex",
        flexDirection: "column",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
    },
    skillLevelLabel: {
        fontSize: "16px",
        marginBottom: "4px",
        lineHeight: "18px",
        width: "96px",
        borderBottom: "2px solid #808080",
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
        display: "grid",
        gridTemplateAreas: `"stack"`,
    },
    skillMasteryIcon: {
        gridArea: "stack",
        width: "32px",
        height: "32px",
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
            <div className={classes.skillLevelLabel}>
                Skill Level
            </div>
            <div className={classes.skillLevelInputContainer}>
                <div className={classes.skillLevel}>
                    <img
                        className={classes.skillLevelStack}
                        src={skillBGImgUrl}
                    />
                    {op.skillLevel > 0
                        ? <img
                            className={classes.skillLevelStack}
                            src={skillLvlImgUrl}
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
                    disabled={!op.owned || op.skillLevel >= 7}
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
                    disabled={!op.owned || op.skillLevel <= 1}
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
                    disabled={!op.owned || op.skillLevel >= 7}
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
                    disabled={!op.owned || op.skillLevel <= 1}
                >
                    <svg
                        className={classes.skillButtonHalf}
                    >
                        <rect x="0" y="0" className={classes.skillButtonHalf} fill="transparent" stroke="#808080" strokeWidth="1" />
                        <path d="M 8 5 L 20 13 L 32 5" fill="transparent" stroke="white" strokeLinecap="round" strokeWidth="3" />
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
            {[...Array(3)].map((x, i) => {
                const disabled = !op.owned || !hasSkill(i) || disableByProperty(op, `skill${i + 1}Mastery`);
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
                                disabled={disabled}
                            >
                                <img
                                    className={classes.skillMasteryIcon}
                                    src={skillBGImgUrl}
                                />
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
