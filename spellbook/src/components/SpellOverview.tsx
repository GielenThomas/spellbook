import { View } from "react-native";
import { SearchBar } from "../components/SearchBar.tsx";
import { SpellList } from "../components/spellList.tsx";
import { useSpells } from "../contexts/SpellContext.tsx";
import { useEffect, useState } from "react";
import { Spell } from "../../utils/spellType.ts";
import { useDispatch, useSelector } from "react-redux";
import { setSearch } from "../../store/searchSlice.ts";

export const SpellOverview = () => {
  const [spells, setSpells] = useState<Spell[]>([]);
  const dispatch = useDispatch();
  const search = useSelector((state: any) => state.search.search);

  const { getSpells } = useSpells();

  useEffect(() => {
    const fetchSpells = async () => {
      const spellsData = await getSpells();
      setSpells(spellsData);
    };
    fetchSpells();
  }, []);

  const filteredSpells = spells.filter((spell) =>
    spell.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
      }}
    >
      <SearchBar
        value={search}
        onChangeText={(text) => dispatch(setSearch(text))}
      />
      <SpellList spells={filteredSpells} />
    </View>
  );
};
