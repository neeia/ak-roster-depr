import { makeStyles } from "@material-ui/core";
import FormButton from "./FormButton";
import React from "react";
import slugify from "slugify";
import { useState } from "react";
import { Operator, MOBILE_BREAKPOINT, TABLET_BREAKPOINT } from "../App";
import operatorJson from "../data/operators.json";
import DataEntryForm from "./DataEntryForm";
import useWindowSize, { Size } from "./UseWindowSize";
import clsx from "clsx";
import { useRarityStyles } from "./StyleRarityUnderline";

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
    flex: 1,
    maxWidth: "1000px",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
  containerChildMobile: {
    flex: 1,
    display: "grid",
    gridTemplateColumns: "auto 1fr",
    justifyContent: "center",
  },
  opBox: {
    flex: 1,
    maxWidth: "600px",
  },
  classDisplay: {
    display: "grid",
    gridTemplateColumns: "repeat(8, 1fr)",
    rowGap: "4px",
    gap: "2px",
  },
  classDisplayTablet: {
    display: "grid",
    gridTemplateColumns: "repeat(8, 1fr)",
    rowGap: "4px",
    gap: "2px",
  },
  classDisplayMobile: {
    display: "grid",
    gridTemplateColumns: "auto",
    gridTemplateRows: "repeat(8, 1fr)",
    rowGap: "4px",
    gap: "2px",
    height: "1vh",
    marginRight: "12px",
  },
  marginBottom: {
    marginBottom: "16px",
  },
  mobileOpDisplay: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  opIcon: {
    width: "64px",
    height: "64px",
    marginBottom: "2px",
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
  const rarity = useRarityStyles();
  const { operators, onChange } = props;

  const noneStr = "none";
  const [selectedClass, setSelectedClass] = useState(noneStr);
  const [selectedOp, setSelectedOp] = useState(noneStr);

  const size: Size = useWindowSize();
  const width = size.width === undefined ? 1920 : size.width;

  // Class Selector Component
  const classSelector = classList
  .map((cl: string) => (
    <div className={classes.flex} id={cl}>
      <FormButton
        onClick={(() => {
          if (selectedClass === cl && selectedOp === noneStr) {
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
            width={36}
            height={36}
          />
          {width <= MOBILE_BREAKPOINT ? "" : <div className={classes.smallText}>{cl}</div>}
        </div>
      </FormButton>
    </div>
  ));

  // turns Skadi the Corrupting Heart into Skadi (CH)
  function titlefy(title: string): string {
    return title ? " (" + title?.split(" ").map((value: string) => value.charAt(0)).join("") + ")" : "";
  }

  // Operator Selector Component
  const sortedOperators = Object.values(operatorJson)
  .filter((op: any) => (op.class === selectedClass))
  .sort(sortComparator)
    .map((op: any) => {
    // Process operator name
    let opName = (
      <span className={classes.smallText}>
        {op.name.split(" the ")[0].split(" (")[0]}
        {(titlefy(op.name.split(" the ")[1]))}
        {(titlefy(op.name.split(" (")[1]))}
      </span>
    )
    const opIconStyle = clsx({
      [rarity.rarityOne]: op.rarity === 1,
      [rarity.rarityTwo]: op.rarity === 2,
      [rarity.rarityThree]: op.rarity === 3,
      [rarity.rarityFour]: op.rarity === 4,
      [rarity.rarityFive]: op.rarity === 5,
      [rarity.raritySix]: op.rarity === 6,
      [classes.opIcon]: true,
      })
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
            <img
              className={opIconStyle}
              src={`https://res.cloudinary.com/samidare/image/upload/v1/arknights/operators/${slugify(
                  op.name, { lower: true, replacement: "-", remove: /[-"]/g }
                )}`
              }
              alt=""
            />
            <div>
              {opName}
            </div>
          </div>
        </FormButton>}
      </div>
    )
  });


  const classDisplay = clsx({
    [classes.classDisplay]: width > TABLET_BREAKPOINT,
    [classes.classDisplayTablet]: width <= TABLET_BREAKPOINT,
    [classes.classDisplayMobile]: width <= MOBILE_BREAKPOINT,
    [classes.marginBottom]: "true"
  })

  if (width > MOBILE_BREAKPOINT) {
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
            : <DataEntryForm op={operators[selectedOp]} opClass={selectedClass} onChange={onChange} />
          }
        </div>
      </div>
    );
  }

  else {
    return (
      <div className={classes.containerMobile}>
        <div className={classes.containerChildMobile}>
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
              <DataEntryForm op={operators[selectedOp]} opClass={selectedClass} onChange={onChange} />
            </div>
          }
          </div>
      </div>
    );
  }
});
export default DataTab;
