import { ButtonBase } from "@material-ui/core";
import React from "react";
import { useBoxStyles } from "./BoxStyles"

interface Props {
  onClick: () => void;
  toggled?: boolean;
}

const FormButton: React.FC<Props> = React.memo((props) => {
  const classes = useBoxStyles();
  const { children, onClick, toggled } = props;

  return (
    <ButtonBase
      onClick={onClick}
      className={toggled ? classes.highlightedBorderStyle : classes.borderStyle}
    >
      {children}
    </ButtonBase>
  );
});
export default FormButton;
