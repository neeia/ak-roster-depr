import React, { useState } from "react";
import { ButtonBase, makeStyles } from "@material-ui/core";
import { MdArrowLeft, MdArrowRight } from "react-icons/md";


const useStyles = makeStyles({
  container: {
    display: "flex",
  },
  label: {
    textAlign: "end",
    width: "60px",
    margin: "0px",
  },
  button: {
    alignSelf: "start",
  }
});

interface Props {
  label: string;
  open?: boolean;
  disabled?: boolean;
}

const Drawer: React.FC<Props> = React.memo((props) => {
  const classes = useStyles();
  const { children, label, open, disabled } = props;

  const [isOpen, setIsOpen] = useState(open);

  const handleFilterOpening = () => {
    setIsOpen((v) => !v);
  };


  return (
    <div className={classes.container}>
      <ButtonBase
        className={classes.button}
        onClick={handleFilterOpening}
        disabled={disabled}
      >
        <h3 className={classes.label}>
          {label}
        </h3>
        {isOpen
          ? <MdArrowRight size="24" />
          : <MdArrowLeft size="24" />}
      </ButtonBase>
      {isOpen ? children : ""}
      <ButtonBase
        className={classes.button}
        onClick={handleFilterOpening}
        disabled={disabled}
      >
        {isOpen
          ? <MdArrowLeft size="24" />
          : <MdArrowRight size="24" />}
      </ButtonBase>
    </div>
  );
});
export default Drawer;