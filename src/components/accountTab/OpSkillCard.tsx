import { useState } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import operatorJson from "../../data/operators.json";
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

const useStyles = makeStyles({
  displayBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
})

interface Props {
  op?: Operator;
}

const OpSkillCard = React.memo((props: Props) => {
  const { op } = props;
  const classes = useStyles();
  const style = useDataStyles();
  const form = useFormStyles();
  const boxStyle = useBoxStyles();

  const [currentView, setCurrentView] = useState<AccountView>(AccountView.Overview)
  const updateCurrentView = (view: AccountView) => {
    setCurrentView(view === currentView ? AccountView.None : view)
  }

  let intermediate = "char_002_amiya";
  if (intermediate) {
    const elt = 2;//op.promotion;
    if (elt === 2) {
      intermediate += "_2";
    } else if (elt === 1) {// && op.name === "Amiya") {
      intermediate += "_1+";
    } else if (elt === 0) {
      intermediate += "_1";
    }
  }
  const opImgUrl = `/img/portraits/${intermediate}.png`;

  const iconSize = 16;
  return (
    <div className={classes.displayBox}>
      <ButtonBase
        onClick={() => { }}
      >
        {op
          ? <img
            src={`/img/classes/class_${(operatorJson as any)[op.id].class.toLowerCase()}.png`}
            alt={(operatorJson as any)[op.id].class}
          />
          : "+"
        }
      </ButtonBase>
    </div>
  );
});

export default OpSkillCard;
