import slugify from "slugify";

export interface OperatorProps {
  name: string;
  potential: number;
  promotion: number;
  level?: number;
  skillLevel: number;
  skill1Mastery?: number;
  skill2Mastery?: number;
  skill3Mastery?: number;
}

function OperatorDataTable(props: OperatorProps) {
  const {
    name,
    potential,
    promotion,
    level,
    skillLevel,
    skill1Mastery,
    skill2Mastery,
    skill3Mastery,
  } = props;
  let whatever = name;

  if (promotion === 2) {
    whatever += " elite 2";
  } else if (promotion === 1 && name === "Amiya") {
    whatever += " elite 1";
  }

  const imgUrl = `https://res.cloudinary.com/samidare/image/upload/v1/arknights/operators/${slugify(
    whatever,
    { lower: true, replacement: "-" }
  )}`;

  return (
    <div className="collection">
      <div className="data-row">
        <img className="img-field" src={imgUrl} alt={name} />
        <div className="field">{name}</div>
        <div className="field">{potential}</div>
        <div className="field">{promotion}</div>
        <div className="field">{level}</div>
        <div className="field">{skillLevel}</div>
        <div className="field">{skill1Mastery}</div>
        <div className="field">{skill2Mastery}</div>
        <div className="field">{skill3Mastery}</div>
      </div>
    </div>
  );
}
export default OperatorDataTable;
