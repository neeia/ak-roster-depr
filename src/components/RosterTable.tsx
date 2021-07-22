import React, { useState } from "react";
import { Box, makeStyles, styled, TableCell } from "@material-ui/core";
import {
  Table,
  Column,
  AutoSizer,
  WindowScroller,
  TableHeaderRenderer,
  TableCellRenderer,
} from "react-virtualized";
import { defaultSortComparator, Operator } from "../App";

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
    <AutoSizer disableHeight>
      {({ width }) => (
        <WindowScroller>
          {({ height, isScrolling, onChildScroll, scrollTop }) => (
            <Table
              autoHeight
              width={width}
              height={height}
              isScrolling={isScrolling}
              onScroll={onChildScroll}
              scrollTop={scrollTop}
              rowCount={sortedOperators.length}
              rowHeight={48}
              headerHeight={48}
              rowGetter={({ index }) => sortedOperators[index]}
              rowStyle={{ display: "flex" }}
            >
              {headCells.map((headCell) => {
                const {
                  id,
                  alignRight,
                  disablePadding,
                  enableSort,
                  defaultDesc,
                  label,
                } = headCell;
                return (
                  <Column
                    key={id}
                    dataKey={id}
                    width={100}
                    label={label}
                    headerRenderer={HeaderCell}
                    cellRenderer={BodyCell}
                  />
                );
              })}
            </Table>
          )}
        </WindowScroller>
      )}
    </AutoSizer>
  );
};
export default RosterTable;

const StyledTableCell = styled(TableCell)({
  display: "flex",
  alignItems: "center",
  flex: 1,
});

const HeaderCell: TableHeaderRenderer = (props) => {
  const { columnData, dataKey, disableSort, label, sortBy, sortDirection } =
    props;
  return (
    <StyledTableCell component="div" variant="head">
      {label}
    </StyledTableCell>
  );
};

const BodyCell: TableCellRenderer = (props) => {
  const {
    cellData,
    columnData,
    columnIndex,
    dataKey,
    isScrolling,
    rowData,
    rowIndex,
  } = props;

  return (
    <StyledTableCell component="div" variant="body">
      {`${cellData}`}
    </StyledTableCell>
  );
};
