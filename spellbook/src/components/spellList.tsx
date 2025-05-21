import React from "react";
import { View, FlatList, StyleSheet } from "react-native";
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

export const SpellOverviewScreen: React.FC<SpellListProps> = ({ spells }) => {
  const navigation = useNavigation<NavigationProp>();
  return (
    <View style={styles.container}>
      <FlatList
        data={spells}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <SpellItem
            name={item.name}
            onPress={navigation.navigate("SpellDetail", { item })}
          />
        )}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  list: {
    paddingVertical: 16,
  },
});
