import React, { useState } from "react";
import { Box, ButtonBase, makeStyles, TextField } from "@material-ui/core";
import clsx from "clsx";

const useStyles = makeStyles({
  label: {
    marginLeft: "6px",
    marginTop: "2px",
    height: "calc(0.7vh + 10px)",
    fontSize: "calc(0.7vh + 5px)",
  },
  textContainer: {
    position: "relative",
  },
  levelText: {
    width: "100%",
    "& .MuiInputBase-root": {
      borderRadius: "1px",
    },
  },
  levelTextInput: {
    padding: "4px",
    fontSize: "14px",
    textAlign: "start",
    background: "#212121",
    "&:focus": {
      background: "#121212",
    }
  },
  description: {
    marginLeft: "6px",
    marginTop: "2px",
    fontSize: "calc(0.7vh + 5px)",
    lineHeight: "calc(0.7vh + 7px)",
  },
  input: {
    '& input[type=number]': {
      '-moz-appearance': 'textfield'
    },
    '& input[type=number]::-webkit-outer-spin-button': {
      '-webkit-appearance': 'none',
      margin: 0
    },
    '& input[type=number]::-webkit-inner-spin-button': {
      '-webkit-appearance': 'none',
      margin: 0
    }
  },
})

interface Props {
  type?: string;
  width?: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  disabled?: boolean;
  short?: boolean;
  className?: string;
  placeholder?: string;
  description?: string;
  split?: string;
}

const TextInput = React.memo((props: Props) => {
  const { label, width = "240px", value, onChange, disabled, className, type, placeholder, description } = props;
  const classes = useStyles();

  return (
    <Box
      sx={{
        width: width,
        textAlign: "start",
      }}
    >
      <div className={classes.label}>
        {label}
      </div>
      <div className={classes.textContainer}>
        <TextField
          type={type ?? "text"}
          variant="outlined"
          size="small"
          margin="none"
          className={clsx({
            [classes.levelText]: true,
            [classes.input]: true,
            [className ?? ""]: true,
          })}
          placeholder={placeholder ?? "Type your " + label}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          inputProps={{
            className: classes.levelTextInput,
          }}
        />
      </div>
      <div className={classes.description}>
        {description ?? ""}
      </div>
    </Box>
  );
});
export default TextInput;