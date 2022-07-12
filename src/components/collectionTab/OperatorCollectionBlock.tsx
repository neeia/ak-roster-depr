import React from "react";
import { Operator } from "../../App";
import { makeStyles, Hidden } from "@material-ui/core";
import { useRarityStyles, rarityColors } from "../StyleRarityUnderline";
import clsx from "clsx";
import SkillDisplayBox from "./SkillDisplayBox";
import { MdFavorite } from "react-icons/md";
import { MAX_LEVEL_BY_RARITY } from "../RosterTable";
import { Box } from "@mui/material";

const useStyles = makeStyles({
  opNameArea: {
    gridArea: "name",
    display: "grid",
    gridTemplateColumns: "1fr auto"
  },
  imgArea: {
    gridArea: "img",
    display: "grid",
    gridTemplateAreas: `"level"`,
    position: "relative",
  },
  promotionBoxLabel: {
    gridArea: "elite",
    width: "20px",
    fontSize: "9px",
    lineHeight: "14px",
    color: "#EEEEEE",
    display: "grid",
    alignItems: "start",
    justifyContent: "center",
    textDecoration: "none",
    border: "none",
    marginLeft: "-2px",
  },
});

interface Props {
  op: Operator;
}

const OperatorCollectionBlock = React.memo((props: Props) => {
  const { op } = props;
  const classes = useStyles();

  let intermediate = op.id;
  if (op.promotion === 2) {
    intermediate += "_2";
  } else if (op.promotion === 1 && op.name === "Amiya") {
    intermediate += "_1";
  }

  const potentialUrl = `/img/potential/${op.potential}.png`;
  const opImgUrl = `/img/avatars/${intermediate}.png`;

  const reg = /( the )|\(/g;
  const nameSplitTitle = op.name.split(reg);
  const name = nameSplitTitle.length > 1 ? nameSplitTitle[2].split(")")[0] : nameSplitTitle[0];
  const nameIsLong = name.split(" ").length > 1 && name.length > 11;

  let opName;
  let splitName;
  if (op.name.includes(" the ")) {
    splitName = op.name.split(" the ");
  }
  if (op.name.includes(" (")) {
    const name = op.name.split(" (");
    const title = name[1].split(")");
    splitName = [name, title]
  }
  if (splitName) {
    opName = (
      <span>
        <Box sx={{
          fontSize: { xs: "7px", sm: "9px" },
          lineHeight: { xs: "6px", sm: "8px" },
          marginLeft: "1px",
        }}>
          {splitName[1]}
        </Box>
        <Box sx={{
          fontSize: { xs: "11px", sm: "12px" },
          lineHeight: { xs: "11px", sm: "12px" },
          marginLeft: "1px",
        }}>
          {splitName[0]}
        </Box>
      </span>
    )
  } else {
    opName = (
      <Box sx={{
        fontSize: { xs: nameIsLong ? "9px" : "12px", sm: nameIsLong ? "12px" : "14px" },
        lineHeight: { xs: "17px", sm: "20px" },
        marginLeft: "1px",
      }}>
        {op.name}
      </Box>
    )
  }

  const potentialBlock =
    <Box sx={{
      display: "grid",
      gridTemplateAreas: `"potential"`,
      gridArea: "potential",
      marginLeft: "0px",
      marginBottom: { xs: "2px", sm: "8px" },
      justifySelf: "start",
    }}>
      <Box sx={{
        gridArea: "potential",
        width: { xs: "14px", sm: "25px" },
        height: { xs: "20px", sm: "28px" },
        alignSelf: "center",
        justifySelf: "center",
      }}>
        <svg width="100%" height="100%">
          <rect x="0" y="0" width="100%" height="100%"
            fill="#323232" fillOpacity="0.95" stroke="#808080" strokeWidth="1.5" />
        </svg>
      </Box>
      <Box
        component="img"
        sx={{
          gridArea: "potential",
          width: { xs: "16px", sm: "24px" },
          height: { xs: "16px", sm: "24px" },
          alignSelf: "center",
          justifySelf: "center",
        }}
        src={potentialUrl}
        alt={`Potential ${op.potential}`}
      />
    </Box >

  const promotionSx = {
    display: "grid",
    gridTemplateAreas: `"elite"`,
    gridArea: "elite",
    width: { xs: "12px", sm: "20px" },
    height: { xs: "20px", sm: "32px" },
    justifyContent: "center",
    marginBottom: { xs: "6px", sm: "4px" },
    marginLeft: { xs: "0px", sm: "-2px" },
  }
  const promotionBlock =
    <Box sx={{ ...promotionSx }}>
      <Hidden xsDown>
        <Box sx={{
          ...promotionSx
        }} >
          <svg width="100%" height="100%">
            <rect x="0" y="0" width="100%" height="100%"
              fill="#323232" fillOpacity="0.95" strokeWidth="2"
              stroke="#808080" />
          </svg>
        </Box>
        <abbr
          className={classes.promotionBoxLabel}
          title={`E${op.promotion}`}
        >
          E{op.promotion}
        </abbr>
        <Box sx={{
          ...promotionSx
        }} >
          <Box
            component="img"
            src={`/img/elite/${op.promotion}.png`}
            sx={{
              width: "32px",
              height: "32px",
            }}
            alt={``}
          />
        </Box>
      </Hidden>
      <Hidden smUp>
        <Box sx={{
          ...promotionSx
        }} >
          <Box
            component="img"
            src={`/img/elite/${op.promotion}_s_box.png`}
            sx={{
              width: "26px",
              height: "26px",
            }}
            alt={``}
          />
        </Box>
      </Hidden>
    </Box>

  const levelSx = {
    gridArea: "level",
    display: "grid",
    gridTemplateAreas: "level",
    width: { xs: "32px", sm: "48px" },
    height: { xs: "32px", sm: "48px" },
    marginLeft: { xs: "-2px", sm: "-4px" },
    marginBottom: "-2px",
  };

  const levelBlock =
    <Box sx={{ ...levelSx }}>
      <Box sx={{
        ...levelSx
      }} >
        <svg width="100%" height="100%">
          <circle cx="50%" cy="50%" r="45%"
            fill="#323232" fillOpacity="0.95" strokeWidth="2"
            stroke={op.level === MAX_LEVEL_BY_RARITY[op.rarity][2] ? "#f7d98b" : "#808080"} />
        </svg>
      </Box>
      <Box sx={{
        ...levelSx,
        fontSize: { xs: "18px", sm: "24px" },
        lineHeight: { xs: "16px", sm: "24px" },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }} >
        <Hidden xsDown>
          <Box
            component="abbr"
            title="Level"
            sx={{
              gridArea: "level",
              fontSize: "9px",
              lineHeight: "4px",
              display: "flex",
              textDecoration: "none",
              border: "none",
            }}
          >
            LV
          </Box>
        </Hidden>
        {op.level}
      </Box >
    </Box >

  const levelBubble =
    <div className={classes.imgArea}>
      <Box sx={{
        gridArea: "level",
        alignSelf: "end",
        justifySelf: "start",
        marginLeft: "-12px",
        marginBottom: "-8px",
        display: "grid",
        gridTemplateAreas: `"potential" "elite" "level"`,
      }}>
        {op.potential > 1 ? potentialBlock : ""}
        {op.promotion > 0 ? promotionBlock : ""}
        {op.promotion > 0 || op.level > 1 ? levelBlock : ""}
      </Box >
    </div >

  const skillBlock =
    <div className={classes.imgArea}>
      <Box sx={{
        gridArea: "level",
        marginTop: "4px",
        marginRight: { xs: "-14px", sm: "-24px" },
        display: "flex",
        flexDirection: "column",
        justifySelf: "end",
        gap: "2px",
      }}>
        {(op.rarity > 2 ?
          <Box sx={{ marginLeft: { xs: "0px", sm: "0px" } }}>
            <SkillDisplayBox operator={op} skill={1} sx={{ height: { xs: "16px", sm: "24px" } }} />
          </Box>
          : <div />)}
        {(op.rarity > 3 ?
          <Box sx={{ marginLeft: { xs: "0px", sm: "4px" } }}>
            <SkillDisplayBox operator={op} skill={2} sx={{ height: { xs: "16px", sm: "24px" } }} />
          </Box>
          : <div />)}
        {(op.rarity === 6 || op.name === "Amiya" ?
          <Box sx={{ marginLeft: { xs: "0px", sm: "8px" } }}>
            <SkillDisplayBox operator={op} skill={3} sx={{ height: { xs: "16px", sm: "24px" } }} />
          </Box>
          : <div />)}
      </Box>
    </div>

  const opModuleUrls: string[] = op.module?.map((lvl: number, n: number) =>
    lvl > 0 ? `/img/equip/uniequip_00${n + 2}_${op.id.split("_")[2]}.png` : ""
  ) ?? []
  const opModuleStages: number[] = op.module?.map((lvl: number) => lvl) ?? []
  const moduleBlock =
    <Box sx={{
      gridArea: "img",
      display: "flex",
      flexDirection: "row-reverse",
      alignSelf: "end",
      marginBottom: { xs: "-4px", sm: "-4px" },
      marginRight: { xs: "-12px", sm: "-16px" },
      gap: { xs: "2px", sm: "4px" },
    }}>
      {opModuleUrls.map((url: string, n: number) =>
        url
          ? <Box
            key={n}
            sx={{
              display: "grid",
              gridTemplateAreas: `"module"`,
              alignSelf: "center",
              justifySelf: "center",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: `-${4 * n}px`
            }}>
            <Box sx={{
              gridArea: "module",
              width: { xs: "24px", sm: "32px" },
              height: { xs: "24px", sm: "32px" },
            }}>
              <svg width="100%" height="100%">
                <rect x="0" y="0" width="100%" height="100%"
                  fill="#323232" fillOpacity="0.75" strokeWidth="1"
                  stroke={"#808080"} />
              </svg>
            </Box>
            <Box
              component="img"
              sx={{
                gridArea: "module",
                width: { xs: "24px", sm: "32px" },
                height: { xs: "24px", sm: "32px" },
              }}
              src={url}
              alt={`Module ${n + 1}`}
            />
            {opModuleStages[n] > 1
              ? <Box
                component="abbr"
                title={`Stage ${opModuleStages[n]}`}
                sx={{
                  gridArea: "module",
                  width: { xs: "24px", sm: "32px" },
                  height: { xs: "24px", sm: "32px" },
                  textDecoration: "none",
                  border: "none",
                  fontSize: { xs: "16px", sm: "24px" },
                  fontWeight: "bold",
                  textAlign: "right",
                  color: "black",
                  WebkitTextFillColor: "white",
                  WebkitTextStroke: "1px black",
                  marginBottom: "-4px",
                  marginLeft: "-2px"
                }}
              >
                {opModuleStages[n]}
              </Box> : ""}
          </Box>
          : "")}
    </Box >

  return (
    <Box sx={{
      display: "grid",
      gridTemplateAreas: `"name" "img"`,
      gridTemplateRows: "auto 1fr",
      padding: { xs: "4px 8px 4px 6px", sm: "6px 10px 8px 10px" },
      border: "1px solid #808080",
      borderRadius: "4px",
      backgroundColor: "#40403E",
      boxShadow: "2px 2px 8px rgb(0 0 0 / 30%)",
      margin: { xs: "2px 4px 4px 10px", sm: "2px 16px 10px 12px" },
    }}>
      <div className={classes.opNameArea}>
        {opName}
        {op.favorite
          ? <Box sx={{
            alignSelf: "center",
            justifySelf: "end",
            lineHeight: "0px",
            marginRight: "-2px",
          }}>
            <MdFavorite
              size={18}
              color={"#ff4d4d"}
            />
          </Box>
          : ""}
      </div>
      <Box
        component="img"
        src={opImgUrl}
        sx={{
          gridArea: "img",
          width: { xs: "80px", sm: "120px" },
          borderBottom: `3px solid ${rarityColors[op.rarity]}`,
        }}
      />
      {levelBubble}
      {skillBlock}
      {op.module ? moduleBlock : ""}
    </Box>
  );
});
export default OperatorCollectionBlock;
