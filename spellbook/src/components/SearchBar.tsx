import { TextInput, View } from "react-native";

export const SearchBar = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
      }}
    >
      <TextInput
        style={{
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
          borderRadius: 5,
          paddingHorizontal: 10,
          marginBottom: 20,
          width: "90%",
        }}
        placeholder="Search spells..."
        placeholderTextColor="gray"
      />
    </View>
  );
};
