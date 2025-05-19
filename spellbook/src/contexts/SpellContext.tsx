import React, { createContext, useContext, useState } from "react";
import { Spell } from "../../utils/spellType.ts";
import { getSpells } from "../../utils/getSpells.ts";

interface SpellContextType {
  spells: Spell[];
  setOfficialSpells: (spells: Spell[]) => void;
}

const SpellContext = createContext<SpellContextType | undefined>(undefined);

export const SpellProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [spells, setSpells] = useState<Spell[]>([]);

  const setOfficialSpells = async () => {
    const fetchedSpells: Spell[] = await getSpells();
    setSpells(fetchedSpells);
  };

  return (
    <SpellContext.Provider value={{ spells, setOfficialSpells }}>
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
