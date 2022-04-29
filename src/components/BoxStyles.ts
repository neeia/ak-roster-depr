import { makeStyles } from "@material-ui/core";

export const useBoxStyles = makeStyles({
  boxStyle: {
    border: "1px solid #808080",
    borderRadius: "8px",
    padding: "4px",
    textAlign: "center",
    flexGrow: 1,
    backgroundColor: "#40403E",
    "&:focus": {
      boxShadow: "0px 0px 0px 1px #fcf3dc inset",
      background: "#505050",
    }
  },
  highlighted: {
    border: "1px solid #f7d98b",
    boxShadow: "0px 0px 0px 1px #f7d98b inset",
    "& img.classIcon": {
      mixBlendMode: "difference"
    },
  },
  unborderStyle: {
    marginLeft: "1px",
    marginRight: "1px",
    textAlign: "center",
    flexGrow: 1,
  },
  disabled: {
    opacity: "0.3"
  },
});