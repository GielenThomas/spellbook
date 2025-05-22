import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Spell } from "../../utils/spellType.ts";
import { getSpells as fetchSpells } from "../../utils/getSpells.ts";
import { sortSpells } from "../../utils/sortSpells.ts";

interface SpellContextType {
  getSpells: () => Promise<Spell[]>;
  favoriteSpellIds: string[];
  toggleFavorite: (spellId: string) => Promise<void>;
}

const SpellContext = createContext<SpellContextType | undefined>(undefined);

export const SpellProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [spells, setSpells] = useState<Spell[]>([]);
  const [favoriteSpellIds, setFavoriteSpellIds] = useState<string[]>([]);

  useEffect(() => {
    const loadFavorites = async () => {
      //@ts-ignore
      const stored = await AsyncStorage.getItem("favoriteSpellIds");
      if (stored) setFavoriteSpellIds(JSON.parse(stored));
    };
    loadFavorites();
  }, []);

  const getSpells = async () => {
    const fetchedSpells: Spell[] = await fetchSpells();
    const sortedSpells = sortSpells(fetchedSpells);
    setSpells(sortedSpells);
    console.log("Fetched and sorted spells:", sortedSpells);

    return sortedSpells;
  };

  const toggleFavorite = async (spellId: string) => {
    setFavoriteSpellIds((prev) => {
      let updated: string[];
      if (prev.includes(spellId)) {
        updated = prev.filter((id) => id !== spellId);
      } else {
        updated = [...prev, spellId];
      }
      //@ts-ignore
      AsyncStorage.setItem("favoriteSpellIds", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <SpellContext.Provider
      value={{ getSpells, favoriteSpellIds, toggleFavorite }}
    >
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
