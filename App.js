import React from "react";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Dekrip, Enkrip } from "./src/screens";

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

const Screen = () => {
  return (
    <>
      <Tab.Navigator
        tabBarOptions={{
          labelStyle: { fontSize: 12 },
          indicatorStyle: {
            backgroundColor: 'red',
          },
          activeTintColor: 'red',
          inactiveTintColor: 'black'
        }}
      >
        <Tab.Screen name="Enkripsi" component={Enkrip} />
        <Tab.Screen name="Dekripsi" component={Dekrip} />
      </Tab.Navigator>
    </>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Screen"
          component={Screen}
          options={{
            headerTitle: "Enkrip dan Dekrip App",
            headerStyle: {
              elevation: 0,
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
