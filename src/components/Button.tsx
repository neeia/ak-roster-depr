import { useState } from "react";
import { FormGroup } from '@material-ui/core';

interface Props {
  handleChange: () => void;
}


function Button(props: Props) {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { handleChange } = props;
  return (
    <form className="mui-form" onSubmit={(e) => { e.preventDefault(); handleChange() }}>
      <button type="submit" className="mui-btn mui-btn--raised">Store Changes</button>
    </form>
  );
};

export default Button;
