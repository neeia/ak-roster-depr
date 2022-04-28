import React from "react";
import { MOBILE_BREAKPOINT, TABLET_BREAKPOINT } from "../../App";
import { makeStyles } from "@material-ui/core";
import FormButton from "../FormButton";

const useStyles = makeStyles({
  classSelectorButtonArea: {
    display: "flex",
    width: "46px",
    justifyContent: "center",
    alignContent: "center",
    margin: "2px",
  },
  classButton: {
    display: "flex",
  },
  classIcon: {
    width: "32px",
    height: "32px",
    margin: "2px",
  },
  classIconMobile: {
    width: "16px",
    height: "16px",
    margin: "2px",
  },
  smallText: {
    fontSize: "14px",
  },
});

interface Props {
  cl: string;
  onClick: () => void;
  toggled: boolean;
}

const DataTabClassButton = React.memo((props: Props) => {
  const classes = useStyles();
  const { cl, onClick, toggled } = props;

  return (
    <FormButton
      key={cl}
      className={classes.classSelectorButtonArea}
      onClick={onClick}
      toggled={toggled}
    >
      <img
        className={classes.classIcon}
        src={`https://res.cloudinary.com/samidare/image/upload/f_auto,h_128,w_128/v1/arknights/classes/${cl}`}
        alt={""}
      />
    </FormButton>
    );
});
export default DataTabClassButton;
