import { makeStyles } from "@material-ui/core";
import FormButton from "./FormButton";
import React from "react";
import { useState } from "react";
import { Operator, MOBILE_BREAKPOINT, TABLET_BREAKPOINT } from "../App";
import DataEntryForm from "./DataEntryForm";
import useWindowSize, { Size } from "./UseWindowSize";
import clsx from "clsx";
import DataTabOperatorSelector from "./DataTabOperatorSelector";
import DataTabClassSelector from "./DataTabClassSelector";

const useStyles = makeStyles({
  container: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
  containerMobile: {
    display: "flex",
    alignItems: "left",
    flexDirection: "column",
  },
  containerChild: {
    width: "720px",
    display: "grid",
    gridTemplateRows: "auto 1fr",
  },
  containerChildMobile: {
    flex: 1,
    display: "grid",
    gridTemplateColumns: "auto 1fr",
    justifyContent: "center",
  },
  classDisplay: {
    display: "flex",
    justifyContent: "center",
  },
  classDisplayTablet: {
    display: "flex",
    justifyContent: "center",
  },
  classDisplayMobile: {
    display: "grid",
    gridTemplateColumns: "auto",
    gridTemplateRows: "repeat(8, 1fr)",
    height: "1vh",
    marginRight: "12px",
  },
  classSelectorButtonArea: {
    width: "72px",
    height: "60px",
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    margin: "2px",
  },
  classButton: {
    display: "flex",
    flexDirection: "column",
  },
  classIcon: {
    width: "32px",
    height: "32px",
    marginBottom: "4px",
  },
  marginBottom: {
    marginBottom: "16px",
  },
  opIcon: {
    width: "64px",
    height: "64px",
    marginBottom: "2px",
  },
  smallText: {
    fontSize: "12px",
  },
  opButton: {
    display: "flex",
    flexDirection: "column",
    boxShadow: "2px 2px 8px rgb(0 0 0 / 30%)",
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

  const noneStr = "none";
  const [selectedClass, setSelectedClass] = useState(noneStr);
  const [selectedOp, setSelectedOp] = useState(noneStr);

  const size: Size = useWindowSize();
  const width = size.width === undefined ? 1920 : size.width;

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

  const classDisplay = clsx({
    [classes.classDisplay]: width > TABLET_BREAKPOINT,
    [classes.classDisplayTablet]: width <= TABLET_BREAKPOINT,
    [classes.classDisplayMobile]: width <= MOBILE_BREAKPOINT,
    [classes.marginBottom]: "true"
  })

  return (
    <div className={classes.container}>
      <div className={classes.containerChild}>
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
