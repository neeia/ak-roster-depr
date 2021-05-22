import React from "react";
import slugify from "slugify";
import { Operator } from "../App";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

interface Props {
  operator: Operator;
  onChange: (
    operatorName: string,
    property: string,
    value: number | boolean
  ) => void;
}

const OperatorDataTableRow = React.memo((props: Props) => {
  const { operator, onChange } = props;

  let intermediate = operator.name;
  if (operator.promotion === 2) {
    intermediate += " elite 2";
  } else if (operator.promotion === 1 && operator.name === "Amiya") {
    intermediate += " elite 1";
  }

  const imgUrl = `https://res.cloudinary.com/samidare/image/upload/v1/arknights/operators/${slugify(
    intermediate,
    { lower: true, replacement: "-", remove: /-/g }
  )}`;

  return (
    <TableRow key={operator.name}>
      <TableCell align="right">
        <input
          name="owned"
          type="checkbox"
          checked={operator.owned}
          onChange={(e) =>
            onChange(operator.name, e.target.name, e.target.checked)
          }
        />
      </TableCell>
      <TableCell align="right">
        <img
          style={{ opacity: operator.owned ? 1 : 0.2 }}
          className="table-icon-small"
          src={imgUrl}
          alt={operator.name}
        />
      </TableCell>
      <TableCell>{operator.rarity}</TableCell>
      <TableCell component="th" scope="row">
        {operator.name}
      </TableCell>
      <TableCell align="right">
        <input
          name="potential"
          type="number"
          value={operator.potential}
          disabled={!operator.owned}
          onChange={(e) =>
            onChange(operator.name, e.target.name, e.target.valueAsNumber)
          }
        />
      </TableCell>
      <TableCell align="right">
        <input
          name="promotion"
          type="number"
          value={operator.promotion}
          disabled={!operator.owned}
          onChange={(e) =>
            onChange(operator.name, e.target.name, e.target.valueAsNumber)
          }
        />
      </TableCell>
      <TableCell align="right">
        <input
          name="level"
          type="number"
          value={operator.level}
          disabled={!operator.owned}
          onChange={(e) =>
            onChange(operator.name, e.target.name, e.target.valueAsNumber)
          }
        />
      </TableCell>
      <TableCell align="right">
        <input
          name="skillLevel"
          type="number"
          value={operator.skillLevel}
          disabled={!operator.owned}
          onChange={(e) =>
            onChange(operator.name, e.target.name, e.target.valueAsNumber)
          }
        />
      </TableCell>
      <TableCell align="right">
        <input
          name="skill1Mastery"
          type="number"
          value={operator.skill1Mastery}
          disabled={
            operator.promotion < 2 || operator.skillLevel < 7 || !operator.owned
          }
          onChange={(e) =>
            onChange(operator.name, e.target.name, e.target.valueAsNumber)
          }
        />
      </TableCell>
      <TableCell align="right">
        <input
          name="skill2Mastery"
          type="number"
          value={operator.skill2Mastery}
          disabled={
            operator.promotion < 2 || operator.skillLevel < 7 || !operator.owned
          }
          onChange={(e) =>
            onChange(operator.name, e.target.name, e.target.valueAsNumber)
          }
        />
      </TableCell>
      <TableCell align="right">
        <input
          name="skill3Mastery"
          type="number"
          value={operator.skill3Mastery}
          disabled={
            operator.promotion < 2 || operator.skillLevel < 7 || !operator.owned
          }
          onChange={(e) =>
            onChange(operator.name, e.target.name, e.target.valueAsNumber)
          }
        />
      </TableCell>
    </TableRow>
  );
});
export default OperatorDataTableRow;
