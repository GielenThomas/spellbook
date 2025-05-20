import { Spell } from './spellType.ts';

export const sortSpells = (spells: Spell[]): Spell[] => {
  return spells.sort((a, b) => {
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return 0;
  });
}