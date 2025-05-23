import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Spell } from "../../utils/spellType.ts";
import { getSpells as fetchSpells } from "../../utils/getSpells.ts";
import { sortSpells } from "../../utils/sortSpells.ts";

interface SpellContextType {
  spells: Spell[];
  toggleFavorite: (spellId: string) => Promise<void>;
  isFavorite: (spellId: string) => boolean;
  favoriteSpells: Spell[];
  addHomebrewSpell: (spell: Spell) => Promise<void>;
  deleteHomebrewSpell: (spellId: string) => Promise<void>;
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

  useEffect(() => {
    // @ts-ignore
    AsyncStorage.setItem("favoriteSpellIds", JSON.stringify(favoriteSpellIds));
  }, [favoriteSpellIds]);

  useEffect(() => {
    getSpells();
  }, []);

  const getSpells = async () => {
    const fetchedSpells: Spell[] = await fetchSpells();
    // Get homebrew spells from AsyncStorage
    let homebrewSpells: Spell[] = [];
    try {
      //@ts-ignore
      const storedHomebrew = await AsyncStorage.getItem("homebrewSpells");
      if (storedHomebrew) {
        homebrewSpells = JSON.parse(storedHomebrew);
      }
    } catch (e) {
      console.error("Failed to load homebrew spells:", e);
    }
    const allSpells = [...fetchedSpells, ...homebrewSpells];
    const sortedSpells = sortSpells(allSpells);
    setSpells(sortedSpells);
    console.log("Fetched, loaded homebrew, and sorted spells:", sortedSpells);

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

  const isFavorite = (spellId: string) => {
    return favoriteSpellIds.includes(spellId);
  };

  const favoriteSpells = spells.filter((spell) =>
    favoriteSpellIds.includes(spell.id)
  );

  const addHomebrewSpell = async (spell: Spell) => {
    const updatedSpells = [...spells, spell];
    setSpells(updatedSpells);
    const homebrewSpells = updatedSpells.filter((spell) => spell.isHomebrew);
    // @ts-ignore
    await AsyncStorage.setItem(
      "homebrewSpells",
      JSON.stringify(homebrewSpells)
    );
  };

  const deleteHomebrewSpell = async (spellId: string) => {
    const updatedSpells = spells.filter((spell) => spell.id !== spellId);
    setSpells(updatedSpells);
    const homebrewSpells = updatedSpells.filter((spell) => spell.isHomebrew);
    //@ts-ignore
    await AsyncStorage.setItem(
      "homebrewSpells",
      JSON.stringify(homebrewSpells)
    );
  };

  return (
    <SpellContext.Provider
      value={{
        spells,
        toggleFavorite,
        isFavorite,
        favoriteSpells,
        addHomebrewSpell,
        deleteHomebrewSpell,
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
