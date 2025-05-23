import React from "react";
import { SpellOverview } from "../components/SpellOverview.tsx";
import { useSpells } from "../contexts/SpellContext.tsx";
import { useEffect, useState } from "react";
import type { Spell } from "../../utils/spellType.ts";
export const SpellsOverviewPage = () => {
  const { spells } = useSpells();

  return <SpellOverview spells={spells} />;
};
