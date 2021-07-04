import { useState } from "react";
import { FormGroup } from '@material-ui/core';

interface Props {
  handleSignup: (username: string, email: string, password: string) => boolean;
}

function RegisterForm(props: Props) {
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");
  const { handleSignup } = props;
  return (
    <FormGroup>
    <form className="mui-form" onSubmit={(e) => 
      { e.preventDefault(); handleSignup(email, username, password)}}>
        <label>Register</label>
        <div className="mui-textfield">
          <input type="text" placeholder="Email (Kept Private)" onChange={(e) => setEmail(e.target.value)} value={email} />
        </div>
        <div className="mui-textfield">
          <input type="text" placeholder="Public Username" onChange={(e) => setUsername(e.target.value)} value={username} />
        </div>
        <div className="mui-textfield">
          <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password} />
        </div>
        <div className="mui-textfield">
          <input type="password" placeholder="Re-enter Password" onChange={(e) => setPasswordConfirm(e.target.value)} 
          value={passwordConfirm} />
        </div>
        {(password !== passwordConfirm ? <div>Passwords do not match.</div> : ""
        )}
        <button type="submit" className="mui-btn mui-btn--raised">Submit</button>
      </form>
    </FormGroup>
  );
};

export default RegisterForm;
