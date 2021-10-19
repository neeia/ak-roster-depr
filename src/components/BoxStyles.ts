import { makeStyles } from "@material-ui/core";

export const useBoxStyles = makeStyles({
  borderStyle: {
    border: "1px solid grey",
    borderRadius: "8px",
    paddingLeft: "12px",
    paddingRight: "12px",
    paddingTop: "4px",
    paddingBottom: "4px",
    marginLeft: "1px",
    marginRight: "1px",
    textAlign: "center",
    flexGrow: 1,
  },
  highlightedBorderStyle: {
    border: "1px solid grey",
    borderRadius: "8px",
    paddingLeft: "12px",
    paddingRight: "12px",
    paddingTop: "4px",
    paddingBottom: "4px",
    marginLeft: "1px",
    marginRight: "1px",
    textAlign: "center",
    flexGrow: 1,
    // backgroundColor: "#ff88dd",
    backgroundColor: "#fdfdfd",
    color: "#121212"
  },
  unborderStyle: {
    paddingLeft: "12px",
    paddingRight: "12px",
    paddingTop: "4px",
    // paddingBottom: "4px",
    marginLeft: "1px",
    marginRight: "1px",
    textAlign: "center",
    flexGrow: 1,
  },
});