import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthContext } from "../contexts/AuthContext.tsx";
import LoginScreen from "../screens/LoginScreen.tsx";
import RegisterScreen from "../screens/RegisterScreen.tsx";
import { SpellsTabNavigator } from "././SpellsTabNavigator.tsx";

const Stack = createStackNavigator();

const RootNavigator = () => {
  const { user } = useContext(AuthContext);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        <Stack.Screen name="Main" component={SpellsTabNavigator} />
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default RootNavigator;
