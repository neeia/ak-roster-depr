import React, { useState } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableSortLabel,
  TableBody,
  makeStyles,
} from "@material-ui/core";
import { Virtuoso } from "react-virtuoso";
import OperatorDataTableRow from "./OperatorDataTableRow";
import { Operator } from "../App";

const headCells = [
  {
    id: "owned",
    alignRight: false,
    disablePadding: false,
    enableSort: true,
    defaultDesc: true,
    label: "Owned",
  },
  {
    id: "favorite",
    alignRight: false,
    disablePadding: false,
    enableSort: true,
    defaultDesc: true,
    label: "Favorite",
  },
  {
    id: "icon",
    alignRight: false,
    disablePadding: false,
    enableSort: false,
    defaultDesc: true,
    label: "Icon",
  },
  {
    id: "rarity",
    alignRight: false,
    disablePadding: false,
    enableSort: true,
    defaultDesc: true,
    label: "Rarity",
  },
  {
    id: "name",
    alignRight: false,
    disablePadding: false,
    enableSort: true,
    defaultDesc: true,
    label: "Operator",
  },
  {
    id: "potential",
    alignRight: false,
    disablePadding: false,
    enableSort: true,
    defaultDesc: true,
    label: "Potential",
  },
  {
    id: "promotion",
    alignRight: false,
    disablePadding: false,
    enableSort: true,
    defaultDesc: true,
    label: "Promotion",
  },
  {
    id: "level",
    alignRight: false,
    disablePadding: false,
    enableSort: true,
    defaultDesc: true,
    label: "Level",
  },
  {
    id: "skillLevel",
    alignRight: false,
    disablePadding: false,
    enableSort: true,
    defaultDesc: true,
    label: "Skill Level",
  },
  {
    id: "skill1Mastery",
    alignRight: false,
    disablePadding: false,
    enableSort: false,
    defaultDesc: true,
    label: "S1",
  },
  {
    id: "skill2Mastery",
    alignRight: false,
    disablePadding: false,
    enableSort: false,
    defaultDesc: true,
    label: "S2",
  },
  {
    id: "skill3Mastery",
    alignRight: false,
    disablePadding: false,
    enableSort: false,
    defaultDesc: true,
    label: "S3",
  },
];

const useStyles = makeStyles({
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
});

function operatorComparator(
  a: Operator,
  b: Operator,
  orderBy: { key: string; descending: boolean }
) {
  var aValue = (a as any)[orderBy.key];
  var bValue = (b as any)[orderBy.key];
  if (orderBy.key === "level") {
    aValue += a.promotion * 100;
    bValue += b.promotion * 100;
  }
  const result =
    typeof aValue === "string" ? aValue.localeCompare(bValue) : aValue - bValue;
  return orderBy.descending ? -result : result;
}

function defaultSortComparator(a: Operator, b: Operator) {
  return (
    (b.favorite ? 1 : 0) - (a.favorite ? 1 : 0) ||
    (b.owned ? 1 : 0) - (a.owned ? 1 : 0) ||
    b.promotion - a.promotion ||
    b.level - a.level ||
    b.rarity - a.rarity ||
    a.name.localeCompare(b.name)
  );
}

interface Props {
  operators: Record<string, Operator>;
  onChange: (
    operatorName: string,
    property: string,
    value: number | boolean
  ) => void;
}

const RosterTable: React.FC<Props> = (props) => {
  const { operators, onChange } = props;
  const classes = useStyles();
  const [orderBy, setOrderBy] = useState({ key: "favorite", descending: true });

  const createSortHandler = (property: string) => () => {
    handleRequestSort(property);
  };

  const handleRequestSort = (property: string) => {
    const isAsc = orderBy.key === property && orderBy.descending === false;
    setOrderBy({ key: property, descending: isAsc ? true : false });
  };

  const sortedOperators = Object.values(operators).sort(
    (a, b) =>
      operatorComparator(operators[a.id], operators[b.id], orderBy) ||
      defaultSortComparator(operators[a.id], operators[b.id])
  );

  return (
    <Table>
      <TableHead>
        <TableRow>
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              align={headCell.alignRight ? "right" : "left"}
              padding={headCell.disablePadding ? "none" : "default"}
              sortDirection={
                orderBy.key === headCell.id
                  ? orderBy.descending
                    ? "desc"
                    : "asc"
                  : false
              }
            >
              {headCell.enableSort ? (
                <TableSortLabel
                  active={orderBy.key === headCell.id}
                  direction={
                    orderBy.key === headCell.id && orderBy.descending
                      ? "desc"
                      : "asc"
                  }
                  onClick={createSortHandler(headCell.id)}
                >
                  {headCell.label}
                  {orderBy.key === headCell.id ? (
                    <span className={classes.visuallyHidden}>
                      {orderBy.descending
                        ? "sorted descending"
                        : "sorted ascending"}
                    </span>
                  ) : null}
                </TableSortLabel>
              ) : (
                headCell.label
              )}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        <Virtuoso
          useWindowScroll
          data={sortedOperators}
          itemContent={(_, op) => (
            <OperatorDataTableRow
              key={op.id}
              operator={op}
              onChange={onChange}
            />
          )}
        />
      </TableBody>
    </Table>
  );
};
export default RosterTable;
