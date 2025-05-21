import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { SpellsFavoritesPage } from "../screens/SpellsFavoritesPage.tsx";
import { SpellDetailsPage } from "../screens/SpellDetailsPage.tsx";
import { Spell } from "../../utils/spellType.ts";

export type SpellsFavoritesStackParamList = {
  SpellsFavoritesMain: undefined;
  SpellDetail: { spell: Spell };
};

const Stack = createStackNavigator<SpellsFavoritesStackParamList>();

export const SpellsFavoritesStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SpellsFavoritesMain"
        component={SpellsFavoritesPage}
        options={{ title: "Favorites" }}
      />
      <Stack.Screen
        name="SpellDetail"
        component={SpellDetailsPage}
        options={({ route }: { route: { params: { spell: Spell } } }) => ({
          title: route.params.spell.name,
        })}
      />
    </Stack.Navigator>
  );
};
