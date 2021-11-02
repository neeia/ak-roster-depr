import { ButtonBase } from "@material-ui/core";
import clsx from "clsx";
import React from "react";
import { useBoxStyles } from "./BoxStyles"

interface Props {
  onClick: () => void;
  toggled?: boolean;
}

const FormButton: React.FC<Props> = React.memo((props) => {
  const classes = useBoxStyles();
  const { children, onClick, toggled } = props;

  const buttonStyle = clsx({
    [classes.boxStyle]: "true",
    [classes.highlighted]: toggled
  })

  return (
    <ButtonBase
      onClick={onClick}
      className={buttonStyle}
    >
      {children}
    </ButtonBase>
  );
});
export default FormButton;
