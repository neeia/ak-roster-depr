import React, { useState } from "react";
import { Operator, TABLET_BREAKPOINT, MOBILE_BREAKPOINT, UIMode, getUIMode } from "../App";
import useWindowSize, { Size } from "./UseWindowSize";
import { makeStyles } from "@material-ui/core";
import clsx from "clsx";
import DataTabOperatorSelector from "./dataTab/DataTabOperatorSelector";
import DataTabClassSelector from "./dataTab/DataTabClassSelector";
import DataEntryForm from "./dataTab/DataEntryForm";
import DataTabPresetSelector from "./dataTab/DataTabPresetSelector";
import FormButton from "./FormButton";
import PresetEntryForm from "./dataTab/PresetEntryForm";
import { MdCancel, MdCheckCircle } from "react-icons/md";

const useStyles = makeStyles({
  container: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    fontSize: "16px"
  },
  containerMobile: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
  containerChild: {
    width: "800px",
    display: "grid",
    gridTemplateRows: "auto auto 1fr",
  },
  containerChildMobile: {
    flex: 1,
    display: "grid",
    gridTemplateRows: "auto auto 1fr",
    justifyContent: "center",
  },
  horizontalDivider: {
    backgroundColor: "#909090",
    height: "2px",
    width: "480px",
    marginTop: "6px",
    marginBottom: "12px",
    justifySelf: "center",
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
  const { operators, changeOperators, presets, changePresets, applyBatch } = props;
  const size: Size = useWindowSize();
  const width = size.width === undefined ? 1920 : size.width;
  let uiMode = getUIMode(width);

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
      <div className={classes.label}>
        Batch Mode:
        <div className={classes.buttonPair}>
          <FormButton
            onClick={() => {
              setSelectState(SELECT_STATE.Grid)
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
        <div className={classes.horizontalDivider} />
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
    <div className={clsx({
      [classes.container]: uiMode === UIMode.DESKTOP || uiMode === UIMode.TABLET,
      [classes.containerMobile]: uiMode === UIMode.MOBILE,
    })}>
      <div className={clsx({
        [classes.containerChild]: uiMode === UIMode.DESKTOP || uiMode === UIMode.TABLET,
        [classes.containerChildMobile]: uiMode === UIMode.MOBILE,
      })}>
        <div className={classes.label}>
          Filter:
        </div>
        {classSelector}
        {/* Rarity, Fav, Owned, CLEAR FILTER BUTTON */}
        <div className={classes.horizontalDivider} />
        <div className={classes.label}>
          Presets:
        </div>
        {presetSelector}
        <div className={classes.horizontalDivider} />
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