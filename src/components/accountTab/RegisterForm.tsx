import { useState } from "react";
import { ButtonBase } from "@material-ui/core";
import { useFormStyles } from "./FormStyles";
import TextInput from "./TextInput";
import { errCodeToMessage } from "../AccountTab";

interface Props {
  handleSignup: (email: string, password: string, onError: (e: string) => void) => void;
}

function RegisterForm(props: Props) {
  const { handleSignup } = props;
  const form = useFormStyles();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [showPW, setShowPW] = useState<boolean>(false);

  return (
    <div className={form.container}>
      <div className={form.label}>Register</div>
      <div className={form.formContainer}>
        <TextInput type="text" label="Email" onChange={setEmail} value={email} />
        <TextInput type={showPW ? "text" : "password"} label="Password" onChange={setPassword} value={password} />
        <TextInput type={showPW ? "text" : "password"} label="Repeat Password" placeholder="Repeat your Password" onChange={setPasswordConfirm} value={passwordConfirm} />
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
            if (password !== passwordConfirm) {
              setError("Passwords don't match.");
            }
            else handleSignup(email.trim(), password, setError);
          }}
        >
          Submit
        </ButtonBase>
      </div>
    </div>
  );
};

export default RegisterForm;
