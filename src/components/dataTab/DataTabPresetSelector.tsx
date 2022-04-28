import React from "react";
import { Operator } from "../../App";
import { makeStyles } from "@material-ui/core";
import FormButton from "../FormButton";
import { MdFormatPaint, MdMode } from "react-icons/md";
import { SELECT_STATE } from "../DataTab";

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
  verticalDivider: {
    backgroundColor: "#909090",
    width: "2px",
    height: "32px",
    alignSelf: "center",
    marginLeft: "4px",
    marginRight: "8px",
  },
  classSelectorButtonArea: {
    width: "72px",
    height: "36px",
    display: "flex",
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
  button2: {
    width: "76px",
  }
});

interface Props {
  presets: Record<string, Operator>;
  onClick: (psID: string) => void;
  activeID: string;
  selectState: SELECT_STATE;
  setSelectState: (mode: SELECT_STATE) => void;
  applyBatch: () => void;
}

const DataTabPresetSelector = React.memo((props: Props) => {
  const classes = useStyles();
  const { presets, onClick, activeID, selectState, setSelectState, applyBatch } = props;

  return (
    <div className={classes.presetContainer}>
      <div className={classes.presetGrid}>
        {Object.values(presets)
          .map((ps: Operator) => (
            <div
              className={classes.classSelectorButtonArea}
              key={ps.id}
            >
              <FormButton
                className={classes.button}
                onClick={(() => onClick(ps.id))}
                toggled={activeID === ps.id}
              >
                {ps.name}
              </FormButton>
            </div>
          ))}
      </div>
      <div className={classes.verticalDivider} />
      <div className={classes.presetButtonContainer}>
        <FormButton
          className={classes.button2}
          onClick={() => setSelectState(selectState === SELECT_STATE.PsEdit ? SELECT_STATE.Grid : SELECT_STATE.PsEdit)}
          disabled={activeID === ""}
          toggled={selectState === SELECT_STATE.PsEdit}
        >
          <MdMode size={26} className={classes.svg} />
          Edit
        </FormButton>
        <FormButton
          className={classes.button2}
          onClick={() => selectState === SELECT_STATE.OpEdit ? applyBatch() : setSelectState(SELECT_STATE.Batch)}
          disabled={activeID === "" || selectState === SELECT_STATE.Batch}
          toggled={selectState === SELECT_STATE.Batch}
        >
          <MdFormatPaint size={26} className={classes.svg}  />
          {selectState === SELECT_STATE.OpEdit ? "Apply" : "Batch"}
        </FormButton>
      </div>
    </div>
  );
});

export default DataTabPresetSelector;
