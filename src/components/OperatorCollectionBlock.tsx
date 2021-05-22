import { makeStyles } from "@material-ui/core";
import React from "react";
import slugify from "slugify";
import { Operator } from "../App";

const useStyles = makeStyles({
  block: {},
  row: {
    justifyContent: "space-between",
  },
  item: {
    display: "inline-block",
  },
  operatorName: {},
  level: {
    fontSize: "48px",
    textAlign: "center",
  },
});

interface Props {
  operator: Operator;
}

const OperatorCollectionBlock = React.memo((props: Props) => {
  const { operator } = props;
  const classes = useStyles();
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
    <div className={classes.block}>
      <img src={imgUrl} alt={operator.name} />
      <div className={classes.row}>
        <div className={classes.operatorName}>{operator.name}</div>
      </div>
      <div className={classes.row}>
        <div className={classes.item}>{"⭐".repeat(operator.rarity)}</div>
      </div>
      <div className={classes.row}>
        <div className={classes.item}>
          <img
            src={potentialUrl}
            width={60}
            height={60}
            alt={`Potential ${operator.potential} icon`}
          />
        </div>
        <div className={classes.item}>
          <img
            src={promotionUrl}
            width={60}
            height={60}
            alt={`Elite ${operator.promotion} icon`}
          />
        </div>
        <div className={classes.item}>
          <div className={classes.level}>{operator.level}</div>
        </div>
      </div>
      {operator.skillLevel < 7 ? (
        <div className={classes.row}>
          <div className={classes.item}>Skill Level {operator.skillLevel}</div>
        </div>
      ) : (
        <div className={classes.row}>
          <div className={classes.item}>{operator.skill1Mastery}</div>
          <div className={classes.item}>{operator.skill2Mastery}</div>
          <div className={classes.item}>{operator.skill3Mastery}</div>
        </div>
      )}
    </div>
  );
});
export default OperatorCollectionBlock;
