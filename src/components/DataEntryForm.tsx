import React from "react";
import slugify from "slugify";
import { Operator } from "../App";
import { makeStyles } from "@material-ui/core";
import { useBoxStyles } from "./BoxStyles"
import clsx from "clsx";
import DataEntryCollect from "./DataEntryCollect";
import DataEntryLevel from "./DataEntryLevel";
import DataEntrySkillLevel from "./DataEntrySkillLevel";

const useStyles = makeStyles({
  displayBox: {
    display: "flex",
    flexDirection: "column",
    padding: "8px",
    boxShadow: "2px 2px 8px rgb(0 0 0 / 30%)",
    alignItems: "center",
    width: "460px",
    justifySelf: "center",
  },
  disabled: {
    opacity: "0.3",
  },
  opName: {
    marginLeft: "8px",
    fontSize: "36px",
    paddingTop: "12px",
  },
  alterTitle: {
    marginLeft: "8px",
    fontSize: "18px",
  },
  classIcon: {
    width: "48px",
    height: "48px",
  },
  opIcon: {
    width: "64px",
    height: "64px",
  },
  propContentContainer: {
    display: "inline-block",
    justifyContent: "flex",
    margin: "4px",
    flexGrow: 1,
  },
  editButtonContainer: {
    display: "flex",
    justifyContent: "space-evenly",
    gap: "3px",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-evenly",
    gap: "4px",
  },
  opImgNameBox: {
    alignSelf: "start",
    textAlign: "left",
    display: "flex",
    alignItems: "center",
    paddingBottom: "12px",
  },
  horizontalDivider: {
    backgroundColor: "#909090",
    height: "2px",
    width: "420px",
    marginTop: "16px",
    marginBottom: "24px",
  },
});

interface Props {
  op: Operator;
  onChange: (
    operatorId: string,
    property: string,
    value: number | boolean
  ) => void;
}

const DataEntryForm = React.memo((props: Props) => {
  const { op, onChange } = props;
  const classes = useStyles();
  const boxStyle = useBoxStyles();

  let intermediate = op.name;
  if (op.promotion === 2) {
    intermediate += " elite 2";
  } else if (op.promotion === 1 && op.name === "Amiya") {
    intermediate += " elite 1";
  }
  const imgUrl = `https://res.cloudinary.com/samidare/image/upload/v1/arknights/operators/${slugify(
    intermediate,
    { lower: true, replacement: "-", remove: /[-"]/g }
  )}`;

  let opName = (
    <span className={classes.opName}>
      {op.name}
    </span>
  )
  if (op.name.includes(" the ")) {
    const splitName = op.name.split(" the ");
    opName = (
      <span>
        <span className={classes.opName}>
          {splitName[0]}
        </span>
        <span className={classes.alterTitle}>
          {splitName[1]}
        </span>
      </span>
    )
  }

  const boxBox = clsx({
    [boxStyle.boxStyle]: "true",
    [classes.displayBox]: "true",
  });


  return (
    <div className={boxBox}>
      <div className={classes.opImgNameBox}>
        <img 
          className={classes.opIcon}
          src={imgUrl}
          alt=""
        />
        {opName}
      </div>
      <DataEntryCollect op={op} onChange={onChange} />
      <div className={classes.horizontalDivider} />
      <DataEntryLevel op={op} onChange={onChange} />
      <div className={classes.horizontalDivider} />
      <DataEntrySkillLevel op={op} onChange={onChange} />
    </div>
  );
});
export default DataEntryForm;
