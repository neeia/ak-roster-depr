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
import { MAX_LEVEL_BY_RARITY } from "../RosterTable";
import operatorJson from "../../data/operators.json";

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

const ProfileCard = React.memo((props: Props) => {
  const { user, userInfo, operators } = props;
  const classes = useStyles();
  const style = useDataStyles();
  const form = useFormStyles();
  const boxStyle = useBoxStyles();

  let intermediate = "char_002_amiya";
  if (intermediate) {
    const supp = operators[intermediate];
    const elt = supp["promotion"];
    if (elt === 2) {
      intermediate += "_2";
    } else if (elt === 1 && supp.name === "Amiya") {
      intermediate += "_1+";
    } else if (elt === 0) {
      intermediate += "_0";
    }
  }
  const supportImgUrl = `/img/avatars/${intermediate}.png`;

  const ownedOps = Object.keys(operators).filter((id: string) => id !== "char_1001_amiya2" && operators[id].owned);
  const e1Ops = ownedOps.filter((id: string) => id !== "char_1001_amiya2" && operators[id].promotion > 0);
  const e2Ops = e1Ops.filter((id: string) => id !== "char_1001_amiya2" && operators[id].promotion > 1);
  const opHasM3 = (op: Operator) => {
    if (op.promotion === 2) {
      return op.skill1Mastery === 3 || op.skill2Mastery === 3 || op.skill3Mastery === 3;
    }
    return false;
  }
  const m3Ops = e1Ops.filter((id: string) => id !== "char_1001_amiya2" && opHasM3(operators[id]));
  const countModules = (op: Operator, minLevel: number) => {
    if (op.promotion === 2) {
      return op.module?.filter((lvl: number) => lvl >= minLevel).length ?? 0;
    }
    return false;
  }
  const moduleOps = e2Ops.filter((id: string) => id !== "char_1001_amiya2" && countModules(operators[id], 1));
  const opHasSkill = (op: Operator, skill: number) => {
    switch (skill) {
      case 0:
        return op.rarity > 2;
      case 1:
        return op.rarity > 3;
      case 2:
        return op.rarity === 6 || op.name === "Amiya";
      default: return undefined;
    }
  }
  const opIsMaxed = (op: Operator) => {
    const opInfo = (operatorJson as any)[op.id];
    if (!opInfo) return false;
    if (op.level === MAX_LEVEL_BY_RARITY[op.rarity][2]) {
      if (op.rarity < 3) return true;
      if (op.skillLevel === 7) {
        if (op.rarity === 3) return true;
        for (let i = 0; i < 3; i++) {
          if (opHasSkill(op, i) && (op as any)[`skill${i + 1}Mastery`] !== 3) return false;
        }
        return true;
      }
    }
    return false;
  }
  const maxedOps = ownedOps.filter((id: string) => id !== "char_1001_amiya2" && opIsMaxed(operators[id]));

  const profileGridRow = (opList: string[]) =>
    [...Array(7)].map((_, n: number) =>
      <Box sx={{ fontSize: "12px", color: "#ffffff" }}>
        {opList.filter((id: string) => !n || operators[id].rarity === n + 1).length}
      </Box>
    );

  const iconSize = 16;
  return (
    <div className={classes.displayBox}>
      <div className={boxStyle.boxStyle}>
        <div className={classes.card}>
          <Box
            sx={{
              position: "absolute",
              top: 8,
              left: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
            }}>
            <Box>
              Onboarded: {userInfo.creationDate ?? "Unknown"}
            </Box>
            <Box>
              Assistant: {operators[intermediate] ?? "Unknown"}
            </Box>
          </Box>
          <Box
            sx={{
              position: "absolute",
              top: 0,
              right: 0,
              display: "grid",
              gridTemplateAreas: `"icon name" "icon level" "supp supp"`
            }}
          >
            <Box sx={{ gridArea: "icon" }}>
              <img src={supportImgUrl} width="48px" height="48px" />
            </Box>
            <Box sx={{ gridArea: "name" }}>
              Dr. Neia #2212
            </Box>
            <Box sx={{ gridArea: "level" }}>
              Level {userInfo.accountLevel ?? "Unknown"}
            </Box>
            Supports:
            <Box sx={{
              display: "grid",
              gridTemplateColumns: "repeat(6, 1fr)",
              gridTemplateRows: "1fr 1fr",
            }}>
              {userInfo.support?.map((op: OperatorSkillSlot) =>
                <OpSkillCard op={operators[op.opID]} key={op.opID} />
              )}
              {[...Array(3 - (userInfo.team?.length ?? 0))].map((_, i) =>
                <OpSkillCard key={i} />
              )}
            </Box>
          </Box>
        </div>
        Account Stats
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "auto repeat(7, 1fr)",
            textAlign: "left",
          }}
        >
          <div />
          <div>Total</div>
          {[...Array(6)].map((_, n: number) => <div>{n + 1}*</div>)}
          <div>Operators Hired</div>
          {profileGridRow(ownedOps)}
          <div>Promoted (E1+):</div>
          {profileGridRow(e1Ops)}
          <div>Promoted (E2):</div>
          {profileGridRow(e2Ops)}
          <div>Skills Mastered (M3):</div>
          {profileGridRow(m3Ops)}
          <div>Modules Unlocked:</div>
          {profileGridRow(moduleOps)}
          <div>Operators Maxed:</div>
          {profileGridRow(maxedOps)}
          <div>Operators Maxed (P6):</div>
          {profileGridRow(maxedOps.filter((id: string) => operators[id].potential === 6))}
        </Box>
      </div>
    </div>
  );
});

export default ProfileCard;
