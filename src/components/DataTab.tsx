import React, { useState } from "react";
import { Operator, TABLET_BREAKPOINT, MOBILE_BREAKPOINT, UIMode, getUIMode } from "../App";
import useWindowSize, { Size } from "./UseWindowSize";
import { makeStyles } from "@material-ui/core";
import clsx from "clsx";
import DataTabOperatorSelector from "./dataTab/DataTabOperatorSelector";
import DataTabClassSelector from "./dataTab/DataTabClassSelector";
import DataEntryForm from "./dataTab/DataEntryForm";

const useStyles = makeStyles({
  container: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
  containerMobile: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
  containerChild: {
    width: "800px",
    display: "grid",
    gridTemplateRows: "auto 1fr",
  },
  containerChildMobile: {
    flex: 1,
    display: "grid",
    gridTemplateRows: "auto 1fr",
    justifyContent: "center",
  },
});

interface Props {
  operators: Record<string, Operator>;
  onChange: (
    operatorID: string,
    property: string,
    value: number | boolean
  ) => void;
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
  const { operators, onChange } = props;
  const size: Size = useWindowSize();
  const width = size.width === undefined ? 1920 : size.width;
  let uiMode = getUIMode(width);

  const noneStr = "none";
  const [selectedClass, setSelectedClass] = useState(noneStr);
  const [selectedOp, setSelectedOp] = useState(noneStr);


  // Class Selector Component
  const classSelector = (
    <DataTabClassSelector
      classList={classList}
      onClick={((cl: string) => {
        if (selectedClass === cl && selectedOp === noneStr) {
          setSelectedClass(noneStr);
        } else {
          setSelectedClass(cl);
        }
        setSelectedOp(noneStr);
      })}
      activeClass={selectedClass}
    />
    );

  return (
    <div className={clsx({
      [classes.container]: uiMode === UIMode.DESKTOP || uiMode === UIMode.TABLET,
      [classes.containerMobile]: uiMode === UIMode.MOBILE,
    })}>
      <div className={clsx({
        [classes.containerChild]: uiMode === UIMode.DESKTOP || uiMode === UIMode.TABLET,
        [classes.containerChildMobile]: uiMode === UIMode.MOBILE,
      })}>
        {classSelector}
        {selectedOp === noneStr
          ? (selectedClass === noneStr
            ? ""
            : <DataTabOperatorSelector
              operators={operators}
              onClick={((op: Operator) =>
                (selectedOp === op.id ? setSelectedOp(noneStr) : setSelectedOp(op.id))
              )}
              filter={(op: any) => {
                return op.class === selectedClass;
              }}
              />)
          : <DataEntryForm op={operators[selectedOp]} onChange={onChange} />
        }
      </div>
    </div>
  );
});
export default DataTab;
