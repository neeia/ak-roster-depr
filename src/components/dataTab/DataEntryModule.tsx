import React from "react";
import { Operator } from "../../App";
import operatorJson from "../../data/operators.json";
import { MAX_LEVEL_BY_RARITY } from "../RosterTable";
import { ButtonBase, Grid, Hidden, makeStyles, TextField } from "@material-ui/core";
import clsx from "clsx";
import FormButton from "../FormButton";
import { useDataStyles } from "./DataTabSharedStyles";
import DataLabel from "./DataLabel";

const useStyles = makeStyles({
  moduleContainer: {
    display: "grid",
    gridTemplateAreas: `"icon name name name name"
                      "icon m m m m"`,
    gridTemplateColumns: `"auto repeat(4, 1fr)"`,
    gridTemplateRows: "auto 1fr",
    justifyItems: "center",
    alignItems: "center",
  },
  moduleName: {
    gridArea: "name",
    fontSize: "13px",
  },
  moduleButton: {
    width: "40px",
    height: "40px",
    margin: "2px",
    display: "grid",
    gridTemplateAreas: `"stack"`,
  },
  moduleStageIcon: {
    gridArea: "stack",
    width: "32px",
    height: "32px",
  },
  moduleIconBox: {
    gridArea: "icon",
    display: "flex",
    flexDirection: "column",
    fontSize: "12px",
  },
  moduleIcon: {
    width: "48px",
    height: "48px",
  },
  disabled: {
    opacity: "0.3",
  },
  svg: {
    "&:focus": {
      boxShadow: "0px 0px 0px 1px #fcf3dc inset",
      background: "#505050"
    }
  },
  unselected: {
    opacity: "0.5",
  },
});

interface Props {
  op: Operator;
  onChange: (
    operatorId: string,
    property: string,
    value: number | boolean,
    index?: number
  ) => void;
}

const DataEntryModule = React.memo((props: Props) => {
  const { op, onChange } = props;
  const classes = useStyles();
  const style = useDataStyles();
  const opInfo = (operatorJson as any)[op.id];

  const moduleSection = (
    <Grid item xs={12} sm={7}>
      <Grid container>
        {opInfo ?
          <React.Fragment>
            <DataLabel label={"Modules"} part={false} />
            <DataLabel label={"Modules"} part={true} />
            {opInfo["modules"].length > 0
              ? <Grid item xs={7} sm={12} className={style.block}>
                {opInfo["modules"].map((module: any, i: number) =>
                  <div key={i} className={classes.moduleContainer}>
                    <div className={classes.moduleName}>
                      {module.moduleName}
                    </div>
                    <div className={classes.moduleIconBox}>
                      <Hidden xsDown>
                        <img
                          className={clsx({
                            [classes.moduleIcon]: true,
                            [classes.unselected]: !op.owned || op.promotion < i,
                          })}
                          src={`/img/equip/${module.moduleId}.png`}
                          alt={`Module ${i + 1}`}
                        />
                        {module.typeName}
                      </Hidden>
                    </div>
                    {[...Array(4)].map((_, j) =>
                      <FormButton
                        key={`mastery${j}Button`}
                        className={classes.moduleButton}
                        onClick={() => {
                          onChange(op.id, `module`, j, i);
                        }}
                        toggled={op.module ? op.module[i] === j : false}
                        disabled={false}
                      >
                        <img
                          className={classes.moduleStageIcon}
                          src={`/img/equip/img_stg${j}.png`}
                          alt={""}
                        />
                      </FormButton>
                    )}
                  </div>
                )}
              </Grid>
              : <Grid item xs={7} sm={12} className={style.block}>
                <div className={classes.moduleContainer}>
                  <svg
                    className={classes.moduleIcon}
                  >
                    <rect x="0" y="0" className={classes.moduleIcon} fill="transparent" stroke="gray" strokeWidth="4" />
                    <path d="M 12 36 L 36 12" fill="transparent" stroke="gray" strokeWidth="3" />
                    alt={``}
                  </svg>
                  No Module
                </div>
              </Grid>
            }
          </React.Fragment>
          : ""}
      </Grid>
    </Grid>
  );

  return (
    <Grid container>
      <Grid item xs={12} sm={4} />
      <Hidden xsDown>
        <Grid item sm={1} className={style.dividerContainer}>
          <hr className={style.verticalDivider} />
        </Grid>
      </Hidden>
      <Hidden smUp>
        <Grid item xs={12}>
          <hr className={style.horizontalDivider} />
        </Grid>
      </Hidden>
      {/* Elite */}
      {moduleSection}
    </Grid>
  );
});
export default DataEntryModule;
