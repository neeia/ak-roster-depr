interface Props {
  onChange: (opName: string) => void;
}

function OpForm(props: Props) {
  const { onChange } = props;
  return (
    <label>Search:
      <input onChange={(e) => onChange(e.target.value)} />
    </label>
  );
}

export default OpForm;
