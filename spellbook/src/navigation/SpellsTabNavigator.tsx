import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { CreateSpellPage } from "../screens/CreateSpellPage.tsx";
import { SpellsTabParamList } from "./types.ts";
import { SpellsOverviewStackNavigator } from "./SpellOverviewStackNavigator.tsx";
import { SpellsFavoritesStackNavigator } from "./SpellsFavoritesStackNavigator.tsx";

const SpellsTab = createBottomTabNavigator<SpellsTabParamList>();

export const SpellsTabNavigator = () => {
  return (
    <SpellsTab.Navigator screenOptions={{ headerShown: false }}>
      <SpellsTab.Screen
        name="SpellsOverview"
        component={SpellsOverviewStackNavigator}
      />
      <SpellsTab.Screen
        name="SpellsFavorites"
        component={SpellsFavoritesStackNavigator}
      />
      <SpellsTab.Screen name="CreateSpell" component={CreateSpellPage} />
    </SpellsTab.Navigator>
  );
};
