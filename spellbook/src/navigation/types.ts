import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
export type SpellsTabParamList = {
    SpellsOverview: undefined;
    CreateSpell: undefined;
    SpellsFavorites: undefined;
};

export type SpellTabNavProps<T extends keyof SpellsTabParamList> = BottomTabScreenProps<SpellsTabParamList, T>;

declare global {
    namespace ReactNavigation {
        interface RootParamList extends SpellsTabParamList {}
    }
}