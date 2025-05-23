import { useSpells } from "../contexts/SpellContext.tsx";
import { useNavigation } from "@react-navigation/core";
import { Alert, View } from "react-native";
import { Button } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";

export const DeleteSpellButton = ({ spellId }: { spellId: string }) => {
  const { deleteHomebrewSpell } = useSpells();
  const navigation = useNavigation();

  const handleDelete = () => {
    Alert.alert(
      "Delete Spell",
      "Are you sure you want to delete this homebrew spell?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            deleteHomebrewSpell(spellId);
            navigation.goBack();
          },
        },
      ]
    );
  };

  return (
    <View style={{ marginTop: 8 }}>
      <Button
        title="Delete Spell"
        buttonStyle={{ backgroundColor: "#d32f2f" }}
        onPress={handleDelete}
        icon={
          <Ionicons
            name="trash"
            size={20}
            color="#fff"
            style={{ marginRight: 8 }}
          />
        }
      />
    </View>
  );
};
