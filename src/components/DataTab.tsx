import React, { useState } from "react";
import { Operator } from "../App";
import { makeStyles } from "@material-ui/core";
import { useDataStyles } from "./dataTab/DataTabSharedStyles";
import DataTabOperatorSelector from "./dataTab/DataTabOperatorSelector";
import SelectorClass from "./dataTab/SelectorClass";
import EditOperator from "./dataTab/EditOperator";
import SelectorPreset from "./dataTab/SelectorPreset";
import FormButton from "./FormButton";
import EditPreset from "./dataTab/EditPreset";
import { MdCancel, MdCheckCircle } from "react-icons/md";
import Drawer from "./Drawer";
import SelectorRarity from "./dataTab/SelectorRarity";
import SelectorMeta from "./dataTab/SelectorMeta";
import useLocalStorage from "../UseLocalStorage";

const useStyles = makeStyles({
  container: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    fontSize: "16px",
    padding: "calc(2.5% + 4px)",
    paddingTop: "calc(1.5% + 4px)",
  },
  containerChild: {
    width: "100%",
    maxWidth: "1200px",
    display: "grid",
    gridTemplateRows: "auto auto 1fr",
  },
  drawerBox: {
    width: "100%",
    maxWidth: "800px",
    display: "flex",
    flexDirection: "column",
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
  hideRoundedCorner: {
    borderRadius: "0px",
  },
  svg: {
    marginRight: "4px",
  },
  h1: {
    display: "block",
    fontSize: "16px",
    margin: "0px",
    fontWeight: "normal",
  },
  description: {
    fontSize: "14px",
  }
});

interface Props {
  operators: Record<string, Operator>;
  changeOperators: (
    operatorID: string,
    property: string,
    value: number | boolean,
    index?: number
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
  "Sniper",
  "Defender",
  "Medic",
  "Supporter",
  "Caster",
  "Specialist",
  "Vanguard",
]

export enum SELECT_STATE {
  Grid,
  OpEdit,
  PsEdit,
  Batch
}

export const COLOR_BY_RARITY = ["#000000", "#9f9f9f", "#dce537", "#00b2f6", "#dbb1db", "#fbae02", "#f96601"]


const DataTab = React.memo((props: Props) => {
  const classes = useStyles();
  const style = useDataStyles();
  const { operators, changeOperators, presets, changePresets, applyBatch } = props;

  const [selectedOperator, setSelectedOperator] = React.useState("")
  const [selectedPreset, setSelectedPreset] = useState("")
  const [selectState, setSelectState] = React.useState(SELECT_STATE.Grid);
  const [selectBatchOps, setSelectBatchOps] = useState<string[]>([])

  // FILTER
  const [selectedClasses, setSelectedClasses] = useState<string[]>([]);
  const [selectedRarities, setSelectedRarities] = useState<number[]>([]);
  const [showOwned, setShowOwned] = useState<boolean | undefined>(undefined);
  const [sortFavorites, setSortFavorites] = useLocalStorage<boolean>("sortFav", false);
  const [showCN, setShowCN] = useLocalStorage<boolean>("showCN", false);

  // Class Selector Component
  const classSelector = (
    <SelectorClass
      onClick={((cl: string) => {
        const index = selectedClasses.indexOf(cl);
        if (index > -1) {
          selectedClasses.splice(index, 1)
          setSelectedClasses(selectedClasses => [...selectedClasses]);
        }
        else {
          setSelectedClasses(selectedClasses => [...selectedClasses, cl]);
        }
      })}
      activeClasses={selectedClasses}
    />
  );

  const raritySelector = (
    <SelectorRarity
      onClick={((rar: number) => {
        const index = selectedRarities.indexOf(rar);
        if (index > -1) {
          selectedRarities.splice(index, 1)
          setSelectedRarities(selectedRarities => [...selectedRarities]);
        }
        else {
          setSelectedRarities(selectedRarities => [...selectedRarities, rar]);
        }
      })}
      activeRarities={selectedRarities}
    />
  )

  const metaSelector = (
    <SelectorMeta
      activeOwned={showOwned}
      setActiveOwned={setShowOwned}
      showCNOps={showCN}
      setShowCNOps={setShowCN}
      sortFav={sortFavorites}
      setSortFav={setSortFavorites}
      clearFilter={() => {
        setSelectedClasses([]);
        setSelectedRarities([]);
        setShowOwned(undefined);
        setSortFavorites(false);
        setShowCN(false);
      }}
    />
  )

  const presetSelector = (
    <SelectorPreset
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

  const filterObject = (op: any) => {
    return (showOwned === undefined || operators[op.id].owned === showOwned)
      && (showCN || !op.isCnOnly)
      && (selectedClasses.length === 0 || selectedClasses.includes(op.class))
      && (selectedRarities.length === 0 || selectedRarities.includes(op.rarity))
  }

  const favSortObject = sortFavorites ? (a: any, b: any) => +operators[b.id].favorite - +operators[a.id].favorite : undefined;
  const editSelectionGrid =
    <DataTabOperatorSelector
      operators={operators}
      onClick={(op: Operator) => {
        setSelectedOperator(op.id);
        setSelectState(SELECT_STATE.OpEdit)
      }}
      filter={filterObject}
      postSort={favSortObject}
    />

  const batchSelectionGrid =
    <div>
      <div className={classes.label}>
        Batch Mode:
        <div className={classes.buttonPair}>
          <FormButton
            className={classes.hideRoundedCorner}
            onClick={() => {
              setSelectState(SELECT_STATE.Grid)
              setSelectBatchOps([]);
            }}
          >
            <MdCancel className={classes.svg} size={14} />
            Cancel
          </FormButton>
          <FormButton
            className={classes.hideRoundedCorner}
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
        filter={filterObject}
        postSort={favSortObject}
      />
    </div >

  const opEditForm =
    selectState === SELECT_STATE.Grid || selectState === SELECT_STATE.Batch
      ? selectState === SELECT_STATE.Grid
        ? editSelectionGrid
        : batchSelectionGrid
      : selectState === SELECT_STATE.OpEdit
        ? <EditOperator op={operators[selectedOperator]} onChange={changeOperators} setSelectState={setSelectState} />
        : <EditPreset op={presets[selectedPreset]} onChange={changePresets} setSelectState={setSelectState} />



  return (
    <div className={classes.container}>
      <div className={classes.containerChild}>
        <div className={classes.drawerBox}>
          <Drawer
            label={"Filter"}
          >
            <div>
              {classSelector}
              {raritySelector}
              {metaSelector}
            </div>
          </Drawer>
          <Drawer
            label={"Batch"}
          >
            {presetSelector}
          </Drawer>
        </div>
        <div className={style.horizontalDivider} />
        {opEditForm}
      </div>
    </div>
  );
});
export default DataTab;
