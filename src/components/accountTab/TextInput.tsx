import React, { useState } from "react";
import { ButtonBase, makeStyles, TextField } from "@material-ui/core";
import clsx from "clsx";
import { MdRemoveRedEye } from "react-icons/md";

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
  svg: {
    position: "absolute",
    right: "6px",
    top: "0px",
    bottom: "0px",
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

  const [currentType, setCurrentType] = useState<string>(type??"");

  return (
    <div className={classes.container}>
      <div className={classes.label}>
        {label}
      </div>
      <div className={classes.textContainer}>
        <TextField
          type={currentType ?? "text"}
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
            inputMode: 'numeric',
            pattern: '[0-9]*'
          }}
        />
        {type === "password"
          ? <ButtonBase
            onClick={() => setCurrentType(currentType === "password" ? "text" : "password")}
            className={classes.svg}
          >
            <MdRemoveRedEye size={18} />
          </ButtonBase>
          : ""}
      </div>
      <div className={classes.description}>
        {description ?? ""}
      </div>
    </div>
  );
});
export default TextInput;