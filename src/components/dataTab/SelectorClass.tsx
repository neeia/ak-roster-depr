import React from "react";
import { Grid, makeStyles } from "@material-ui/core";
import FormButton from "../FormButton";
import { useDataStyles } from "./DataTabSharedStyles";
import Drawer from "../Drawer";
import { classList } from "../DataTab";

const useStyles = makeStyles({
  classIcon: {
    width: "32px",
    height: "32px",
    margin: "2px",
  },
  labelContainer: {
    display: "grid",
    gridTemplateColumns: "1fr auto",
    alignItems: "center",
  },
  h4: {
    display: "inline",
    fontSize: "14px",
    margin: "0px",
    fontWeight: "normal",
    justifySelf: "center",
    alignSelf: "center",
    textAlign: "end",
  }
});

interface Props {
  onClick: (cl: string) => void;
  activeClasses: string[];
}

const SelectorClass = React.memo((props: Props) => {
  const { onClick, activeClasses } = props;
  const classes = useStyles();
  const style = useDataStyles();

  const classButton = (cl: string) =>
    <FormButton
      key={cl}
      className={style.filterButton}
      onClick={() => onClick(cl)}
      toggled={activeClasses.includes(cl)}
    >
      <img
        className={classes.classIcon}
        src={`/img/classes/class_${cl}.png`}
        alt={""}
      />
    </FormButton>

  return (
    <Drawer label={"Class"} open={true} labelClass={style.drawer2}>
      <Grid container>
        <Grid container item xs={12} sm={6}>
          {classList.slice(0, 4)
            .map((cl: string) => (
              <Grid item xs={3} key={cl}>
                {classButton(cl)}
              </Grid>
            ))
          }
        </Grid>
        <Grid container item xs={12} sm={6}>
          {classList.slice(4)
            .map((cl: string) => (
              <Grid item xs={3} key={cl}>
                {classButton(cl)}
              </Grid>
            ))
          }
        </Grid>
      </Grid>
    </Drawer>
  );
});
export default SelectorClass;
