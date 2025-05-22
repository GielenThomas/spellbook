import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type SpellsTabParamList = {
    SpellsOverview: undefined;
    CreateSpell: undefined;
    SpellsFavorites: undefined;
};

export type SpellTabNavProps<T extends keyof SpellsTabParamList> = BottomTabScreenProps<SpellsTabParamList, T>;

type RouteProp<ParamList, RouteName extends keyof ParamList> = {
  key: string;
  name: RouteName;
  params: ParamList[RouteName];
};


// Define the stack param list for SpellsOverview stack
export type SpellsOverviewStackParamList = {
  SpellsOverview: undefined;
  SpellDetails: { spellId: string };
  CreateSpell: undefined;
  // Add other screens as needed
};

// Generic StackNavProps type
export type StackNavProps<T extends keyof SpellsOverviewStackParamList> = {
  navigation: NativeStackNavigationProp<SpellsOverviewStackParamList, T>;
  route: RouteProp<SpellsOverviewStackParamList, T>;
};

declare global {
    namespace ReactNavigation {
        interface RootParamList extends SpellsTabParamList {}
    }
}