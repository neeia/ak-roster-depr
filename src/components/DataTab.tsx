import React, { useState } from "react";
import { Operator } from "../App";
import useWindowSize, { Size } from "./UseWindowSize";
import { makeStyles } from "@material-ui/core";
import { useDataStyles } from "./dataTab/DataTabSharedStyles";
import DataTabOperatorSelector from "./dataTab/DataTabOperatorSelector";
import DataTabClassSelector from "./dataTab/DataTabClassSelector";
import DataEntryForm from "./dataTab/DataEntryForm";
import DataTabPresetSelector from "./dataTab/DataTabPresetSelector";
import FormButton from "./FormButton";
import PresetEntryForm from "./dataTab/PresetEntryForm";
import { MdCancel, MdCheckCircle } from "react-icons/md";
import Drawer from "./Drawer";

const useStyles = makeStyles({
  container: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    fontSize: "16px"
  },
  containerChild: {
    width: "100%",
    maxWidth: "1200px",
    display: "grid",
    gridTemplateRows: "auto auto 1fr",
  },
  label: {
    fontSize: "16px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  buttonPair: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "4px",
  },
  svg: {
    marginRight: "4px",
  },
  h1: {
    display: "inline",
    fontSize: "1em",
    margin: "0px",
    fontWeight: "normal",
  }
});

interface Props {
  operators: Record<string, Operator>;
  changeOperators: (
    operatorID: string,
    property: string,
    value: number | boolean
  ) => void;
  presets: Record<string, Operator>;
  changePresets: (
    presetID: string,
    property: string,
    value: number | boolean
  ) => void;
  applyBatch: (source: Operator, target: string[]) => void;
}

export const classList = [
  "Guard",
  "Vanguard",
  "Caster",
  "Sniper",
  "Defender",
  "Medic",
  "Supporter",
  "Specialist",
]

export const COLOR_BY_RARITY = ["#000000", "#9f9f9f", "#dce537", "#00b2f6", "#dbb1db", "#fbae02", "#f96601"]


const DataTab = React.memo((props: Props) => {
  const classes = useStyles();
  const style = useDataStyles();
  const { operators, changeOperators, presets, changePresets, applyBatch } = props;
  const size: Size = useWindowSize();

  const [selectedOperator, setSelectedOperator] = React.useState("")
  const [selectedPreset, setSelectedPreset] = useState("")
  const [selectState, setSelectState] = React.useState(SELECT_STATE.Grid);
  const [selectedClass, setSelectedClass] = useState("");
  const [selectBatchOps, setSelectBatchOps] = useState<string[]>([])

  // Class Selector Component
  const classSelector = (
    <DataTabClassSelector
      classList={classList}
      onClick={((cl: string) => {
        if (selectedClass === cl) {
          setSelectedClass("");
        } else {
          setSelectedClass(cl);
        }
      })}
      activeClass={selectedClass}
    />
  );

  const presetSelector = (
    <DataTabPresetSelector
      presets={presets}
      onClick={((psID: string) => {
        if (selectedPreset === psID) {
          setSelectedPreset("");
          if (selectState === SELECT_STATE.PsEdit) {
            setSelectedOperator("");
            setSelectState(SELECT_STATE.Grid);
          }
        } else {
          setSelectedPreset(psID);
        }
      })}
      activeID={selectedPreset}
      selectState={selectState}
      setSelectState={setSelectState}
      applyBatch={() => {
        applyBatch(presets[selectedPreset], [selectedOperator])
      }}
    />
  );


  const editSelectionGrid =
    <DataTabOperatorSelector
      operators={operators}
      onClick={(op: Operator) => {
        setSelectedOperator(op.id);
        setSelectState(SELECT_STATE.OpEdit)
      }}
      filter={(op: any) => selectedClass === "" || op.class === selectedClass}
    />

  const batchSelectionGrid =
    <div>
      <div className={style.label}>
        Batch Mode:
        <div className={classes.buttonPair}>
          <FormButton
            onClick={() => {
              selectedPreset === "" ? setSelectState(SELECT_STATE.Grid) : setSelectState(SELECT_STATE.PsEdit);
              setSelectBatchOps([]);
            }}
          >
            <MdCancel className={classes.svg} size={14} />
            Cancel
          </FormButton>
          <FormButton
            onClick={() => {
              setSelectState(SELECT_STATE.Grid)
              applyBatch(presets[selectedPreset], selectBatchOps);
              setSelectBatchOps([])
            }}
            disabled={selectedPreset === ""}
          >
            <MdCheckCircle className={classes.svg} size={14} />
            Apply
          </FormButton>
        </div>
        <div className={style.horizontalDivider} />
      </div>
      <DataTabOperatorSelector
        operators={operators}
        toggleGroup={selectBatchOps}
        onClick={((op: Operator) => {
          const index = selectBatchOps.indexOf(op.id);
          if (index > -1) {
            selectBatchOps.splice(index, 1)
            setSelectBatchOps(selectBatchOps => [...selectBatchOps]);
          }
          else {
            setSelectBatchOps(selectBatchOps => [...selectBatchOps, op.id]);
          }
        }
        )}
        filter={(op: any) => selectedClass === "" || op.class === selectedClass}
      />
    </div >

  const opEditForm =
    selectState === SELECT_STATE.Grid || selectState === SELECT_STATE.Batch
      ? selectState === SELECT_STATE.Grid
        ? editSelectionGrid
        : batchSelectionGrid
      : selectState === SELECT_STATE.OpEdit
        ? <DataEntryForm op={operators[selectedOperator]} onChange={changeOperators} setSelectState={setSelectState} />
        : <PresetEntryForm op={presets[selectedPreset]} onChange={changePresets} />



  return (
    <div className={classes.container}>
      <div className={classes.containerChild}>
        <Drawer
          label={"Info"}
        >
          <span>
            <h1 className={classes.h1}>
              Arknights Roster (Krooster) is an operator collection tracker.
            </h1>
            <div>
              Select an operator to get started, or create some presets to make batch changes.
            </div>
          </span>
        </Drawer>
        <Drawer
          label={"Filter"}
        >
          {classSelector}
        </Drawer>
        {/* Rarity, Fav, Owned, CLEAR FILTER BUTTON */}
        <Drawer
          label={"Presets"}
        >
          {presetSelector}
        </Drawer>
        <div className={style.horizontalDivider} />
        {opEditForm}
      </div>
    </div>
  );
});
export default DataTab;

export enum SELECT_STATE {
  Grid,
  OpEdit,
  PsEdit,
  Batch
}