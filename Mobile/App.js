import React, { useState, useEffect } from "react"; // Import useState, useEffect
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { ThemeProvider } from "./context/ThemeContext";
import { API_URL } from "./constants/api"; // Import API_URL
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import ControlScreen from "./screens/ControlScreen";
import NotificationScreen from "./screens/NotificationScreen";
import SettingScreen from "./screens/SettingScreen";
import UserProfileScreen from "./screens/UserProfileScreen";
import ChangePasswordScreen from "./screens/ChangePasswordScreen";
import RegisterScreen from "./screens/RegisterScreen";

const Stack = createStackNavigator();

export default function App() {
  const [hasNewNotification, setHasNewNotification] = useState(false); // Lifted state

  // Function to check for new alarms (copied from HomeScreen)
  const checkNewAlarms = async () => {
    try {
      const response = await fetch(`${API_URL}/Sensor/GetNewAlarm`);
      if (!response.ok) {
        console.error('App.js: Failed to check for new alarms: Network error');
        return;
      }
      const json = await response.json();
      console.log('App.js: New alarms response:', json.code); // Log the response for debugging
      console.log('App.js: New alarms response:', json.data); // Log the response for debugging
      if (json.code === "200") {
        setHasNewNotification(true);
      } else {
        setHasNewNotification(false);
      }
    } catch (error) {
      console.error("App.js: Error checking new alarms:", error);
    }
  };

  // Function to clear the badge
  const clearNotificationBadge = () => {
    setHasNewNotification(false);
  };

  // Setup polling interval
  useEffect(() => {
    // Initial check and start polling for alarms
    // Note: Polling starts immediately. Consider starting only after login.
    // For simplicity now, it starts on app load.
    checkNewAlarms();
    const alarmInterval = setInterval(checkNewAlarms, 10000); // Check every 10 seconds

    return () => {
      clearInterval(alarmInterval); // Clear alarm interval on unmount
    };
  }, []); // Run once on app load

  // Props to pass down
  const screenProps = {
    hasNewNotification,
    clearNotificationBadge,
  };

  return (
    <ThemeProvider>
      <NavigationContainer>
        {/* Pass props using render functions */}
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Home">
            {props => <HomeScreen {...props} {...screenProps} />}
          </Stack.Screen>
          <Stack.Screen name="Control">
            {props => <ControlScreen {...props} {...screenProps} />}
          </Stack.Screen>
          <Stack.Screen name="Notification">
            {props => <NotificationScreen {...props} {...screenProps} />}
          </Stack.Screen>
          <Stack.Screen name="Setting">
            {props => <SettingScreen {...props} {...screenProps} />}
          </Stack.Screen>
          <Stack.Screen name="UserProfile">
            {props => <UserProfileScreen {...props} {...screenProps} />}
          </Stack.Screen>
          <Stack.Screen name="ChangePassword">
            {props => <ChangePasswordScreen {...props} {...screenProps} />}
          </Stack.Screen>
          <Stack.Screen name="Register" component={RegisterScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}
