import React from "react";
import { UIMode } from "../../App";
import { makeStyles } from "@material-ui/core";
import FormButton from "../FormButton";

const useStyles = makeStyles({
  classSelectorButtonArea: {
    width: "72px",
    height: "60px",
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    margin: "2px",
  },
  classButton: {
    display: "flex",
    flexDirection: "column",
  },
  classIcon: {
    width: "32px",
    height: "32px",
    marginBottom: "4px",
  },
  smallText: {
    fontSize: "12px",
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
    <div className={classes.classSelectorButtonArea}>
      <FormButton
        key={cl}
        className={classes.classButton}
        onClick={onClick}
        toggled={toggled}
      >
        <img
          className={classes.classIcon}
          src={`https://res.cloudinary.com/samidare/image/upload/f_auto,h_32,w_32/v1/arknights/classes/${cl}`}
          alt={""}
        />
        <div className={classes.smallText}>
          {cl}
        </div>
      </FormButton>
    </div>
    );
});
export default DataTabClassButton;
