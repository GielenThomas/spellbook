import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

interface SpellItemProps {
  name: string;
  onPress?: () => void;
}

export const SpellItem: React.FC<SpellItemProps> = ({ name, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <Text style={styles.name}>{name}</Text>
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
  },
  name: {
    fontSize: 18,
    color: "#ffffff",
    fontWeight: "600",
  },
});
