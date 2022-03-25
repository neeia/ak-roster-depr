import { makeStyles } from "@material-ui/core";
import React from "react";
import { Operator, MOBILE_BREAKPOINT, TABLET_BREAKPOINT } from "../App";
import useWindowSize, { Size } from "./UseWindowSize";
import clsx from "clsx";
import DataTabClassButton from "./DataTabClassButton";

const useStyles = makeStyles({
  classDisplay: {
    display: "flex",
    justifyContent: "center",
  },
  classDisplayTablet: {
    display: "flex",
    justifyContent: "center",
  },
  classDisplayMobile: {
    display: "grid",
    gridTemplateColumns: "auto",
    gridTemplateRows: "repeat(8, 1fr)",
    height: "1vh",
    marginRight: "12px",
  },
  marginBottom: {
    marginBottom: "16px",
  },
});

interface Props {
  classList: string[];
  onClick: (cl: string) => void;
  activeClass: string;
}

const DataTabClassSelector = React.memo((props: Props) => {
  const classes = useStyles();
  const { classList, onClick, activeClass } = props;

  const size: Size = useWindowSize();
  const width = size.width === undefined ? 1920 : size.width;

  const classDisplay = clsx({
    [classes.classDisplay]: width > TABLET_BREAKPOINT,
    [classes.classDisplayTablet]: width <= TABLET_BREAKPOINT,
    [classes.classDisplayMobile]: width <= MOBILE_BREAKPOINT,
    [classes.marginBottom]: "true"
  })

  return (
    <div className={classDisplay}>
      {classList
        .map((cl: string) => (
          <DataTabClassButton
            cl={cl}
            onClick={(() => onClick(cl))}
            toggled={activeClass === cl}
          />
        ))}
    </div>
  );
});
export default DataTabClassSelector;
