import { TextInput, View } from "react-native";

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChangeText,
}) => {
  return (
    <View
      style={{
        width: "100%",
        backgroundColor: "white",
        alignItems: "center",
        marginTop: 16,
        marginBottom: 8,
      }}
    >
      <TextInput
        style={{
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
          borderRadius: 5,
          paddingHorizontal: 10,
          width: "90%",
        }}
        placeholder="Search spells..."
        placeholderTextColor="gray"
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};
