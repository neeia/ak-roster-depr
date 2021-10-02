import { Box, ButtonBase, makeStyles } from "@material-ui/core";
import React from "react";
import { useBoxStyles } from "./BoxStyles"

interface Props {
  children: string;
  onClick: () => void;
}

const FormButton = React.memo((props: Props) => {
  const classes = useBoxStyles();
  const { children, onClick } = props;

  return (
    <ButtonBase
      onClick={onClick}
      className={classes.borderStyle}
    >
      {children}
    </ButtonBase>
  );
});
export default FormButton;
