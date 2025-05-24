import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Spell } from "../../utils/spellType.ts";
import { useSpells } from "../contexts/SpellContext.tsx";

interface SpellItemProps {
  spell: Spell;
  onPress?: () => void;
}

export const SpellItem: React.FC<SpellItemProps> = ({ spell, onPress }) => {
  const { isFavorite, toggleFavorite } = useSpells();

  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <Text style={styles.name}>{spell.name}</Text>
      <TouchableOpacity
        style={styles.favoriteButton}
        onPress={() => {
          toggleFavorite(spell.id);
        }}
        activeOpacity={0.7}
      >
        <Ionicons
          name={isFavorite(spell.id) ? "star" : "star-outline"}
          size={24}
          color={isFavorite(spell.id) ? "#ffd700" : "#fff"}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: "#282c34",
    borderRadius: 12,
    elevation: 3,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  name: {
    fontSize: 18,
    color: "#ffffff",
    fontWeight: "600",
    fontFamily: "MedievalSharp",
  },
  favoriteButton: {
    marginLeft: 12,
  },
});
