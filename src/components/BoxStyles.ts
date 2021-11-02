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
    color: "#121212"
  },
  unborderStyle: {
    padding: "6px 8px 0px 8px",
    marginLeft: "1px",
    marginRight: "1px",
    textAlign: "center",
    flexGrow: 1,
  },
});