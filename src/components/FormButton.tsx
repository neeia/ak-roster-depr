import { ButtonBase } from "@material-ui/core";
import clsx from "clsx";
import React from "react";
import { useBoxStyles } from "./BoxStyles"

interface Props {
  onClick: () => void;
  toggled?: boolean;
  disabled?: boolean;
  className?: string;
}

const FormButton: React.FC<Props> = React.memo((props) => {
  const classes = useBoxStyles();
  const { children, onClick, toggled, disabled, className } = props;

  const buttonStyle = clsx({
    [classes.boxStyle]: true,
    [classes.highlighted]: toggled,
    [classes.disabled]: disabled,
    [className ?? ""]: true,
  })

  return (
    <ButtonBase
      onClick={onClick}
      className={buttonStyle}
      disabled={disabled}
    >
      {children}
    </ButtonBase>
  );
});
export default FormButton;