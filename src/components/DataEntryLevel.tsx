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
  container: {
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
  /* PROMOTION */
  promotionContainer: {
    display: "grid",
    gridTemplateRows: "auto 1fr",
    width: "150px",
    justifyItems: "center",
  },
  promotionButtonContainer: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    justifyItems: "center",
  },
  promotionButton: {
    width:  "40px",
    height: "40px",
    margin: "2px",
    display: "grid",
    gridTemplateAreas: `"stack"`,
  },
  promotionIcon: {
    gridArea: "stack",
    width:  "32px",
    height: "32px",
  },
  /* DIVIDER */
  verticalDivider: {
    backgroundColor: "#909090",
    width: "2px",
    height: "120px",
    alignSelf: "start",
    marginLeft: "8px",
    marginRight: "8px",
    marginTop: "32px",
  },
  /* LEVEL */
  levelContainer: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    justifyContent: "start",
    alignItems: "center",
    width: "275px",
  },
  levelInputContainer: {
    display: "grid",
    gridTemplateRows: "1fr auto 1fr",
    gridTemplateColumns: "1fr auto 1fr",
    margin: "4px",
  },
  level: {
    gridArea: "2 / 2",
    justifySelf: "center",
    alignSelf: "center",
    margin: "9px 6px 3px 6px",
    width: "60px",
    height: "60px",
    display: "grid",
  },
  levelText: {
    width: "56px",
    gridArea: "1 / 1 / 1 / 1",
  },
  levelTextInput: {
    paddingTop:    "12px",
    paddingBottom: "12px",
    fontSize: "24px",
    textAlign: "center",
  },
  levelPrevious: {
    gridArea: "2 / 1",
    justifySelf: "right",
    alignSelf: "center",
    display: "grid",
    gridTemplateAreas: `"minmax stack"`,
    gridTemplateColumns: "auto auto",
  },
  levelNext: {
    gridArea: "2 / 3",
    justifySelf: "left",
    alignSelf: "center",
    display: "grid",
    gridTemplateAreas: `"stack minmax"`,
    gridTemplateColumns: "auto auto",
  },
  levelMinMax: {
    gridArea: "minmax",
    width: "40px",
    height: "40px",
    marginLeft: "6px",
    marginRight: "6px",
  },
  levelRaise: {
    gridArea: "1 / 2",
    alignSelf: "end",
    display: "grid",
    gridTemplateAreas: `"stack"`,
  },
  levelDecrease: {
    gridArea: "3 / 2",
    alignSelf: "start",
    display: "grid",
    gridTemplateAreas: `"stack"`,
  },
  levelButtonStack: {
    gridArea: "stack",
    width: "40px",
    height: "40px",
    display: "grid",
    gridTemplateAreas: `"stack"`,
  },
  levelButtonHalf: {
    gridArea: "stack",
    width: "40px",
    height: "20px",
    display: "grid",
    gridTemplateAreas: `"stack"`,
  },
  levelButtonHalfVert: {
    gridArea: "stack",
    width: "40px",
    height: "40px",
    display: "grid",
    gridTemplateAreas: `"stack"`,
  },
  levelButtonTextLeft: {
    gridArea: "stack",
    justifySelf: "start",
    alignSelf: "center",
    marginLeft: "4px",
    fontSize: "10px",
  },
  levelButtonTextRight: {
    gridArea: "stack",
    justifySelf: "end",
    alignSelf: "center",
    marginRight: "4px",
    fontSize: "10px",
  },
  disabled: {
    opacity: "0.3",
  },
});

interface Props {
  op: Operator;
  onChange: (
    operatorId: string,
    property: string,
    value: number | boolean
  ) => void;
}

const DataEntryLevel = React.memo((props: Props) => {
  const { op, onChange } = props;
  const classes = useStyles();

  const [levelField, setLevelField] = React.useState<number | string>(op.level);

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

  function hasPromotionLevel(elite: number) {
    if (elite === 0) return true;
    if (elite === 1) return op.rarity > 2;
    if (elite === 2) return op.rarity > 3;
  }

  const levelSection = (
    <div className={classes.levelContainer}>
      <div className={classes.label}>
        Level
      </div>
      <div className={classes.levelInputContainer}>
        <div className={classes.level}>
          <TextField
            variant="outlined"
            size="small"
            margin="none"
            className={classes.levelText}
            defaultValue={op.level}
            value={op.owned ? (levelField === "" ? levelField : op.level) : ""}
            onChange={(e) => updateLevel(e.target.value)}
            inputProps={{
              className: classes.levelTextInput,
              inputMode: 'numeric',
              pattern: '[0-9]*'
            }}
          />
          {op.level > 0
            ? ""
            : <svg
              className={classes.levelText}
            >
              <path d="M 22 28 H 34" fill="transparent" stroke="#808080" strokeLinecap="butt" strokeWidth="3" />
            </svg>}
        </div>
        <div className={classes.levelNext}>
          <ButtonBase
            classes={{
              root: classes.levelButtonHalfVert,
              disabled: classes.disabled
            }}
            onClick={() => updateLevel(op.level + 10)}
            disabled={!op.owned || op.level >= MAX_LEVEL_BY_RARITY[op.rarity][op.promotion]}
          >
            <div className={classes.levelButtonTextLeft} >
              10
            </div>
            <svg
              className={classes.levelButtonHalfVert}
            >
              <rect x="0" y="0" className={classes.levelButtonHalfVert} fill="transparent" stroke="#808080" strokeWidth="1" />
              <path d="M 18 8 L 25 20 L 18 32" fill="transparent" stroke="white" strokeLinecap="round" strokeWidth="3" />
              <path d="M 28 8 L 35 20 L 28 32" fill="transparent" stroke="white" strokeLinecap="round" strokeWidth="3" />
            </svg>
          </ButtonBase>
          <FormButton
            className={classes.levelMinMax}
            onClick={() => updateLevel(MAX_LEVEL_BY_RARITY[op.rarity][op.promotion])}
            disabled={!op.owned || op.level === MAX_LEVEL_BY_RARITY[op.rarity][op.promotion]}
          >
            Max
          </FormButton>
        </div>
        <div className={classes.levelPrevious}>
          <ButtonBase
            classes={{
              root: classes.levelButtonHalfVert,
              disabled: classes.disabled
            }}
            onClick={() => updateLevel(op.level - 10)}
            disabled={!op.owned || op.level <= 1}
          >
            <div className={classes.levelButtonTextRight} >
              10
            </div>
            <svg
              className={classes.levelButtonHalfVert}
            >
              <rect x="0" y="0" className={classes.levelButtonHalfVert} fill="transparent" stroke="#808080" strokeWidth="1" />
              <path d="M 12 8 L  5 20 L 12 32" fill="transparent" stroke="white" strokeLinecap="round" strokeWidth="3" />
              <path d="M 22 8 L 15 20 L 22 32" fill="transparent" stroke="white" strokeLinecap="round" strokeWidth="3" />
            </svg>
          </ButtonBase>
          <FormButton
            className={classes.levelMinMax}
            onClick={() => updateLevel(1)}
            disabled={!op.owned || op.level === 1}
          >
            Min
          </FormButton>
        </div>
        <ButtonBase
          classes={{
            root: classes.levelRaise,
            disabled: classes.disabled
          }}
          onClick={() => updateLevel(op.level + 1)}
          disabled={!op.owned || op.level >= MAX_LEVEL_BY_RARITY[op.rarity][op.promotion]}
        >
          <svg
            className={classes.levelButtonHalf}
          >
            <rect x="0" y="0" className={classes.levelButtonHalf} fill="transparent" stroke="#808080" strokeWidth="1" />
            <path d="M 8 15 L 20 7 L 32 15" fill="transparent" stroke="white" strokeLinecap="round" strokeWidth="3" />
          </svg>
        </ButtonBase>
        <ButtonBase
          classes={{
            root: classes.levelDecrease,
            disabled: classes.disabled
          }}
          onClick={() => updateLevel(op.level - 1)}
          disabled={!op.owned || op.level <= 1}
        >
          <svg
            className={classes.levelButtonHalf}
          >
            <rect x="0" y="0" className={classes.levelButtonHalf} fill="transparent" stroke="#808080" strokeWidth="1" />
            <path d="M 8 5 L 20 13 L 32 5" fill="transparent" stroke="white" strokeLinecap="round" strokeWidth="3" />
          </svg>
        </ButtonBase>
      </div>
    </div>);

  return (
    <div className={classes.container}>
      <div className={classes.promotionContainer}>
        <div className={classes.label}>
          Promotion
        </div>
        {/* Promotion */}
        <div className={classes.promotionButtonContainer}>
          {[...Array(3)].map((x, i) => {
            const disabled = !op.owned || !hasPromotionLevel(i);
            return (
              <FormButton
                className={classes.promotionButton}
                onClick={() => onChange(op.id, "promotion", i)}
                toggled={op.promotion === i}
                disabled={disabled}
              >
                <img
                  className={classes.promotionIcon}
                  src={`https://res.cloudinary.com/samidare/image/upload/v1/arknights/elite/${i}`}
                />
              </FormButton>
            )
          }
          )}
        </div>
      </div>
      <div className={classes.verticalDivider} />
      {/* Level */}
      {levelSection}
    </div>
  );
});
export default DataEntryLevel;
