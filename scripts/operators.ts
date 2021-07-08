import path from "path";
import fs from "fs";
import operators from "./arknights-tools/src/data/operators.json";
import { Operator } from "./arknights-tools/src/types";

const subset = operators.map((entry: Operator & { id: string }) => {
  // keep only these properties
  const { id, name, rarity, isCnOnly } = entry;
  const skills = entry.skills.map((skillEntry) => {
    // remove mastery data since we don't need it
    const { skillId, iconId, skillName } = skillEntry;
    return {
      skillId,
      iconId,
      skillName
    };
  });
  return [
    id,
    { id, name, rarity, isCnOnly, skills, class: entry.class }
  ];
});
const operatorObject = Object.fromEntries(subset)
const outDir = path.join(__dirname, "..", "src/data");
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, "operators.json"), JSON.stringify(operatorObject, null, 2));
