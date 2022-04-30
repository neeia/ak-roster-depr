import { Hidden, makeStyles } from "@material-ui/core";
import { useBoxStyles } from "../BoxStyles";
import clsx from "clsx";
import { Grid } from "@material-ui/core";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { useDataStyles } from "../dataTab/DataTabSharedStyles";

const useStyles = makeStyles({
  displayBox: {
    display: "flex",
    flexDirection: "column",
    padding: "8px",
    boxShadow: "2px 2px 8px rgb(0 0 0 / 30%)",
    alignItems: "center",
    width: "100%",
    maxWidth: "640px",
  },
  grid: {
    textAlign: "center"
  },
  dividerContainer: {
    display: "flex",
    margin: "-1px",
  },
})

interface Props {
  handleLogin: (email: string, password: string, onError: (e: string) => void) => void;
  handleSignup: (email: string, password: string, onError: (e: string) => void) => void;
}

function LoginRegisterForm(props: Props) {
  const { handleLogin, handleSignup } = props;
  const classes = useStyles();
  const style = useDataStyles();
  const boxStyle = useBoxStyles();

  const boxBox = clsx({
    [boxStyle.boxStyle]: "true",
    [classes.displayBox]: "true",
  });
  return (
    <div className={boxBox}>
      <Grid container className={classes.grid}>
        <Grid item xs={12} sm={6}>
          <LoginForm handleLogin={handleLogin} />
        </Grid>
        <Hidden xsDown>
          <div className={classes.dividerContainer}>
            <hr className={style.verticalDividerS} />
          </div>
        </Hidden>
        <Hidden smUp>
          <Grid item xs={12}>
            <hr className={style.horizontalDivider} />
          </Grid>
        </Hidden>
        <Grid item xs={12} sm={6}>
          <RegisterForm handleSignup={handleSignup} />
        </Grid>
      </Grid>
    </div>
  );
};

export default LoginRegisterForm;
