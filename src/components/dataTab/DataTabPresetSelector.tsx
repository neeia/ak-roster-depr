import React from "react";
import { Operator } from "../../App";
import { makeStyles } from "@material-ui/core";
import FormButton from "../FormButton";
import { MdFormatPaint, MdMode } from "react-icons/md";

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
  batchMode: boolean;
  setBatchMode: (mode: boolean) => void;
}

const DataTabPresetSelector = React.memo((props: Props) => {
  const classes = useStyles();
  const { presets, onClick, activeID, batchMode, setBatchMode } = props;

  return (
    <div className={classes.presetContainer}>
      <div className={classes.presetGrid}>
        {Object.values(presets)
          .map((ps: Operator) => (
            <div className={classes.classSelectorButtonArea}>
              <FormButton
                key={ps.id}
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
          onClick={() => setBatchMode(false)}
          disabled={activeID === "none"}
          toggled={activeID !== "none" && !batchMode}
        >
          <MdMode size={26} className={classes.svg} />
          Edit
        </FormButton>
        <FormButton
          onClick={() => setBatchMode(true)}
          disabled={activeID === "none"}
          toggled={activeID !== "none" && batchMode}
        >
          <MdFormatPaint size={26} className={classes.svg}  />
          Batch
        </FormButton>
      </div>
    </div>
  );
});

export default DataTabPresetSelector;
