import { makeStyles } from "@material-ui/core";

export const useDataStyles = makeStyles({
  label: {
    fontSize: "16px",
    justifySelf: "center",
    alignSelf: "center",
    textAlign: "end",
    display: "inline",
    margin: "0px",
    fontWeight: "normal",
  },
  dividerContainer: {
    display: "flex",
    minWidth: "2px",
    minHeight: "2px",
  },
  verticalDivider: {
    backgroundColor: "#909090",
    width: "2px",
    height: "calc(100% - 26px)",
    alignSelf: "end",
    justifySelf: "center",
    borderWidth: "0px",
    marginTop: "0px",
    marginBottom: "0px",
  },
  verticalDividerS: {
    backgroundColor: "#909090",
    width: "2px",
    height: "70%",
    alignSelf: "center",
    justifySelf: "center",
    borderWidth: "0px",
    marginTop: "0px",
    marginBottom: "0px",
  },
  horizontalDivider: {
    backgroundColor: "#909090",
    width: "80%",
    height: "2px",
    alignSelf: "center",
    justifySelf: "center",
    borderWidth: "0px",
    marginTop: "6px",
    marginBottom: "6px",
  },
  horizontalDividerS: {
    backgroundColor: "#909090",
    width: "60%",
    height: "2px",
    alignSelf: "center",
    justifySelf: "center",
    borderWidth: "0px",
    marginTop: "0px",
    marginBottom: "0px",
  },
  block: {
    marginTop: "6px",
    marginBottom: "6px",
  },
  filterButton: {
    width: "calc(100% - 4px)",
    height: "calc(100% - 4px)",
    margin: "2px",
    fontSize: "12px",
  },
  drawer2: {
    fontSize: "14px",
    fontWeight: "normal",
  }
});