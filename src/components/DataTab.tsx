import { makeStyles } from "@material-ui/core";
import FormButton from "./FormButton";
import React from "react";
import slugify from "slugify";
import { useState } from "react";
import { Operator, MOBILE_BREAKPOINT, TABLET_BREAKPOINT } from "../App";
import operatorJson from "../data/operators.json";
import MobileOpEditForm from "./MobileOpEditForm";
import { useBoxStyles } from "./BoxStyles"
import useWindowSize, { Size } from "./UseWindowSize";
import clsx from "clsx";

const useStyles = makeStyles({
  container: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
  containerChild: {
    flex: 1,
    maxWidth: "1000px",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
  opBox: {
    maxWidth: "600px",
  },
  gridDisplay: {
    display: "flex",
    
    rowGap: "4px",
    gap: "2px",
  },
  gridDisplaySecondary: {
    display: "grid",
    gridTemplateColumns: "repeat(4, minmax(104px, 120px))",
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
    display: "flex",
    flexWrap: "wrap",
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

function sortComparator(a: any, b: any) {
  return (
    b.rarity - a.rarity ||
    a.name.localeCompare(b.name)
  );
}

const DataTab = React.memo((props: Props) => {
  const classes = useStyles();
  const { operators, onChange } = props;
  const boxStyle = useBoxStyles();

  const noneStr = "none";
  const [selectedClass, setSelectedClass] = useState(noneStr);
  const [selectedOp, setSelectedOp] = useState(noneStr);

  const size: Size = useWindowSize();
  const width = size.width === undefined ? 1920 : size.width;


  const classSelector = classList
  .map((cl: string) => (
    <div className={classes.flex} id={cl}>
      <FormButton
        onClick={(() => {
          if (selectedClass === cl && selectedOp === noneStr && width > MOBILE_BREAKPOINT) {
            setSelectedClass(noneStr);
          } else {
            setSelectedClass(cl);
          }
          setSelectedOp(noneStr);
        })}
        toggled={selectedClass === cl}
      >
        <div>
          <img
            className="classIcon"
            src={`https://res.cloudinary.com/samidare/image/upload/v1/arknights/classes/${cl}`}
            alt=""
            width={width <= MOBILE_BREAKPOINT ? 36 : 48}
            height={width <= MOBILE_BREAKPOINT ? 36 : 48}
          />
          {width <= MOBILE_BREAKPOINT ? "" : <div className={classes.smallText}>{cl}</div>}
        </div>
      </FormButton>
    </div>
  ));

  function titlefy(title: string): string {
    return title ? " (" + title?.split(" ").map((value: string) => value.charAt(0)).join("") + ")" : "";
    
  }

  const buttonStyle = clsx({
    [classes.flex]: "true",
    [boxStyle.boxStyle]: "true",
  })

  const sortedOperators = Object.values(operatorJson)
  .filter((op: any) => (op.class === selectedClass))
  .sort(sortComparator)
  .map((op: any) => {
    let opName = (
      <span className={classes.smallText}>
        {op.name.split(" the ")[0].split(" (")[0]}
        {(titlefy(op.name.split(" the ")[1]))}
        {(titlefy(op.name.split(" (")[1]))}
      </span>
    )
    return (
      <div className={classes.flex} key={op.id}>{
        <FormButton
          onClick={(() => {
            if (selectedOp === op.id) {
              setSelectedOp(noneStr);
            } else {
              setSelectedOp(op.id);
            }
          })}
          toggled={selectedOp === op.id}
        >
          <div>
            <div className={classes.opIcon}>
              <img
                className={classes.opIcon}
                src={`https://res.cloudinary.com/samidare/image/upload/v1/arknights/operators/${slugify(
                    op.name, { lower: true, replacement: "-", remove: /[-"]/g }
                  )}`
                }
                alt=""
              />
            </div>
            <div style={{ height: 2, backgroundColor: COLOR_BY_RARITY[op.rarity], marginBottom: 2 }} />
            <div>
              {opName}
            </div>
          </div>
        </FormButton>}
      </div>
    )
  });


  const classDisplay = clsx({
    [classes.mobileClassDisplay]: width <= MOBILE_BREAKPOINT,
    [classes.gridDisplaySecondary]: width <= TABLET_BREAKPOINT,
    [classes.gridDisplay]: width > TABLET_BREAKPOINT,
    [classes.marginBottom]: "true"
  })


  return (
    <div className={classes.container}>
      <div className={classes.containerChild}>
        <div className={classDisplay}>
          {classSelector}
        </div>
        {selectedOp === noneStr
          ? (selectedClass === noneStr
            ? ""
            : <div className={classes.mobileOpDisplay}>
              {sortedOperators}
            </div>)
          : <div className={classes.opBox}>
            <MobileOpEditForm op={operators[selectedOp]} opClass={selectedClass} onChange={onChange} />
          </div>
        }
      </div>
    </div>
  );

  //return (
  //  <div className={classes.container}>
  //    <div className={classes.column}>
  //      <div className={classDisplay}>
  //        {classSelector}
  //      </div>
  //      <div className={classDisplay}>
  //        {selectedClass === noneStr ? "" 
  //        : sortedOperators}
  //      </div>
  //    </div>
  //    <div className={classes.opBox}>
  //      {(selectedOp === noneStr ? "" 
  //      : <MobileOpEditForm op={operators[selectedOp]} opClass={selectedClass} onChange={onChange}/>
  //      )}
  //    </div>
  //  </div>
  //);
});
export default DataTab;
