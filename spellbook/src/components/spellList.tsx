import React from "react";
import {
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Text,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { SpellItem } from "./spellItem.tsx";
import { Spell } from "../../utils/spellType.ts";
import { SpellsOverviewStackParamList } from "../navigation/SpellOverviewStackNavigator.tsx";
import { SpellsFavoritesStackParamList } from "../navigation/SpellsFavoritesStackNavigator.tsx";
import { useNavigation } from "@react-navigation/native";

interface SpellListProps {
  spells: Spell[];
  onPress?: () => void;
}

type NavigationProp =
  | StackNavigationProp<SpellsOverviewStackParamList, "SpellsOverviewMain">
  | StackNavigationProp<SpellsFavoritesStackParamList, "SpellsFavoritesMain">;

export const SpellList: React.FC<SpellListProps> = ({ spells }) => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <View style={styles.container}>
      {spells.length === 0 ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{ color: "#888", fontSize: 16, marginBottom: 12 }}>
            No spells found
          </Text>
        </View>
      ) : (
        <FlatList
          data={spells}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <SpellItem
              spell={item}
              onPress={() =>
                navigation.navigate("SpellDetail", { spell: item })
              }
            />
          )}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white", // Match SpellOverview background
    // Removed centering to allow stacking under SearchBar
  },
  list: {
    paddingVertical: 16,
    paddingHorizontal: 12,
    width: "100%",
  },
});
