import { useState } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import TextInput from "./TextInput";
import { ButtonBase, Hidden, makeStyles } from "@material-ui/core";
import { useBoxStyles } from "../BoxStyles";
import { useFormStyles } from "./FormStyles";
import clsx from "clsx";
import { Grid } from "@material-ui/core";
import { useDataStyles } from "../dataTab/DataTabSharedStyles";
import { MdUpload, MdDownload, MdLogout, MdAccountBox, MdManageAccounts, MdFolderShared, MdSettings, MdOutlineContentPaste, MdOutlineInventory, MdOutlineCheck, MdOutlineCancel, MdOutlineUndo } from "react-icons/md";
import FormButton from "../FormButton";
import React from "react";
import { AccountView } from "./Dashboard";
import { AccountInfo } from "../AccountTab";
import ProfileCard from "./ProfileCard";
import { Operator } from "../../App";

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
  row: {
    display: "flex",
    alignItems: "end",
    gap: "2px",
  },
  button: {
    height: "25px",
    width: "25px",
    margin: "2px",
    borderRadius: "0px",
  },
  selectButtonArea: {
    display: "flex",
    justifyContent: "center",
    gap: "12px",
  },
  changeButton: {
    display: "flex",
    gap: "6px",
    margin: "8px 16px 16px 16px",
  },
})

interface Props {
  user: firebase.User;
  userInfo: AccountInfo;
  operators: Record<string, Operator>;
}

const AccountProfile = React.memo((props: Props) => {
  const { user, userInfo, operators } = props;
  const classes = useStyles();
  const style = useDataStyles();
  const form = useFormStyles();
  const boxStyle = useBoxStyles();

  const [currentView, setCurrentView] = useState<AccountView>(AccountView.Overview)
  const updateCurrentView = (view: AccountView) => {
    setCurrentView(view === currentView ? AccountView.None : view)
  }

  const [actualDisplayName, setActualDisplayName] = useState<string>(user.displayName ?? "");
  const [displayName, setDisplayName] = useState<string>(user.displayName ?? "");
  const [dirty, setDirty] = useState<boolean>(false);
  const [emailAddress, setEmailAddress] = useState<string>(user.email ?? "");
  const [copiedEmail, setCopiedEmail] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");

  const iconSize = 16;
  return (
    <div className={classes.displayBox}>
      <ProfileCard user={user} userInfo={userInfo} operators={operators} />
    </div>
  );
});

export default AccountProfile;
