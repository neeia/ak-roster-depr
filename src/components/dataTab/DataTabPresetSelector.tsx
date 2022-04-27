import React, { useState } from "react";
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
    display: "grid",
    gridTemplateColumns: "repeat(6, 1fr)",
    justifyContent: "center",
    flexGrow: 0
  },
  presetButtonContainer: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "2px",
  },
  verticalDivider: {
    backgroundColor: "#909090",
    width: "2px",
    height: "32px",
    alignSelf: "center",
    marginLeft: "8px",
    marginRight: "8px",
  },
  classSelectorButtonArea: {
    width: "80px",
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
  }
});

interface Props {
  presets: Record<string, Operator>;
  onClick: (psID: string) => void;
  activeID: string;
  selectState: SELECT_STATE;
  setSelectState: (mode: SELECT_STATE) => void;
}

const DataTabPresetSelector = React.memo((props: Props) => {
  const classes = useStyles();
  const { presets, onClick, activeID, selectState, setSelectState } = props;

  const [selectedPreset, setSelectedPreset] = useState("")

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
          onClick={() => setSelectState(SELECT_STATE.PsEdit)}
          disabled={selectState !== SELECT_STATE.PsEdit}
          toggled={selectState === SELECT_STATE.PsEdit}
        >
          <MdMode size={26} className={classes.svg} />
          Edit
        </FormButton>
        <FormButton
          onClick={() => setSelectState(SELECT_STATE.Batch)}
          disabled={selectState !== SELECT_STATE.PsEdit}
          toggled={selectState === SELECT_STATE.Batch}
        >
          <MdFormatPaint size={26} className={classes.svg}  />
          Batch
        </FormButton>
      </div>
    </div>
  );
});

export default DataTabPresetSelector;
