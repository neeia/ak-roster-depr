import React from "react";
import useWindowSize, { Size } from "../UseWindowSize";
import { makeStyles } from "@material-ui/core";
import DataTabClassButton from "./DataTabClassButton";

const useStyles = makeStyles({
  classDisplay: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gridGap: "3px",
    margin: "0px",
    padding: "0px",
  },
  li: {
    listStyleType: "none",
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
  const width = size.width;

  return (
    <ul className={classes.classDisplay}>
      {classList
        .map((cl: string) => (
          <li className={classes.li} key={cl}>
            <DataTabClassButton
              cl={cl}
              onClick={(() => onClick(cl))}
              toggled={activeClass === cl}
            />
          </li>
        ))
      }
    </ul>
  );
});
export default DataTabClassSelector;
