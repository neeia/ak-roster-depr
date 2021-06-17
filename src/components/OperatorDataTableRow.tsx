import React from "react";
import slugify from "slugify";
import { Operator } from "../App";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  input: {
    width: "48px",
    backgroundColor: "#555555",
    color: "white",
  },
});

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
  const classes = useStyles();

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
    <TableRow key={operator.id}>
      <TableCell align="left">
        <input
          className={classes.input}
          name="owned"
          type="checkbox"
          checked={operator.owned}
          onChange={(e) =>
            onChange(operator.id, e.target.name, e.target.checked)
          }
        />
      </TableCell>
      <TableCell align="left">
        <input
          className={classes.input}
          name="favorite"
          type="checkbox"
          checked={operator.favorite}
          onChange={(e) =>
            onChange(operator.id, e.target.name, e.target.checked)
          }
        />
      </TableCell>
      <TableCell align="left">
        <img
          style={{ opacity: operator.owned ? 1 : 0.2 }}
          width={48}
          height={48}
          src={imgUrl}
          alt={operator.name}
        />
      </TableCell>
      <TableCell>{operator.rarity}</TableCell>
      <TableCell component="th" scope="row">
        {operator.name}
      </TableCell>
      <TableCell align="left">
        <input
          className={classes.input}
          name="potential"
          type="number"
          value={operator.potential}
          disabled={!operator.owned}
          onChange={(e) =>
            onChange(operator.id, e.target.name, e.target.valueAsNumber)
          }
        />
      </TableCell>
      <TableCell align="left">
        <input
          className={classes.input}
          name="promotion"
          type="number"
          value={operator.promotion}
          disabled={!operator.owned}
          onChange={(e) =>
            onChange(operator.id, e.target.name, e.target.valueAsNumber)
          }
        />
      </TableCell>
      <TableCell align="left">
        <input
          className={classes.input}
          name="level"
          type="number"
          value={operator.level}
          disabled={!operator.owned}
          onChange={(e) =>
            onChange(operator.id, e.target.name, e.target.valueAsNumber)
          }
        />
      </TableCell>
      <TableCell align="left">
        <input
          className={classes.input}
          name="skillLevel"
          type="number"
          value={operator.skillLevel}
          disabled={!operator.owned}
          onChange={(e) =>
            onChange(operator.id, e.target.name, e.target.valueAsNumber)
          }
        />
      </TableCell>
      <TableCell align="left">
        <input
          className={classes.input}
          name="skill1Mastery"
          type="number"
          value={operator.skill1Mastery}
          disabled={
            operator.promotion < 2 || operator.skillLevel < 7 || !operator.owned
          }
          onChange={(e) =>
            onChange(operator.id, e.target.name, e.target.valueAsNumber)
          }
        />
      </TableCell>
      <TableCell align="left">
        <input
          className={classes.input}
          name="skill2Mastery"
          type="number"
          value={operator.skill2Mastery}
          disabled={
            operator.promotion < 2 || operator.skillLevel < 7 || !operator.owned
          }
          onChange={(e) =>
            onChange(operator.id, e.target.name, e.target.valueAsNumber)
          }
        />
      </TableCell>
      <TableCell align="left">
        <input
          className={classes.input}
          name="skill3Mastery"
          type="number"
          value={operator.skill3Mastery}
          disabled={
            operator.promotion < 2 || operator.skillLevel < 7 || !operator.owned
          }
          onChange={(e) =>
            onChange(operator.id, e.target.name, e.target.valueAsNumber)
          }
        />
      </TableCell>
    </TableRow>
  );
});
export default OperatorDataTableRow;
