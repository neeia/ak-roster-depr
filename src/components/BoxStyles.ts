import { makeStyles } from "@material-ui/core";

export const useBoxStyles = makeStyles({
  boxStyle: {
    border: "1px solid #808080",
    borderRadius: "8px",
    padding: "4px",
    textAlign: "center",
    flexGrow: 1,
    "&:focus": {
      boxShadow: "0px 0px 0px 1px #fcf3dc inset",
      background: "#505050"
    }
  },
  highlighted: {
    border: "2px solid #f7d98b",
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
    opacity: "0.3"
  },
});