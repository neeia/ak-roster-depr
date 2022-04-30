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

  return (
    <div className={form.container}>
      <div className={form.label}>Register</div>
      <div className={form.formContainer}>
        <TextInput type="text" label="Email" onChange={setEmail} value={email} />
        <TextInput type="password" label="Password" onChange={setPassword} value={password} />
        <TextInput type="password" label="Repeat Password" placeholder="Repeat your Password" onChange={setPasswordConfirm} value={passwordConfirm} />
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
            else handleSignup(email, password, setError);
          }}
        >
          Submit
        </ButtonBase>
      </div>
    </div>
  );
};

export default RegisterForm;
