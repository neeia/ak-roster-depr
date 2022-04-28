import React from "react";
import { Operator } from "../../App";
import { makeStyles, TextField } from "@material-ui/core";
import { useBoxStyles } from "../BoxStyles"
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
    paddingTop: "12px",
    paddingBottom: "12px",
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
  horizontalDivider: {
    backgroundColor: "#909090",
    height: "2px",
    width: "420px",
    marginTop: "16px",
    marginBottom: "24px",
  },
  textInput: {
    paddingTop: "12px",
    paddingBottom: "12px",
    fontSize: "24px",
    textAlign: "center",
  },
});

interface Props {
  op: Operator;
  onChange: (
    operatorId: string,
    property: string,
    value: any
  ) => void;
}

const PresetEntryForm = React.memo((props: Props) => {
  const { op, onChange } = props;
  const classes = useStyles();
  const boxStyle = useBoxStyles();

  const boxBox = clsx({
    [boxStyle.boxStyle]: "true",
    [classes.displayBox]: "true",
  });


  return (
    <div className={boxBox}>
      <TextField
        variant="outlined"
        size="small"
        margin="none"
        className={classes.opName}
        value={op.name}
        onChange={(e) => onChange(op.id, "name", e.target.value)}
        inputProps={{
          className: classes.textInput,
        }}
      />
      <DataEntryCollect op={op} onChange={onChange} />
      <div className={classes.horizontalDivider} />
      <DataEntryLevel op={op} onChange={onChange} />
      <div className={classes.horizontalDivider} />
      <DataEntrySkillLevel op={op} onChange={onChange} />
    </div>
  );
});
export default PresetEntryForm;
