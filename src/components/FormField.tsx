import { Box, ButtonBase, makeStyles, TextField } from "@material-ui/core";
import React from "react";
import { useBoxStyles } from "./BoxStyles"

interface Props {
  onChange: (value: string) => void;
}

const FormField: React.FC<Props> = React.memo((props) => {
  const classes = useBoxStyles();
  const { onChange, children } = props;

  return (
    <TextField
      className={classes.unborderStyle}
      style={{maxWidth: 32}}
      onChange={(e) => onChange(e.target.value)}
      value={children}
    >
      { children }
    </TextField>
  );
});

export default FormField;