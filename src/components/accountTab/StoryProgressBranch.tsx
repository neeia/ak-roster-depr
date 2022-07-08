import { useState } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import TextInput from "./TextInput";
import { Box, ButtonBase, Hidden, makeStyles } from "@material-ui/core";
import { useBoxStyles } from "../BoxStyles";
import { useFormStyles } from "./FormStyles";
import clsx from "clsx";
import { Grid } from "@material-ui/core";
import { useDataStyles } from "../dataTab/DataTabSharedStyles";
import { MdUpload, MdDownload, MdLogout, MdAccountBox, MdManageAccounts, MdFolderShared, MdSettings, MdOutlineContentPaste, MdOutlineInventory, MdOutlineCheck, MdOutlineCancel, MdOutlineUndo } from "react-icons/md";
import FormButton from "../FormButton";
import React from "react";
import { AccountView } from "./Dashboard";
import { AccountInfo, OperatorSkillSlot } from "../AccountTab";
import { Operator } from "../../App";
import OpSkillCard from "./OpSkillCard";

const useStyles = makeStyles({
  displayBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },
  centerBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "left",
    gap: "4px",
  },
  card: {
    position: "relative",
    width: "90vw",
    maxWidth: "600px",
    height: "400px",
  },
})

interface Props {
  user: firebase.User;
  userInfo: AccountInfo;
  operators: Record<string, Operator>;
}

const StoryProgressBranch = React.memo((props: Props) => {
  const { user, userInfo, operators } = props;
  const classes = useStyles();
  const style = useDataStyles();
  const form = useFormStyles();
  const boxStyle = useBoxStyles();

  return (
    <div className={classes.displayBox}>
    </div>
  );
});

export default StoryProgressBranch;
