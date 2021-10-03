import { Box, ButtonBase, makeStyles, TextField } from "@material-ui/core";
import React from "react";
import { useBoxStyles } from "./BoxStyles"

interface Props {
  children: number;
}

const FormField = React.memo((props: Props) => {
  const classes = useBoxStyles();
  const { children } = props;

  return (
    <TextField
      className={classes.borderStyle}
      style={{maxWidth: 40}}
    >
      { children }
    </TextField>
  );
});
export default FormField;
