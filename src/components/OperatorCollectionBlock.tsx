import slugify from "slugify";
import { Operator } from "../App";

interface Props {
  operator: Operator;
}

function OperatorCollectionBlock(props: Props) {
  const { operator } = props;
  const potentialUrl = `https://res.cloudinary.com/samidare/image/upload/v1/arknights/potential/${operator.potential}`;
  const promotionUrl = `https://res.cloudinary.com/samidare/image/upload/v1/arknights/elite/${operator.promotion}`;

  let intermediate = operator.name;
  if (operator.promotion === 2) {
    intermediate += " elite 2";
  } else if (operator.promotion === 1 && operator.name === "Amiya") {
    intermediate += " elite 1";
  }

  const imgUrl = `https://res.cloudinary.com/samidare/image/upload/v1/arknights/operators/${slugify(
    intermediate,
    { lower: true, replacement: "-" }
  )}`;

  return (
    <div className="collection-block">
      <img src={imgUrl} alt={operator.name} />
      <div className="collection-block-data-row">
        <div className="operator-name-large">{operator.name}</div>
      </div>
      <div className="collection-block-data-row">
        <div className="collection-block-member">{"⭐".repeat(operator.rarity)}</div>
      </div>
      <div className="collection-block-data-row">
        <div className="collection-block-member">
          <img
            src={potentialUrl}
            className="collection-block-icon"
            alt={`Potential ${operator.potential} icon`}
          />
        </div>
        <div className="collection-block-member">
          <img
            src={promotionUrl}
            className="collection-block-icon"
            alt={`Elite ${operator.promotion} icon`}
          />
        </div>
        <div className="collection-block-member">
          <div className="collection-block-level-large">{operator.level}</div>
        </div>
      </div>
      {operator.skillLevel < 7 ? (
        <div className="collection-block-data-row">
          <div className="collection-block-member">Skill Level {operator.skillLevel}</div>
        </div>
      ) : (
        <div className="collection-block-data-row">
          <div className="collection-block-member">{operator.skill1Mastery}</div>
          <div className="collection-block-member">{operator.skill2Mastery}</div>
          <div className="collection-block-member">{operator.skill3Mastery}</div>
        </div>
      )}
    </div>
  );
}
export default OperatorCollectionBlock;
