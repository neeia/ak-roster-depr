import React from "react";
import slugify from "slugify";
import { Operator } from "../App";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { makeStyles } from "@material-ui/core";
import ValidatedTextField from "./ValidatedTextField";

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
        <ValidatedTextField
          className={classes.input}
          name="potential"
          type="number"
          value={operator.potential}
          disabled={!operator.owned}
          validator={(value : string) : boolean => {
            return !operator.owned || (+value > 0 && +value <= 6)
          }}
          onChange={(e) =>
            onChange(operator.id, e.target.name, +e.target.value)
          }
        />
      </TableCell>
      <TableCell align="left">
        <ValidatedTextField
          className={classes.input}
          name="promotion"
          type="number"
          value={operator.promotion}
          disabled={!operator.owned || operator.rarity < 3}
          validator={(value : string) : boolean => {
            return !operator.owned 
            || (+value === 0)
            || (+operator.rarity >= 3 && +value === 1)
            || (+operator.rarity >= 4 && +value === 2)
          }}
          onChange={(e) =>
            onChange(operator.id, e.target.name, +e.target.value)
          }
        />
      </TableCell>
      <TableCell align="left">
        <ValidatedTextField
          className={classes.input}
          name="level"
          type="number"
          value={operator.level}
          disabled={!operator.owned}
          validator={(value : string) : boolean => {
            return !operator.owned 
            || (+value > 0
              && ((+operator.rarity < 3 && +value <= 30)
              || (+operator.rarity === 3 && +value <= [40, 55][+operator.promotion])
              || (+operator.rarity === 4 && +value <= [45, 60, 70][+operator.promotion])
              || (+operator.rarity === 5 && +value <= [50, 70, 80][+operator.promotion])
              || (+operator.rarity === 6 && +value <= [50, 80, 90][+operator.promotion])))
          }}
          onChange={(e) =>
            onChange(operator.id, e.target.name, +e.target.value)
          }
        />
      </TableCell>
      <TableCell align="left">
        <ValidatedTextField
          className={classes.input}
          name="skillLevel"
          type="number"
          value={operator.skillLevel}
          disabled={!operator.owned || operator.rarity < 3}
          validator={(value : string) : boolean => {
            return !operator.owned 
            || (+operator.rarity < 3)
            || (+value > 0 && +value <= [4, 7, 7][+operator.promotion])
          }}
          onChange={(e) =>
            onChange(operator.id, e.target.name, +e.target.value)
          }
        />
      </TableCell>
      <TableCell align="left">
        <ValidatedTextField
          className={classes.input}
          name="skill1Mastery"
          type="number"
          value={operator.skill1Mastery}
          disabled={
            operator.promotion < 2 || operator.skillLevel < 7 || !operator.owned
          }
          validator={(value : string) : boolean => {
            return !(operator.owned && operator.promotion === 2 && operator.skillLevel === 7)
            || (+value >= 0 && +value <= 3)
          }}
          onChange={(e) =>
            onChange(operator.id, e.target.name, +e.target.value)
          }
        />
      </TableCell>
      <TableCell align="left">
        <ValidatedTextField
          className={classes.input}
          name="skill2Mastery"
          type="number"
          value={operator.skill2Mastery}
          disabled={
            operator.promotion < 2 || operator.skillLevel < 7 || !operator.owned
          }
          validator={(value : string) : boolean => {
            return !(operator.owned && operator.promotion === 2 && operator.skillLevel === 7)
            || (+value >= 0 && +value <= 3)
          }}
          onChange={(e) =>
            onChange(operator.id, e.target.name, +e.target.value)
          }
        />
      </TableCell>
      <TableCell align="left">
        <ValidatedTextField
          className={classes.input}
          name="skill3Mastery"
          type="number"
          value={operator.skill3Mastery}
          disabled={
            operator.promotion < 2 || operator.skillLevel < 7 || !operator.owned || (operator.rarity < 6 && operator.name != "Amiya")
          }
          validator={(value : string) : boolean => {
            return !(operator.owned && operator.promotion === 2 && operator.skillLevel === 7 && operator.rarity === 6)
            || ((operator.rarity === 6 || operator.name === "Amiya") && (+value >= 0 && +value <= 3))
          }}
          onChange={(e) =>
            onChange(operator.id, e.target.name, +e.target.value)
          }
        />
      </TableCell>
    </TableRow>
  );
});
export default OperatorDataTableRow;
