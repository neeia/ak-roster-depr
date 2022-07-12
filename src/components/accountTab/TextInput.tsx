import React from "react";
import { makeStyles, TextField } from "@material-ui/core";
import clsx from "clsx";

const useStyles = makeStyles({
  container: {
    width: "270px",
    textAlign: "start",
  },
  label: {
    marginLeft: "6px",
    marginTop: "2px",
    height: "calc(0.7vh + 10px)",
    fontSize: "calc(0.7vh + 6px)",
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
    fontSize: "16px",
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
})

interface Props {
  type?: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  disabled?: boolean;
  className?: string;
  placeholder?: string;
  description?: string;
}

const TextInput = React.memo((props: Props) => {
  const { label, value, onChange, disabled, className, type, placeholder, description } = props;
  const classes = useStyles();

  return (
    <div className={classes.container}>
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
    </div>
  );
});
export default TextInput;