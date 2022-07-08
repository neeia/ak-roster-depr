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
import { MdUpload, MdDownload, MdLogout, MdAccountBox, MdManageAccounts, MdFolderShared, MdSettings } from "react-icons/md";
import FormButton from "../FormButton";
import React from "react";
import AccountOverview from "./AccountOverview";
import { AccountInfo } from "../AccountTab";
import { userInfo } from "os";
import AccountSettings from "./AccountSettings";
import { Operator } from "../../App";
import AccountProfile from "./AccountProfile";

const useStyles = makeStyles({
  displayBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },
  selectButtonArea: {
    display: "flex",
    justifyContent: "center",
    gap: "12px",
  },
  viewSelectButton: {
    display: "flex",
    width: "78px",
    flexDirection: "column",
    boxShadow: "2px 2px 8px rgb(0 0 0 / 30%)",
  },
})

interface Props {
  user: firebase.User;
  userInfo: AccountInfo;
  saveData: () => void;
  loadData: () => void;
  handleLogout: () => void;
  operators: Record<string, Operator>;
}

const Dashboard = React.memo((props: Props) => {
  const { user, userInfo, saveData, loadData, handleLogout, operators } = props;
  const classes = useStyles();
  const style = useDataStyles();
  const form = useFormStyles();
  const boxStyle = useBoxStyles();

  const [currentView, setCurrentView] = useState<AccountView>(AccountView.Overview)
  const updateCurrentView = (view: AccountView) => {
    setCurrentView(view === currentView ? AccountView.None : view)
  }

  const contentBlock = (state: AccountView) => {
    switch (state) {
      case AccountView.Overview:
        return <AccountOverview user={user} userInfo={userInfo} />
      case AccountView.Account:
        return <AccountSettings user={user} userInfo={userInfo} />
      case AccountView.Profile:
        return <AccountProfile user={user} userInfo={userInfo} operators={operators}/>
    }
  }

  const iconSize = 36;
  return (
    <div className={classes.displayBox}>
      <div className={classes.selectButtonArea} >
        <FormButton
          onClick={() => updateCurrentView(AccountView.Overview)}
          toggled={currentView === AccountView.Overview}
          className={classes.viewSelectButton}
        >
          <MdAccountBox size={iconSize} />
          Overview
        </FormButton>
        <FormButton
          onClick={() => updateCurrentView(AccountView.Account)}
          toggled={currentView === AccountView.Account}
          className={classes.viewSelectButton}
        >
          <MdManageAccounts size={iconSize} />
          Account
        </FormButton>
        <FormButton
          onClick={() => updateCurrentView(AccountView.Profile)}
          toggled={currentView === AccountView.Profile}
          className={classes.viewSelectButton}
        >
          <MdFolderShared size={iconSize} />
          Profile
        </FormButton>
      </div>
      <div className={style.horizontalDivider} />
      {contentBlock(currentView)}
    </div >
  );
});

export enum AccountView {
  Overview, Account, Profile, Settings, None
}

export default Dashboard;
