import slugify from "slugify";
import { OperatorProps } from "./OperatorDataTable";

function Operator(props: OperatorProps) {
  const {
    name,
    rarity,
    potential,
    promotion,
    level,
    skillLevel,
    skill1Mastery,
    skill2Mastery,
    skill3Mastery,
  } = props;
  const potentialUrl = `https://res.cloudinary.com/samidare/image/upload/v1/arknights/potential/${potential}`;
  const promotionUrl = `https://res.cloudinary.com/samidare/image/upload/v1/arknights/elite/${promotion}`;

  let operatorSlug = name;
  if (promotion === 2) {
    operatorSlug += " elite 2";
  } else if (promotion === 1 && name === "Amiya") {
    operatorSlug += " elite 1";
  }

  const imgUrl = `https://res.cloudinary.com/samidare/image/upload/v1/arknights/operators/${slugify(
    operatorSlug,
    { lower: true, replacement: "-" }
  )}`;

  return (
    <div className="collection">
      <img src={imgUrl} alt={name} />
      <div className="data-row">
        <div className="operator-name-large">{name}</div>
      </div>
      <div className="data-row">
        <div className="field">{"⭐".repeat(rarity)}</div>
      </div>
      <div className="data-row">
        <div className="field">
          <img
            src={potentialUrl}
            className="icon"
            alt={`Potential ${potential} icon`}
          />
        </div>
        <div className="field">
          <img
            src={promotionUrl}
            className="icon"
            alt={`Elite ${promotion} icon`}
          />
        </div>
        <div className="field">
          <div className="level-icon"> {level}</div>
        </div>
      </div>
      {skillLevel < 7 ? (
        <div className="data-row">
          <div className="property">Skill Level</div>
          <div className="field">{skillLevel}</div>
        </div>
      ) : (
        <div className="data-row">
          <div className="field">{skill1Mastery}</div>
          <div className="field">{skill2Mastery}</div>
          <div className="field">{skill3Mastery}</div>
        </div>
      )}
    </div>
  );
}
export default Operator;
