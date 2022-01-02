import { makeStyles } from "@material-ui/core";
import FormButton from "./FormButton";
import React from "react";
import slugify from "slugify";
import { useState } from "react";
import { Operator } from "../App"; 
import operatorJson from "../data/operators.json";
import MobileOpEditForm from "./MobileOpEditForm";
import { useBoxStyles } from "./BoxStyles"
import useViewportWidth from "./UseWindowSize";
import clsx from "clsx";

const useStyles = makeStyles({
  container: {
    display: "inline-flex",
    gap: "12px",
  },
  column: {
    flex: 1
  },
  gridDisplay: {
    display: "grid",
    gridTemplateColumns: "repeat(8, minmax(100px, 1fr))",
    rowGap: "4px",
    gap: "2px",
  },
  marginBottom: {
    marginBottom: "16px",
  },
  mobileClassDisplay: {
    display: "grid",
    rowGap: "4px",
    gap: "2px",
    height: "1vh"
  },
  mobileOpDisplay: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(80px, 1fr))",
    rowGap: "4px",
    gap: "2px",
  },
  classIcon: {
    width: "48px",
    height: "48px",
  },
  opIcon: {
    width: "64px",
    height: "64px",
  },
  smallText: {
    fontSize: "12px",
  },
  flex: {
    display: "flex",
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

const classList = [
  "guard",
  "vanguard",
  "caster",
  "sniper",
  "defender",
  "medic",
  "supporter",
  "specialist",
]

function sortComparator(a: any, b: any) {
  return (
    b.rarity - a.rarity ||
    a.name.localeCompare(b.name)
  );
}

function capitalize(str: string) : string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const MobileOpSelectionScreen = React.memo((props: Props) => {
  const classes = useStyles();
  const { operators, onChange } = props;
  const boxStyle = useBoxStyles();

  const noneStr = "none";
  const [selectedClass, setSelectedClass] = useState(noneStr);
  const [selectedOp, setSelectedOp] = useState(noneStr);

  const width = useViewportWidth();

  const classSelector = classList
  .map((cl: string) => (
    <div className={classes.flex} id={cl}>
      <FormButton
        onClick={(()=>{
          if (selectedClass === cl) {
            setSelectedClass(noneStr);
          } else {
            setSelectedClass(cl);
          }
          setSelectedOp(noneStr);
        })}
        toggled={selectedClass == cl}
      >
        <div>
          <img
            className={classes.classIcon}
            src={`https://res.cloudinary.com/samidare/image/upload/v1/arknights/classes/${cl}`}
          />
          <div className={classes.smallText}>{capitalize(cl)}</div>
        </div>
      </FormButton>
    </div>
  ));

  const sortedOperators = Object.values(operatorJson)
  .filter((op: any) => (op.class.toLowerCase() === selectedClass))
  .sort(sortComparator)
  .map((op: any) => {
    let opName = (
      <span className={classes.smallText}>
        {op.name.split(" the ")[0].split(" (")[0]}
      </span>
    )
    return (
      <div className={classes.flex} key={op.id}>{
        <FormButton
          onClick={(()=>{
            if (selectedOp === op.id) {
              setSelectedOp(noneStr);
            } else {
              setSelectedOp(op.id);
            }
          })}
          toggled={selectedOp == op.id}
        >
          <div>
            <div>
              <img
                className={classes.opIcon}
                src={`https://res.cloudinary.com/samidare/image/upload/v1/arknights/operators/${slugify(
                    op.name, { lower: true, replacement: "-", remove: /-/g }
                  )}`
                }
              />
            </div>
            <div>
              {opName}
              </div>
          </div>
        </FormButton>}
      </div>
    )
  });


  const classDisplay = clsx({
    [classes.gridDisplay]: "true",
    [classes.marginBottom]: "true"
  })

  if (width < 960) {
    return (
      <div className={classes.container}>
        <div className={classes.mobileClassDisplay}>
          {classSelector}
        </div>
        <div className={classes.column}>
        {selectedClass === noneStr ? "" 
          : (selectedOp === noneStr ?
            <div className={classes.mobileOpDisplay}>
              {sortedOperators}
            </div>
          : <div className={boxStyle.boxStyle}>
              <MobileOpEditForm op={operators[selectedOp]} opClass={selectedClass} onChange={onChange}/>
            </div>
        )}
        </div>
      </div>
    );
  }

  return (
    <div className={classes.container}>
      <div className={classes.column}>
        <div className={classDisplay}>
          {classSelector}
        </div>
        <div className={classes.gridDisplay}>
          {selectedClass === noneStr ? "" 
          : sortedOperators}
        </div>
      </div>
      <div className={classes.column}>
        {(selectedOp === noneStr ? "" 
        : <div className={boxStyle.boxStyle}>
            <MobileOpEditForm op={operators[selectedOp]} opClass={selectedClass} onChange={onChange}/>
          </div>
        )}
      </div>
    </div>
  );
});
export default MobileOpSelectionScreen;
