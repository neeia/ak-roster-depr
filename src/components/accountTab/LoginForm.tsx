import { useState } from "react";
import { ButtonBase } from "@material-ui/core";
import { useFormStyles } from "./FormStyles";
import TextInput from "./TextInput";
import firebase from "firebase/app";
import "firebase/auth";
import { errCodeToMessage } from "../AccountTab";


interface Props {
  handleLogin: (username: string, password: string, onError: (e: string) => void) => void;
}

function LoginForm(props: Props) {
  const { handleLogin } = props;
  const form = useFormStyles();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const [sentEmail, setSentEmail] = useState<boolean>(false);
  const [showPW, setShowPW] = useState<boolean>(false);

  return (
    <div className={form.container}>
      <div className={form.label}>Log In</div>
      <div className={form.formContainer}>
        <TextInput type="text" label="Email" onChange={(s: string) => {
          setSentEmail(false);
          setEmail(s);
        }} value={email} />
        <TextInput type={showPW ? "text" : "password"} label="Password" onChange={setPassword} value={password} />
        <ButtonBase
          className={form.smallButton}
          disabled={email === "" || sentEmail}
          onClick={() => {
            firebase.auth().sendPasswordResetEmail(email)
              .then(() => {
                setSentEmail(true);
              })
          }}
        >
          <div className={form.link}>
            Reset Password
          </div>
        </ButtonBase>
      </div>
      <div className={form.errorText}>
      </div>
      <div className={form.reveal}>
        <ButtonBase
          className={form.smallButton}
          onClick={() => {
            setShowPW(!showPW);
          }}
        >
          {showPW ? "Hide PW" : "Reveal PW"}
        </ButtonBase>
      </div>
      <div className={form.footer}>
        <div className={form.errorText}>
          {errCodeToMessage(error)}
        </div>
        <ButtonBase
          className={form.submitButton}
          onClick={() => {
            handleLogin(email, password, setError);
          }}
        >
          Submit
        </ButtonBase>
      </div>
    </div >
  );
};

export default LoginForm;
