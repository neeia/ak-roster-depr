import path from "path";
import fs from "fs";
import operators from "./arknights-tools/data/operators.json";
import { Module, Operator } from "./arknights-tools/scripts/output-types";

interface OperatorSkill {
  skillId: string;
  iconId: string | null;
  skillName: string;
  masteries: any;
}

const subset = Object.values(operators).map((entry: Operator) => {
  // keep only these properties
  const { id, name, rarity, isCnOnly } = entry;
  const skills = entry.skills.map((skillEntry: OperatorSkill) => {
    // remove mastery data since we don't need it
    const { skillId, iconId, skillName } = skillEntry;
    return {
      skillId,
      iconId,
      skillName
    };
  });
  const modules = entry.modules === undefined ? [] : entry.modules.map((module: Module) => {
    const { moduleName, moduleId, typeName } = module;
    return {
      moduleName,
      moduleId,
      typeName
    }
  });
  return [
    id,
    { id, name, rarity, isCnOnly, skills, class: entry.class, modules }
  ];
});
const operatorObject = Object.fromEntries(subset)
const outDir = path.join(__dirname, "..", "src/data");
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, "operators.json"), JSON.stringify(operatorObject, null, 2));
