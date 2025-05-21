import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { SpellsOverviewPage } from "../screens/SpellsOverviewPage.tsx";
import { SpellDetailsPage } from "../screens/SpellDetailsPage.tsx";
import { Spell } from "../../utils/spellType.ts";

export type SpellsOverviewStackParamList = {
  SpellsOverviewMain: undefined;
  SpellDetail: { spell: Spell };
};

const Stack = createStackNavigator<SpellsOverviewStackParamList>();

export const SpellsOverviewStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SpellsOverviewMain"
        component={SpellsOverviewPage}
        options={{ title: "Spells" }}
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
