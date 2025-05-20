import React from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { SpellItem } from "./spellItem.tsx";
import { Spell } from "../../utils/spellType.ts";

interface SpellListProps {
  spells: Spell[];
  onPress?: () => void;
}

export const SpellOverviewScreen: React.FC<SpellListProps> = ({ spells }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={spells}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <SpellItem name={item.name} />}
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
