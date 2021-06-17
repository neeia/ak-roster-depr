interface Props {
  onChange: (opName: string) => void;
}

function OpForm(props: Props) {
  const change = props;
  return (
    <>
      {<label>Search:
        <input onChange={(e) => change.onChange(e.target.value)} />
      </label>}
    </>
  );
};

export default OpForm;
