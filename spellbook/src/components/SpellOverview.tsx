import { View } from "react-native";
import { SearchBar } from "../components/SearchBar.tsx";
import { SpellList } from "../components/spellList.tsx";
import { Spell } from "../../utils/spellType.ts";
import { useDispatch, useSelector } from "react-redux";
import { setSearch } from "../../store/searchSlice.ts";
import { RootState } from "../../store/store.ts";

interface SpellOverviewProps {
  spells: Spell[];
}

export const SpellOverview = ({ spells }: SpellOverviewProps) => {
  const dispatch = useDispatch();
  const search: string = useSelector((state: RootState) => state.search.search);

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
