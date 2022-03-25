import React from "react";
import { ButtonBase } from "@material-ui/core";
import { useBoxStyles } from "./BoxStyles"
import clsx from "clsx";

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