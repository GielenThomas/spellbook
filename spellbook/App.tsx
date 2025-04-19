import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { SpellsTabNavigator } from "./src/navigation/SpellsTabNavigator.tsx";
import { SpellProvider } from "./src/contexts/SpellContext.tsx";
export default function App() {
  return (
    <SpellProvider>
      <NavigationContainer>
        <SpellsTabNavigator />
        <StatusBar style="auto" />
      </NavigationContainer>
    </SpellProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
