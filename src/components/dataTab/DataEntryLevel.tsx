import React from "react";
import { Operator } from "../../App";
import operatorJson from "../../data/operators.json";
import { MAX_LEVEL_BY_RARITY } from "../RosterTable";
import { ButtonBase, Grid, Hidden, makeStyles, TextField } from "@material-ui/core";
import clsx from "clsx";
import FormButton from "../FormButton";
import { useDataStyles } from "./DataTabSharedStyles";
import DataLabel from "./DataLabel";

const useStyles = makeStyles({
  /* PROMOTION */
  promotionButton: {
    width: "calc(100% - 2px)",
    height: "40px",
  },
  unselected: {
    opacity: "0.5",
  },
  promotionIcon: {
    width: "32px",
    height: "32px",
  },
  moduleContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    fontSize: "12px",
  },
  moduleButton: {
    width: "52px",
    height: "52px",
    margin: "2px",
  },
  moduleIcon: {
    width: "48px",
    height: "48px",
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
  },
  level: {
    gridArea: "2 / 2",
    justifySelf: "center",
    alignSelf: "center",
    justifyContent: "center",
    margin: "9px 6px 3px 6px",
    width: "60px",
    height: "60px",
    display: "grid",
  },
  levelText: {
    width: "56px",
    gridArea: "1 / 1",
  },
  levelTextInput: {
    paddingTop: "12px",
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
    borderRadius: "0px",
    marginLeft: "6px",
    marginRight: "6px",
  },
  levelMin: {
    gridArea: "0 / 0",
    width: "40px",
    height: "22px",
    fontSize: "12px",
    justifySelf: "end",
    alignSelf: "end",
    display: "grid",
    borderRadius: "0px",
    marginRight: "-6px",
    marginBottom: "-6px",
  },
  levelMax: {
    gridArea: "2 / 0",
    width: "40px",
    height: "22px",
    fontSize: "12px",
    justifySelf: "start",
    alignSelf: "end",
    display: "grid",
    borderRadius: "0px",
    marginLeft: "-6px",
    marginBottom: "-6px",
  },
  levelRaise: {
    gridArea: "1 / 2",
    width: "40px",
    justifySelf: "center",
    alignSelf: "end",
    display: "grid",
    gridTemplateAreas: `"stack"`,
  },
  levelDecrease: {
    gridArea: "3 / 2",
    width: "40px",
    justifySelf: "center",
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
  svg: {
    "&:focus": {
      boxShadow: "0px 0px 0px 1px #fcf3dc inset",
      background: "#505050"
    }
  },
});

interface Props {
  op: Operator;
  onChange: (
    operatorId: string,
    property: string,
    value: number | boolean,
    index?: number
  ) => void;
}

const DataEntryLevel = React.memo((props: Props) => {
  const { op, onChange } = props;
  const classes = useStyles();
  const style = useDataStyles();
  const opInfo = (operatorJson as any)[op.id];

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

  const promotionSection = (
    <Grid item xs={12} sm={4}>
      <Grid container>
        <DataLabel label={"Promotion"} part={false} />
        <DataLabel label={"Promotion"} part={true} />
        {/* Promotion */}
        <Grid item xs={7} sm={12} className={style.block}>
          <Grid container>
            {[...Array(3)].map((_, i) => {
              const disabled = !op.owned || !hasPromotionLevel(i);
              return (
                <Grid item xs={4} key={"promotion" + i}>
                  <FormButton
                    className={classes.promotionButton}
                    onClick={() => onChange(op.id, "promotion", i)}
                    toggled={op.promotion === i}
                    disabled={disabled}
                  >
                    <img
                      className={clsx({
                        [classes.promotionIcon]: true,
                        [classes.unselected]: op.promotion !== i,
                      })}
                      src={`/img/elite/${i}.png`}
                      alt={`Elite ${i} Button`}
                    />
                  </FormButton>
                </Grid>
              )
            }
            )}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );

  const levelSection = (
    <Grid item xs={12} sm={7}>
      <Grid container>
        <DataLabel label={"Level"} part={false} />
        <DataLabel label={"Level"} part={true} />
        <Grid item xs={7} sm={12}>
          <div className={clsx({ [classes.levelInputContainer]: true, [style.block]: true })}>
            <Hidden smUp>
              <FormButton
                className={classes.levelMin}
                onClick={() => updateLevel(1)}
                disabled={!op.owned || op.level === 1}
              >
                Min
              </FormButton>
            </Hidden>
            <div className={classes.levelPrevious}>
              <Hidden xsDown>
                <FormButton
                  className={classes.levelMinMax}
                  onClick={() => updateLevel(1)}
                  disabled={!op.owned || op.level === 1}
                >
                  Min
                </FormButton>
              </Hidden>
              <ButtonBase
                classes={{
                  root: clsx({ [classes.levelButtonHalfVert]: true, [classes.svg]: true }),
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
            </div>
            <ButtonBase
              classes={{
                root: clsx({ [classes.levelDecrease]: true, [classes.svg]: true }),
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
            <div className={classes.level}>
              <TextField
                variant="outlined"
                size="small"
                margin="none"
                className={classes.levelText}
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
            <ButtonBase
              classes={{
                root: clsx({ [classes.levelRaise]: true, [classes.svg]: true }),
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
            <div className={classes.levelNext}>
              <ButtonBase
                classes={{
                  root: clsx({ [classes.levelButtonHalfVert]: true, [classes.svg]: true }),
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
              <Hidden xsDown>
                <FormButton
                  className={classes.levelMinMax}
                  onClick={() => updateLevel(MAX_LEVEL_BY_RARITY[op.rarity][op.promotion])}
                  disabled={!op.owned || op.level === MAX_LEVEL_BY_RARITY[op.rarity][op.promotion]}
                >
                  Max
                </FormButton>
              </Hidden>
            </div>
            <Hidden smUp>
              <FormButton
                className={classes.levelMax}
                onClick={() => updateLevel(MAX_LEVEL_BY_RARITY[op.rarity][op.promotion])}
                disabled={!op.owned || op.level === MAX_LEVEL_BY_RARITY[op.rarity][op.promotion]}
              >
                Max
              </FormButton>
            </Hidden>
          </div>
        </Grid>
      </Grid>
    </Grid>);

  return (
    <Grid container>
      {/* Elite */}
      {promotionSection}
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
      {/* Level */}
      {levelSection}
    </Grid>
  );
});
export default DataEntryLevel;
