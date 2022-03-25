export interface Operator {
  id: string;
  name: string;
  class: string;
  rarity: number;
  isCnOnly: boolean;
  elite: any;
  skillLevels: any;
  skills: OperatorSkill[];
  module?: OperatorModule
}

interface OperatorSkill {
  skillId: string;
  iconId: string | null;
  skillName: string;
}

interface OperatorModule {
  name: string;
  ingredients: any;
  category: any;
}