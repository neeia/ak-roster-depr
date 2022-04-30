import { makeStyles } from "@material-ui/core";

export const useFormStyles = makeStyles({
  container: {
    display: "grid",
    gridTemplateRows: "auto 1fr auto",
    width: "100%",
    height: "100%",
    alignItems: "start",
    justifyContent: "center",
    padding: "calc(2% + 8px)",
  },
  formContainer: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    fontSize: "calc(2vh + 4px)",
  },
  submitButton: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    width: "100%",
    height: "100%",
    border: "1px solid #808080",
    padding: "6px",
    textAlign: "center",
    backgroundColor: "#505050",
    "&:focus": {
      boxShadow: "0px 0px 0px 1px #fcf3dc inset",
      background: "#797977",
    },
    "&:disabled": {
      opacity: "0.3"
    }
  },
  footer: {
    display: "flex",
    margin: "8px 6px -4px 6px",
    justifyContent: "space-between",
  },
  errorText: {
    color: "red",
    fontSize: "12px",
    lineHeight: "13px",
    textAlign: "left",
    alignSelf: "center",
    width: "200px",
  },
  smallButton: {
    width: "40%",
    height: "100%",
    marginTop: "2px",
    padding: "2px",
    textAlign: "center",
    "&:focus": {
      boxShadow: "0px 0px 0px 1px #fcf3dc inset",
      background: "#797977",
    },
    "&:disabled": {
      opacity: "0.3"
    }
  },
  link: {
    color: "#f7d98b",
    textDecoration: "underline",
  },
})