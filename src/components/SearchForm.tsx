import { useState } from "react";
import { FormGroup } from '@material-ui/core';

interface Props {
  handleSubmit: (username: string) => boolean;
}

function SearchForm(props: Props) {
  const [username, setUsername] = useState<string>("");
  const { handleSubmit } = props;
  return (
    <FormGroup>
    <form className="mui-form" onSubmit={(e) => 
      { e.preventDefault(); handleSubmit(username)}}>
        <label>Search for a user</label>
        <div className="mui-textfield">
          <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} value={username} />
        </div>
        <button type="submit" className="mui-btn mui-btn--raised">Search</button>
      </form>
    </FormGroup>
  );
};

export default SearchForm;
