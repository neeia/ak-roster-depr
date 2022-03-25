interface Props {
  handleChange: () => void;
  text: string;
}

function Button(props: Props) {
  const { handleChange, text } = props;
  return (
    <form className="mui-form" onSubmit={(e) => { e.preventDefault(); handleChange() }}>
      <button type="submit" className="mui-btn mui-btn--raised">{text}</button>
    </form>
  );
};

export default Button;