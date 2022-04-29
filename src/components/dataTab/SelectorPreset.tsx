import React from "react";
import { Operator } from "../../App";
import { Grid, Hidden, makeStyles } from "@material-ui/core";
import FormButton from "../FormButton";
import { MdFormatPaint, MdMode } from "react-icons/md";
import { SELECT_STATE } from "../DataTab";
import { useDataStyles } from "./DataTabSharedStyles";

const useStyles = makeStyles({
  presetContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  presetGrid: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  presetButtonContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "2px",
  },
  classSelectorButtonArea: {
    width: "72px",
    height: "36px",
    justifyContent: "center",
    alignContent: "center",
    margin: "2px",
  },
  button: {
    display: "flex",
    flexDirection: "column",
    fontSize: "12px",
  },
  svg: {
    marginRight: "4px"
  },
});

interface Props {
  presets: Record<string, Operator>;
  onClick: (psID: string) => void;
  activeID: string;
  selectState: SELECT_STATE;
  setSelectState: (mode: SELECT_STATE) => void;
  applyBatch: () => void;
}

const SelectorPreset = React.memo((props: Props) => {
  const { presets, onClick, activeID, selectState, setSelectState, applyBatch } = props;
  const classes = useStyles();
  const style = useDataStyles();

  return (
    <Grid container>
      <Grid container item xs={12} sm={8}>
        {Object.values(presets)
          .map((ps: Operator) => (
            <Grid item
              xs={4}
              sm={2}
              key={ps.id}
            >
              <FormButton
                className={style.filterButton}
                onClick={(() => onClick(ps.id))}
                toggled={activeID === ps.id}
              >
                {ps.name}
              </FormButton>
            </Grid>
          ))}
      </Grid>
      <Hidden xsDown>
        <Grid item sm={1} className={style.dividerContainer}>
          <hr className={style.verticalDividerS} />
        </Grid>
      </Hidden>
      <Hidden smUp>
        <Grid item xs={12}>
          <hr className={style.horizontalDivider} />
        </Grid>
      </Hidden>
      <Grid container item xs={12} sm={3}>
        <Grid item xs={6} sm={6}>
          <FormButton
            className={style.filterButton}
            onClick={() => setSelectState(selectState === SELECT_STATE.PsEdit ? SELECT_STATE.Grid : SELECT_STATE.PsEdit)}
            disabled={activeID === ""}
            toggled={selectState === SELECT_STATE.PsEdit}
          >
            <MdMode size={26} className={classes.svg} />
            Edit
          </FormButton>
        </Grid>
        <Grid item xs={6} sm={6}>
          <FormButton
            className={style.filterButton}
            onClick={() => selectState === SELECT_STATE.OpEdit ? applyBatch() : setSelectState(SELECT_STATE.Batch)}
            disabled={activeID === ""}
            toggled={selectState === SELECT_STATE.Batch}
          >
            <MdFormatPaint size={26} className={classes.svg} />
            {selectState === SELECT_STATE.OpEdit ? "Apply" : "Batch"}
          </FormButton>
        </Grid>
      </Grid>
    </Grid>
  );
});

export default SelectorPreset;
