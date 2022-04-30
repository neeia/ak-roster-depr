import { useState } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import TextInput from "./TextInput";
import { ButtonBase, Hidden, makeStyles } from "@material-ui/core";
import { useBoxStyles } from "../BoxStyles";
import { useFormStyles } from "./FormStyles";
import clsx from "clsx";
import { Grid } from "@material-ui/core";
import { useDataStyles } from "../dataTab/DataTabSharedStyles";
import { MdUpload, MdDownload, MdLogout } from "react-icons/md";

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
  row: {
    display: "grid",
    gridTemplateColumns: "3fr 3fr 2fr",
    gap: "8px",
  },
  horizontalDivider: {
    backgroundColor: "#707070",
    width: "70%",
    height: "2px",
    alignSelf: "center",
    justifySelf: "center",
    borderWidth: "0px",
    marginTop: "8px",
    marginBottom: "8px",
    gridColumn: "1 / 4",
  },
  noColor: {
    backgroundColor: "transparent",
    marginTop: "4px",
    marginBottom: "4px",
  },
  textContainer: {
    position: "relative",
  },
  textDisplay: {
    position: "absolute",
    margin: "auto",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: "90%",
    height: "80%",
    background: "#333333",
    textAlign: "center",
    verticalAlign: "middle",
    alignItems: "end",
    fontSize: "13px",
    lineHeight: "24px",
    fontFamily: "monospace",
  },
  textGood: {
    color: "#97F78B",
  },
  textBad: {
    color: "#F78B8B",
  },
})

interface Props {
  user: firebase.User;
  saveData: () => void;
  loadData: () => void;
  handleLogout: () => void;
}

function LoginRegisterForm(props: Props) {
  const { user, saveData, loadData, handleLogout } = props;
  const classes = useStyles();
  const style = useDataStyles();
  const form = useFormStyles();
  const boxStyle = useBoxStyles();

  const [username, setUsername] = useState<string>(user.displayName ?? "");
  const [actualUsername, setActualUsername] = useState<string>(user.displayName ?? "");
  const [dirty, setDirty] = useState<boolean>(false);
  const [usernameValid, setUsernameValid] = useState<string>("");
  const [syncedData, setSyncedData] = useState<boolean>(false);

  function findUser(applyUsername: (s: string) => void): void {
    firebase.database()
      .ref("phonebook/" + username)
      .get()
      .then((snapshot) => {
        if (snapshot.exists()) {
          applyUsername(snapshot.val());
        } else {
          applyUsername("");
        }
      })
  };
  function getUsername(): void {
    firebase.database()
      .ref("users/" + user.uid + "/username/")
      .get()
      .then((snapshot) => {
        if (snapshot.exists()) {
          setUsername(snapshot.val());
          setActualUsername(snapshot.val());
          user.updateProfile({ displayName: snapshot.val() })
        }
      });
  };
  function updateUsername(onComplete: () => void): void {
    try {
      firebase.database()
        .ref("phonebook/")
        .child(actualUsername)
        .remove()
    }
    catch (error) {
    }
    firebase.database()
      .ref("phonebook/" + username.toLowerCase())
      .set(user.uid);
    firebase.database()
      .ref("users/" + user.uid + "/username/")
      .set(username.toLowerCase());

    onComplete();
  };
  function isAlphaNumeric(str: string) {
    var code, i, len;

    for (i = 0, len = str.length; i < len; i++) {
      code = str.charCodeAt(i);
      if (!(code > 47 && code < 58) && // numeric (0-9)
        !(code > 64 && code < 91) && // upper alpha (A-Z)
        !(code > 96 && code < 123)) { // lower alpha (a-z)
        return false;
      }
    }
    return true;
  };


  const iconSize = 24;
  const boxBox = clsx({
    [boxStyle.boxStyle]: "true",
    [classes.displayBox]: "true",
  });
  return (
    <div className={boxBox}>
      <Grid container className={classes.grid}>
        <Grid item xs={12} sm={6}>
          <div className={form.container}>
            <div className={form.label}>Account</div>
            <div className={form.formContainer}>
              <TextInput
                type="text"
                label="Display Name"
                placeholder={"Enter a unique name"}
                onChange={(s: string) => {
                  setDirty(true);
                  setUsername(s.toLowerCase());
                }}
                value={username}
                description={actualUsername === ""
                  ? "Setting a display name lets you share your data with other people. Alphanumeric characters only."
                  : "Share your collection: https://krooster.com/u/" + actualUsername}
              />
              <div className={clsx({ [classes.horizontalDivider]: true, [classes.noColor]: true })} />
              <div className={classes.row}>
                <ButtonBase
                  className={form.submitButton}
                  onClick={() => {
                    setDirty(false);
                    if (isAlphaNumeric(username)) {
                      setUsername(username.toLowerCase())
                      findUser((s: string) => {
                        setUsernameValid(s === "" ? "Available" : "Unavailable");
                      })
                    } else {
                      setUsernameValid("Invalid");
                    }
                  }}
                >
                  Check
                </ButtonBase>
                <div className={classes.textContainer}>
                  <div className={clsx({
                    [classes.textDisplay]: true,
                    [classes.textGood]: usernameValid === "Available" || usernameValid === "Success",
                    [classes.textBad]: usernameValid !== "Available" && usernameValid !== "Success",
                  })}>
                    {usernameValid}
                  </div>
                </div>
                <ButtonBase
                  className={form.submitButton}
                  disabled={dirty || usernameValid !== "Available"}
                  onClick={() => {
                    updateUsername(() => {
                      getUsername();
                      setUsernameValid("Success");
                    })
                  }}
                >
                  Apply
                </ButtonBase>
              </div>
              <div className={classes.horizontalDivider} />
              <div className={classes.row}>
                <ButtonBase
                  className={form.submitButton}
                  onClick={() => {
                    setSyncedData(true);
                    saveData();
                  }}
                  disabled={syncedData}
                >
                  <MdUpload size={iconSize} />
                  <div>
                    Save Data
                  </div>
                </ButtonBase>
                <ButtonBase
                  className={form.submitButton}
                  onClick={() => {
                    setSyncedData(true);
                    loadData();
                  }}
                  disabled={syncedData}
                >
                  <MdDownload size={iconSize} />
                  <div>
                    Load Data
                  </div>
                </ButtonBase>
                <ButtonBase
                  className={form.submitButton}
                  onClick={handleLogout}
                >
                  <MdLogout size={iconSize} />
                  <div>
                    Log Out
                  </div>
                </ButtonBase>
              </div>
            </div>
          </div>
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
          <div className={form.container}>
            <div className={form.label}>Community</div>
            I'm working hard to bring you new features. Just sit still and stay tuned!
            <a className={form.link} href="https://forms.gle/eG1DckEKHnYyAdLF7" target="_blank" rel="noreferrer">
              Have feedback?
            </a>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default LoginRegisterForm;
