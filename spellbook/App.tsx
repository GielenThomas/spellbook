import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { SpellProvider } from "./src/contexts/SpellContext.tsx";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { AuthProvider } from "./src/contexts/AuthContext.tsx";
import RootNavigator from "./src/navigation/RootNavigator.tsx";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
const FlashMessage = require("react-native-flash-message").default;
import * as Font from "expo-font";
import React, { useState } from "react";

const firebaseConfig = {
  apiKey: "AIzaSyCUGEbWLD-6AgD-HD9mfTPaY7fvHp3qhGk",
  authDomain: "spellbook-38396.firebaseapp.com",
  projectId: "spellbook-38396",
  storageBucket: "spellbook-38396.firebasestorage.app",
  messagingSenderId: "110529105432",
  appId: "1:110529105432:web:e424b902fbf6f921813d6d",
  measurementId: "G-DNWSQ66TV7",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export default function App() {
  const [fontsLoaded] = Font.useFonts({
    MedievalSharp: require("./assets/fonts/MedievalSharp.ttf"),
  });

  if (!fontsLoaded) {
    return (
      <View style={styles.container}>
        <Text style={{ fontFamily: "MedievalSharp", fontSize: 32 }}>
          Loading...
        </Text>
      </View>
    );
  }

  return (
    <Provider store={store}>
      <AuthProvider>
        <SpellProvider>
          <NavigationContainer>
            <RootNavigator />
            <StatusBar style="auto" />
            <FlashMessage position="bottom" />
          </NavigationContainer>
        </SpellProvider>
      </AuthProvider>
    </Provider>
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
