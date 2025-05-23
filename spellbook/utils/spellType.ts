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

export enum SpellLevelEnum {
  CANTRIP = "Cantrip",
  FIRST = "1st level",
  SECOND = "2nd level",
  THIRD = "3rd level",
  FOURTH = "4th level",
  FIFTH = "5th level",
  SIXTH = "6th level",
  SEVENTH = "7th level",
  EIGHTH = "8th level",
  NINTH = "9th  level",
}

export interface Spell {
    id: string;
  name: string;
  level: SpellLevelEnum;
  school: SchoolEnum;
  castingTime: string;
  spellRange: string;
  duration: string;
  description: string;
  components: ComponentEnum[];
  higherLevels: string;
  isHomebrew: boolean;
}