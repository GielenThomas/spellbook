import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { SpellsOverviewStackParamList } from "../navigation/SpellOverviewStackNavigator.tsx";
import { SpellsFavoritesStackParamList } from "../navigation/SpellsFavoritesStackNavigator.tsx";

type SpellDetailRouteProp =
  | StackNavigationProp<SpellsOverviewStackParamList, "SpellDetail">
  | StackNavigationProp<SpellsFavoritesStackParamList, "SpellDetail">;

export const SpellDetailsPage = () => {
  const route = useRoute<SpellDetailRouteProp>();
  const { spell } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.name}>{spell.name}</Text>
      <Text style={styles.detail}>
        Level {spell.level} {spell.school}
      </Text>

      <View style={styles.section}>
        <Text style={styles.label}>Casting Time:</Text>
        <Text>{spell.castingTime}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Range:</Text>
        <Text>{spell.spellRange}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Duration:</Text>
        <Text>{spell.duration}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Components:</Text>
        <Text>{spell.components.join(", ")}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Description:</Text>
        <Text>{spell.description}</Text>
      </View>

      {spell.higherLevels ? (
        <View style={styles.section}>
          <Text style={styles.label}>At Higher Levels:</Text>
          <Text>{spell.higherLevels}</Text>
        </View>
      ) : null}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
  },
  name: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 8,
  },
  detail: {
    fontSize: 16,
    marginBottom: 16,
    fontStyle: "italic",
  },
  section: {
    marginBottom: 16,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 4,
  },
});
