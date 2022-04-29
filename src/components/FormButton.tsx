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

  return (
    <ButtonBase
      disableRipple
      onClick={onClick}
      className={clsx({
        [classes.boxStyle]: true,
        [classes.highlighted]: toggled,
        [classes.disabled]: disabled,
        [className ?? ""]: true,
      })}
      disabled={disabled}
    >
      {children}
    </ButtonBase>
  );
});
export default FormButton;