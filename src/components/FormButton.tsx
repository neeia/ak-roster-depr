import React from "react";
import { ButtonBase } from "@material-ui/core";
import { useBoxStyles } from "./BoxStyles"
import clsx from "clsx";

interface Props {
  onClick: () => void;
  toggled?: boolean;
  disabled?: boolean;
  className?: string;
  submit?: boolean;
}

const FormButton: React.FC<Props> = React.memo((props) => {
  const classes = useBoxStyles();
  const { children, onClick, toggled, disabled, className, submit } = props;

  return (
    <ButtonBase
      disableRipple
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
      className={clsx({
        [classes.boxStyle]: true,
        [classes.highlighted]: toggled,
        [classes.disabled]: disabled,
        [className ?? ""]: true,
      })}
      disabled={disabled}
      type={submit ? "submit" : "button"}
    >
      {children}
    </ButtonBase>
  );
});
export default FormButton;