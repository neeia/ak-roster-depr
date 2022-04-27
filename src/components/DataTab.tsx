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
  singleBatchContainer: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "16px",
  },
  horizontalDivider: {
    backgroundColor: "#909090",
    height: "2px",
    width: "360px",
    marginTop: "6px",
    marginBottom: "12px",
  },
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
  const { operators, changeOperators, presets, changePresets } = props;
  const size: Size = useWindowSize();
  const width = size.width === undefined ? 1920 : size.width;
  let uiMode = getUIMode(width);

  const noneStr = "";
  const [selectedOperator, setSelectedOperator] = React.useState("")
  const [selectState, setSelectState] = React.useState(SELECT_STATE.Grid);
  const [selectedClass, setSelectedClass] = useState(noneStr);
  const [selectBatchOps, setSelectBatchOps] = useState<string[]>([])

  // Class Selector Component
  const classSelector = (
    <DataTabClassSelector
      classList={classList}
      onClick={((cl: string) => {
        if (selectedClass === cl) {
          setSelectedClass(noneStr);
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
        if (selectedOperator === psID) {
          setSelectedOperator(noneStr);
          setSelectState(SELECT_STATE.Grid)
        } else {
          setSelectedOperator(psID);
          setSelectState(SELECT_STATE.PsEdit)
        }
      })}
      activeID={selectedOperator}
      batchMode={selectState === SELECT_STATE.Batch}
      setBatchMode={() => setSelectState(SELECT_STATE.Batch)}
    />
  );


  const editSelectionGrid =
    <DataTabOperatorSelector
      operators={operators}
      onClick={(op: Operator) => {
        setSelectedOperator(op.id);
        setSelectState(SELECT_STATE.OpEdit)
      }}
      filter={(op: any) => selectedClass === noneStr || op.class === selectedClass}
    />

  const batchSelectionGrid =
    <div>
      Select:
      <DataTabOperatorSelector
        operators={operators}
        onClick={((op: Operator) => {
          const index = selectBatchOps.indexOf(op.id);
          if (index > -1) {
            selectBatchOps.splice(index, 1);
          }
          else {
            selectBatchOps.push(op.id)
          }
        }
        )}
        filter={(op: any) => selectedClass === noneStr || op.class === selectedClass}
      />
    </div>

  const opEditForm =
    selectState === SELECT_STATE.Grid || selectState === SELECT_STATE.Batch
      ? selectState === SELECT_STATE.Grid
        ? editSelectionGrid
        : batchSelectionGrid
      : selectState === SELECT_STATE.OpEdit
        ? <DataEntryForm op={operators[selectedOperator]} onChange={changeOperators} />
        : <PresetEntryForm op={presets[selectedOperator]} onChange={changePresets} />



  return (
    <div className={clsx({
      [classes.container]: uiMode === UIMode.DESKTOP || uiMode === UIMode.TABLET,
      [classes.containerMobile]: uiMode === UIMode.MOBILE,
    })}>
      <div className={clsx({
        [classes.containerChild]: uiMode === UIMode.DESKTOP || uiMode === UIMode.TABLET,
        [classes.containerChildMobile]: uiMode === UIMode.MOBILE,
      })}>
        Filter:
        {classSelector}
        {/* Rarity, Fav, Owned, CLEAR FILTER BUTTON */}
        <div className={classes.horizontalDivider} />
        Presets:
        {presetSelector}
        <div className={classes.horizontalDivider} />
        {opEditForm}
      </div>
    </div>
  );
});
export default DataTab;

enum SELECT_STATE {
  Grid,
  OpEdit,
  PsEdit,
  Batch
}