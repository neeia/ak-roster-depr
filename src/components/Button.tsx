interface Props {
  handleChange: () => void;
}


function Button(props: Props) {
  const { handleChange } = props;
  return (
    <form className="mui-form" onSubmit={(e) => { e.preventDefault(); handleChange() }}>
      <button type="submit" className="mui-btn mui-btn--raised">Store Changes</button>
    </form>
  );
};

export default Button;
