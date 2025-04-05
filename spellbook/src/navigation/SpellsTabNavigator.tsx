import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

import { SpellsOverviewPage } from "../screens/SpellsOverviewPage.tsx"
import { CreateSpellPage } from "../screens/CreateSpellPage.tsx"
import { SpellsFavoritesPage } from "../screens/SpellsFavoritesPage.tsx"
import { SpellsTabParamList } from "./types.ts"

const SpellsTab = createBottomTabNavigator<SpellsTabParamList>()

export const SpellsTabNavigator = () => {
    return (
        <SpellsTab.Navigator screenOptions={{ headerShown: false }}>
            <SpellsTab.Screen name="SpellsOverview" component={SpellsOverviewPage} />
            <SpellsTab.Screen name="SpellsFavorites" component={SpellsFavoritesPage} />
            <SpellsTab.Screen name="CreateSpell" component={CreateSpellPage} />
        </SpellsTab.Navigator>
    )
}