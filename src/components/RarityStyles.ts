import { makeStyles } from "@material-ui/core";

export const useRarityStyles = makeStyles({
  boxStyle: {
    border: "1px solid grey",
    borderRadius: "8px",
    padding: "6px 8px 6px 8px",
    marginLeft: "1px",
    marginRight: "1px",
    textAlign: "center",
    flexGrow: 1,
  },
  rarityOne: {
    backgroundColor: "#000000",
    color: "#121212",
    "& img.classIcon": {
      mixBlendMode: "difference"
    }
  },
  unborderStyle: {
    padding: "6px 8px 0px 8px",
    marginLeft: "1px",
    marginRight: "1px",
    textAlign: "center",
    flexGrow: 1,
  },
});
[["000000", "9f9f9f", "dce537", "00b2f6", "dbb1db", "fbae02", "f96601"]]