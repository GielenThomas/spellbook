import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { CreateSpellPage } from "../screens/CreateSpellPage.tsx";
import { SpellsTabParamList } from "./types.ts";
import { SpellsOverviewStackNavigator } from "./SpellOverviewStackNavigator.tsx";
import { SpellsFavoritesStackNavigator } from "./SpellsFavoritesStackNavigator.tsx";
import { Ionicons } from "@expo/vector-icons";

const SpellsTab = createBottomTabNavigator<SpellsTabParamList>();

export const SpellsTabNavigator = () => {
  return (
    <SpellsTab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <SpellsTab.Screen
        name="SpellsOverview"
        component={SpellsOverviewStackNavigator}
        options={{
          title: "Spells",
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <Ionicons name="book-outline" color={color} size={size} />
          ),
        }}
      />
      <SpellsTab.Screen
        name="SpellsFavorites"
        component={SpellsFavoritesStackNavigator}
        options={{
          title: "Favorites",
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <Ionicons name="star-outline" color={color} size={size} />
          ),
        }}
      />
      <SpellsTab.Screen
        name="CreateSpell"
        component={CreateSpellPage}
        options={{
          title: "Create Spell",
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <Ionicons name="add-circle-outline" color={color} size={size} />
          ),
        }}
      />
    </SpellsTab.Navigator>
  );
};
