import { Operator } from "../App";

export const MAX_LEVEL_BY_RARITY = [[0],
  [30, 30, 30],
  [30, 30, 30],
  [40, 55, 55],
  [45, 60, 70],
  [50, 70, 80],
  [50, 80, 90]];

export const disableByProperty = (
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
}

export const errorForNumericProperty = (
  property: string,
  rarity: number,
  promotion: number,
  value: number,
) => {
  let lower = 0;
  let upper = 0;
  switch (property) {
    case "potential":
      lower = 1;
      upper = 6;
      break;
    case "promotion":
      lower = 0;
      upper = (rarity === 3 ? 1 : 2);
      break;
    case "level":
      lower = 1;
      upper = MAX_LEVEL_BY_RARITY[rarity][promotion];
      break;
    case "skillLevel":
      lower = 1;
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
  return Number.isNaN(+value) || !Number.isInteger(+value) || +value < lower || +value > upper;
};

const RosterTable = <div />;
export default RosterTable;