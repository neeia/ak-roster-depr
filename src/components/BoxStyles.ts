import { makeStyles } from "@material-ui/core";

export const useBoxStyles = makeStyles({
  boxStyle: {
    border: "1px solid grey",
    borderRadius: "8px",
    padding: "6px 8px 6px 8px",
    marginLeft: "1px",
    marginRight: "1px",
    textAlign: "center",
    flexGrow: 1,
  },
  highlighted: {
    backgroundColor: "#fdfdfd",
    color: "#121212",
    "& img.classIcon": {
      mixBlendMode: "difference"
    }
  },
  unborderStyle: {
    marginLeft: "1px",
    marginRight: "1px",
    textAlign: "center",
    flexGrow: 1,
  },
});