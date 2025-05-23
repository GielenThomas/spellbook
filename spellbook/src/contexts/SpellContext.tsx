import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Spell } from "../../utils/spellType.ts";
import { getSpells as fetchSpells } from "../../utils/getSpells.ts";
import { sortSpells } from "../../utils/sortSpells.ts";

interface SpellContextType {
  spells: Spell[];
  toggleFavorite: (spellId: string) => Promise<void>;
  getFavoriteSpells: () => Promise<Spell[]>;
  isFavorite: (spellId: string) => boolean;
  favoriteSpells: Spell[];
}

const SpellContext = createContext<SpellContextType | undefined>(undefined);

export const SpellProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [spells, setSpells] = useState<Spell[]>([]);
  const [favoriteSpellIds, setFavoriteSpellIds] = useState<string[]>([]);

  useEffect(() => {
    const loadFavorites = async () => {
      // @ts-ignore
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
      if (prev.includes(spellId)) {
        return prev.filter((id) => id !== spellId);
      } else {
        return [...prev, spellId];
      }
    });
  };

  useEffect(() => {
    // @ts-ignore
    AsyncStorage.setItem("favoriteSpellIds", JSON.stringify(favoriteSpellIds));
  }, [favoriteSpellIds]);

  const getFavoriteSpells = async () => {
    return spells.filter((spell) => favoriteSpellIds.includes(spell.id));
  };

  const isFavorite = (spellId: string) => {
    return favoriteSpellIds.includes(spellId);
  };

  useEffect(() => {
    getSpells();
  }, []);

  return (
    <SpellContext.Provider
      value={{
        spells,
        toggleFavorite,
        getFavoriteSpells,
        isFavorite,
        favoriteSpells: spells.filter((spell) =>
          favoriteSpellIds.includes(spell.id)
        ),
      }}
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
