import React, { useState } from "react";
import { ButtonBase, Hidden, makeStyles } from "@material-ui/core";
import { MdArrowLeft, MdArrowRight } from "react-icons/md";
import { Grid } from "@mui/material";
import clsx from "clsx";


const useStyles = makeStyles({
  container: {
    display: "grid",
    gridTemplateColumns: "auto 1fr auto",
    alignItems: "start",
    margin: "2px",
  },
  label: {
    textAlign: "end",
    width: "60px",
    margin: "0px",
  },
  button: {
    display: "flex",
    width: "100%",
    justifyContent: "end",
  },
  buttonRight: {
    display: "flex",
    justifyContent: "start",
  }
});

interface Props {
  label: string;
  open?: boolean;
  disabled?: boolean;
  labelClass?: string;
}

const Drawer: React.FC<Props> = React.memo((props) => {
  const classes = useStyles();
  const { children, label, open, disabled, labelClass } = props;

  const [isOpen, setIsOpen] = useState(open);

  const handleFilterOpening = () => {
    setIsOpen((v) => !v);
  };


  return (
    <Grid container>
      <Grid item xs={3} sm={2}>
        <ButtonBase
          className={classes.button}
          onClick={handleFilterOpening}
          disabled={disabled}
        >
          <h3 className={clsx({ [classes.label]: true, [labelClass ?? ""]: true })}>
            {label}
          </h3>
          {isOpen
            ? <MdArrowRight size="24" />
            : <MdArrowLeft size="24" />}
        </ButtonBase>
      </Grid>
      {isOpen
        ? <Grid item xs={12} sm={9}>
          {children}
        </Grid>
        : ""}
      <Grid item xs={1}>
        <div className={classes.buttonRight}>
          <ButtonBase
            onClick={handleFilterOpening}
            disabled={disabled}
          >
            {isOpen
              ? <Hidden xsDown><MdArrowLeft size="24" /></Hidden>
              : <Hidden xsDown><MdArrowRight size="24" /></Hidden>}
          </ButtonBase>
        </div>
      </Grid>
    </Grid >
  );
});
export default Drawer;