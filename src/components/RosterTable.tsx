import React, { useState } from "react";
import slugify from "slugify";
import { styled, TableCell } from "@material-ui/core";
import {
  Table,
  Column,
  AutoSizer,
  WindowScroller,
  TableHeaderRenderer,
  TableCellRenderer,
} from "react-virtualized";
import { defaultSortComparator, Operator } from "../App";
import ValidatedTextField from "./ValidatedTextField";

const MAX_LEVEL_BY_RARITY = [[0], [30], [30], [40, 55], [45, 60, 70], [50, 70, 80], [50, 80, 90]];

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
  const [orderBy, setOrderBy] = useState({ key: "favorite", descending: true });

  const createSortHandler = (property: string) => () => {
    handleRequestSort(property);
  };

  const handleRequestSort = (property: string) => {
    const isAsc = orderBy.key === property && orderBy.descending === false;
    setOrderBy({ key: property, descending: isAsc ? true : false });
  };

  const sortedOperators = Object.values(operators).sort(
    (a: Operator, b: Operator) =>
      operatorComparator(operators[a.id], operators[b.id], orderBy) ||
      defaultSortComparator(operators[a.id], operators[b.id])
  );

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

    let innerNode = undefined;
    switch (dataKey) {
      case "icon":
        innerNode = 
          <img
            style={{ opacity: rowData.owned ? 1 : 0.2 }}
            width={48}
            height={48}
            src={imageUrlByOp(rowData.name, rowData.promotion)}
            alt={rowData.name}
          />;
        break;
      case "name":
      case "rarity":
        innerNode = cellData;
        break;
      case "favorite":
      case "owned":
        innerNode = 
          <input 
            type="checkbox" 
            name={dataKey} checked={cellData} 
            onChange={(e) =>
              onChange(rowData.id, dataKey, e.target.checked)
            }
          />;
        break;
      case "potential":
      case "promotion":
      case "level":
      case "skillLevel":
      case "skill1Mastery":
      case "skill2Mastery":
      case "skill3Mastery":
        innerNode = (
          <ValidatedTextField
            name={dataKey}
            type="number"
            value={cellData}
            disabled={
              disableByProperty(rowData, dataKey)
            }
            validator={
              validatorForNumericProperty(dataKey, rowData.rarity, rowData.promotion)
            }
            onChange={(e) =>
              onChange(rowData.id, e.target.name, +e.target.value)
            }
          />
        );
        break;
      default:
        throw new Error(`Unknown operator property: ${dataKey}`);
    }

    return (
      <StyledTableCell component="div" variant="body">
        {innerNode}
      </StyledTableCell>
    );
  };

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

const imageUrlByOp = (opName: string, promotion: number) => {
  let intermediate = opName;
  if (promotion === 2) {
    intermediate += " elite 2";
  } else if (promotion === 1 && opName === "Amiya") {
    intermediate += " elite 1";
  }
  return `https://res.cloudinary.com/samidare/image/upload/v1/arknights/operators/${slugify(
    intermediate,
    { lower: true, replacement: "-", remove: /-/g }
  )}`;
}

const disableByProperty = (
  op : Operator,
  property: string,
) => {
  if (!op.owned) { return true; }
  switch (property) {
    case "potential":
    case "level":
      return false;
    case "promotion":
    case "skillLevel":
      return op.rarity < 3;
    case "skill1Mastery": 
    case "skill2Mastery":
      return op.promotion < 2 || op.skillLevel < 7;
    case "skill3Mastery":
      return op.promotion < 2 || op.skillLevel < 7 || (op.rarity < 6 && op.name !== "Amiya");
    default:
      throw new Error(`Unknown numeric property: ${property}`);
  }
};

const validatorForNumericProperty = (
  property: string,
  rarity: number,
  promotion: number
) => {
  let upper = 0;
  switch (property) {
    case "potential":
      upper = 6;
      break;
    case "promotion":
      upper = (rarity === 3 ? 1 : 2)
      break;
    case "level":
      upper = MAX_LEVEL_BY_RARITY[rarity][promotion];
      break;
    case "skillLevel":
      upper = (promotion === 0 ? 4 : 7);
      break;
    case "skill1Mastery":
    case "skill2Mastery":
    case "skill3Mastery":
      upper = 3;
      break;
    default:
      throw new Error(`Unknown numeric property: ${property}`);
  }
  return (value: string) =>
    !Number.isNaN(+value) && 0 <= +value && +value <= upper;
};