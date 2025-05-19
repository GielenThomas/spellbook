export enum SchoolEnum {
  ABJURATION = "Abjuration",
  CONJURATION = "Conjuration",
  DIVINATION = "Divination",
  ENCHANTMENT = "Enchantment",
  EVOCATION = "Evocation",
  ILLUSION = "Illusion",
  NECROMANCY = "Necromancy",
  TRANSMUTATION = "Transmutation",
}

export enum ComponentEnum {
  VERBAL = "Verbal",
  SOMATIC = "Somatic",
  MATERIAL = "Material",
}

export interface Spell {
    id: string;
  name: string;
  level: string;
  school: SchoolEnum;
  castingTime: string;
  spellRange: string;
  duration: string;
  description: string;
  components: ComponentEnum[];
  higherLevels: string;
}