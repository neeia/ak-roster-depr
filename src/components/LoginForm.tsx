import { useState } from "react";
import { FormGroup } from '@material-ui/core';

interface Props {
  handleLogin: (username: string, password: string) => void;
}


function LoginForm(props: Props) {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { handleLogin } = props;
  return (
    <FormGroup>
      <form className="mui-form" onSubmit={() => handleLogin(username, password)}>
        <label>Log In</label>
        <div className="mui-textfield">
          <input type="text" placeholder="Email" onChange={(e) => setUsername(e.target.value)} value={username} />
        </div>
        <div className="mui-textfield">
          <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password} />
        </div>
        <button type="submit" className="mui-btn mui-btn--raised">Submit</button>
      </form>
    </FormGroup>
  );
};

export default LoginForm;
