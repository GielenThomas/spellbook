import { View, Text } from "react-native";
import { TextInput } from "react-native";
import { SearchBar } from "../components/SearchBar.tsx";

export const SpellOverview = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
      }}
    >
      <SearchBar />
      <Text style={{ color: "black" }}>Spells Overview</Text>
    </View>
  );
};
