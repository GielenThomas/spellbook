import { StyleSheet, Text, View, ScrollView } from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";
import { StackNavProps } from "../navigation/types.ts";
import { Button } from "react-native-elements";
import * as Speech from "expo-speech";

export const SpellDetailsPage = () => {
  const {
    params: { spell },
  } = useRoute<StackNavProps<"SpellDetails">["route"]>();

  if (!spell) {
    return <Text>Spell not found</Text>;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.name}>{spell.name}</Text>
      <Text style={styles.detail}>
        {spell.level} {spell.school}
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
      <View style={styles.section}>
        <Button
          title="Read Description"
          onPress={async () => {
            Speech.speak(spell.description, {
              language: "en-US",
              pitch: 1.0,
              rate: 0.95,
            });
          }}
        />
      </View>
      {spell.higherLevels ? (
        <>
          <View style={styles.section}>
            <Text style={styles.label}>At Higher Levels:</Text>
            <Text>{spell.higherLevels}</Text>
          </View>
          <View style={styles.section}>
            <Button
              title="Read Higher Levels"
              onPress={async () => {
                Speech.speak(spell.higherLevels, {
                  language: "en-US",
                  pitch: 1.0,
                  rate: 0.95,
                });
              }}
            />
          </View>
        </>
      ) : null}
    </ScrollView>
  );
};

export default SpellDetailsPage;

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
