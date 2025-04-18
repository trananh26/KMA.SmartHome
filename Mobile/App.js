import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import SaleScreen from "./screens/SaleScreen";
import WareHouseScreen from "./screens/WareHouseScreen";
import EmployeeScreen from "./screens/EmployeeScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator >
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false  }} />
        <Stack.Screen name="Home" component={HomeScreen}  options={{ headerShown: false }}/>
        <Stack.Screen name="Sale" component={SaleScreen}  options={{ headerShown: false }}/>
        <Stack.Screen name="WareHouse" component={WareHouseScreen}  options={{ headerShown: false }}/>
        <Stack.Screen name="Employee" component={EmployeeScreen}  options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
