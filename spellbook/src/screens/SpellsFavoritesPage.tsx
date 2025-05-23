import React, { useState, useEffect } from "react";
import { SpellOverview } from "../components/SpellOverview.tsx";
import { useSpells } from "../contexts/SpellContext.tsx";
import { Spell } from "../../utils/spellType.ts";
export const SpellsFavoritesPage = () => {
  const [spells, setSpells] = useState<Spell[]>([]);
  const { favoriteSpells } = useSpells();

  return <SpellOverview spells={favoriteSpells} />;
};
