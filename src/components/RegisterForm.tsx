import { useState } from "react";
import { FormGroup } from '@material-ui/core';

interface Props {
  handleSignup: (username: string, password: string, passwordConfirm: string) => void;
}


function RegisterForm(props: Props) {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");
  const { handleSignup } = props;
  return (
    <FormGroup>
      <form className="mui-form" onSubmit={() => handleSignup(username, password, passwordConfirm)}>
        <label>Register</label>
        <div className="mui-textfield">
          <input type="text" placeholder="Email" onChange={(e) => setUsername(e.target.value)} value={username} />
        </div>
        <div className="mui-textfield">
          <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password} />
        </div>
        <div className="mui-textfield">
          <input type="password" placeholder="Password" onChange={(e) => setPasswordConfirm(e.target.value)} value={passwordConfirm} />
        </div>
        <button type="submit" className="mui-btn mui-btn--raised">Submit</button>
      </form>
    </FormGroup>
  );
};

export default RegisterForm;
