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
import { AccountInfo } from "../AccountTab";
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
    justifyContent: "space-between"
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
      <div className={classes.centerBox}>
        <div className={classes.row}>
          <TextInput
            label="Arknights ID"
            placeholder={"Enter your in-game name."}
            onChange={(s: string) => {
              setDirty(true);
              setDisplayName(s.toLowerCase());
            }}
            value={displayName}
            width="160px"
          />
          <Box
            sx={{
              marginBottom: "4px",
              fontSize: "16px",
            }}>
            #
          </Box>
          <TextInput
            label="Tag"
            placeholder={"####"}
            onChange={(s: string) => {
              setDirty(true);
              setDisplayName(s.toLowerCase());
            }}
            type="number"
            value={displayName}
            width="60px"
          />
        </div>
        <div className={classes.row}>
          <TextInput
            label="Level"
            onChange={(s: string) => {
              setDirty(true);
              setDisplayName(s.toLowerCase());
            }}
            value={displayName}
            width="60px"
          />
          <TextInput
            label="Onboarding Date"
            placeholder={"Date of Account Creation"}
            onChange={() => { }}
            value={``}
            type="date"
            width="175px"
          />
        </div>
        <TextInput
          label="Email Address"
          onChange={(s: string) => {
            setDirty(true);
            setEmailAddress(s);
          }}
          value={emailAddress}
        />
        <div className={style.horizontalDivider} />
        <TextInput type={"password"} label="Password" placeholder="Confirm your Password" onChange={setPassword} value={password} />
        <div className={classes.row}>
          <FormButton
            className={classes.changeButton}
            onClick={() => {
              setDisplayName(actualDisplayName);
              setEmailAddress(user.email ?? "UNDEFINED");
            }}
            disabled={!dirty || password === ""}
          >
            <MdOutlineUndo size={iconSize * 1.5} />
            Revert
          </FormButton>
          <FormButton
            className={classes.changeButton}
            onClick={() => {
              setDisplayName(actualDisplayName);
              setEmailAddress(user.email ?? "UNDEFINED");
            }}
            disabled={!dirty || password === ""}
          >
            <MdOutlineCheck size={iconSize * 1.5} />
            Confirm
          </FormButton>
        </div>
      </div>
    </div>
  );
});

export default AccountProfile;
