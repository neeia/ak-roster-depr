import { makeStyles } from "@material-ui/core";

export const useBoxStyles = makeStyles({
  boxStyle: {
    border: "1px solid #808080",
    borderRadius: "8px",
    padding: "4px",
    textAlign: "center",
    flexGrow: 1,
  },
  highlighted: {
    backgroundColor: "#fdfdfd",
    color: "#121212",
    "& img.classIcon": {
      mixBlendMode: "difference"
    },
    flexGrow: 1.05,
  },
  unborderStyle: {
    marginLeft: "1px",
    marginRight: "1px",
    textAlign: "center",
    flexGrow: 1,
  },
  disabled: {
    "& img": {
      opacity: "0.3"
    },
  },
});