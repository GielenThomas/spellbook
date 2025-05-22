import React, { createContext, useContext, useState } from "react";
import { Spell } from "../../utils/spellType.ts";
import { getSpells as fetchSpells } from "../../utils/getSpells.ts";
import { sortSpells } from "../../utils/sortSpells.ts";

interface SpellContextType {
  getSpells: () => Promise<Spell[]>;
}

const SpellContext = createContext<SpellContextType | undefined>(undefined);

export const SpellProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [spells, setSpells] = useState<Spell[]>([]);

  const getSpells = async () => {
    const fetchedSpells: Spell[] = await fetchSpells();
    const sortedSpells = sortSpells(fetchedSpells);
    setSpells(sortedSpells);
    console.log("Fetched and sorted spells:", sortedSpells);

    return sortedSpells;
  };

  return (
    <SpellContext.Provider value={{ getSpells }}>
      {children}
    </SpellContext.Provider>
  );
};

export const useSpells = (): SpellContextType => {
  const context = useContext(SpellContext);
  if (!context) {
    throw new Error("useSpells must be used within a SpellProvider");
  }
  return context;
};
