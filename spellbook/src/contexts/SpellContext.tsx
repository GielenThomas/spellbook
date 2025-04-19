import React, { createContext, useContext, useState } from "react";

export interface Spell {
  name: string;
  level: number;
  school: string;
  castingTime: string;
  range: string;
  components: {
    verbal: boolean;
    somatic: boolean;
    material: boolean;
    materialDescription?: string;
  };
  duration: string;
  description: string;
  higherLevels?: string;
  classes: string[];
  ritual?: boolean;
  concentration?: boolean;
}

interface SpellContextType {
  spells: Spell[];
  setOfficialSpells: (spells: Spell[]) => void;
}

const SpellContext = createContext<SpellContextType | undefined>(undefined);

export const SpellProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [spells, setSpells] = useState<Spell[]>([]);

  const setOfficialSpells = (newSpells: Spell[]) => {
    setSpells(newSpells);
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
