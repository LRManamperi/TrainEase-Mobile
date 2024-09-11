import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import { Image } from "react-native";
import homeIcon from "../assets/Home.png";
import historyIcon from "../assets/history.png";
import contactIcon from "../assets/contact.png";
import profileIcon from "../assets/profile.png";
import { PRIMARY_COLOR } from "../utils/Utils";
import Home from "../pages/Home";
import ContactUs from "../pages/contactUs";
import ProfileScreen from "../pages/profile";
import BookingsScreen from "../pages/myBookings";
import SeatSelection from "../pages/seatSelection";
import TrainDetails from "../pages/trainDetails";
import Schedules from "../pages/schedules";
import Checkout from "../pages/Checkout";
import AccountSettingsScreen from "../pages/AccountSettings";
import LoginScreen from "../pages/Login";
import RegisterScreen from "../pages/Register";
import AccountCreated from "../pages/AccountCreated";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Stack navigator for Home-related screens
function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: PRIMARY_COLOR },
        headerTitleStyle: { fontSize: 22, fontWeight: "bold", color: "white" },
        headerTintColor: "white",
      }}
    >
      <Stack.Screen name="TrainEase" component={Home} />
      <Stack.Screen name="Schedules" component={Schedules} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="TrainDetails" component={TrainDetails} />
      <Stack.Screen name="SeatSelection" component={SeatSelection} />
      <Stack.Screen name="Checkout" component={Checkout} />
    </Stack.Navigator>
  );
}

// Stack navigator for Profile-related screens
function ProfileStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: PRIMARY_COLOR },
        headerTitleStyle: { fontSize: 24, fontWeight: "bold", color: "white" },
        headerTintColor: "white",
      }}
    >
      <Stack.Screen name="ProfileMain" component={ProfileScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="AccountSettings" component={AccountSettingsScreen} />
      <Stack.Screen name="AccountCreated" component={AccountCreated} />
      <Stack.Screen name="MyBookings" component={BookingsScreen} />

    </Stack.Navigator>
  );
}

// Main Tab Navigator
function MainTabs() {
  return (
    <>
      <StatusBar style="light" />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color }) => {
            let iconSource;
            let iconSize = focused ? 32 : 30;

            if (route.name === "Home") {
              iconSource = homeIcon;
            } else if (route.name === "Booking History") {
              iconSource = historyIcon;
              iconSize = focused ? 39 : 37;
            } else if (route.name === "Contact Us") {
              iconSource = contactIcon;
              iconSize = focused ? 36 : 34;
            } else if (route.name === "Profile") {
              iconSource = profileIcon;
            }

            return (
              <Image
                source={iconSource}
                style={{
                  width: iconSize,
                  height: iconSize,
                  tintColor: color,
                }}
              />
            );
          },
          tabBarHideOnKeyboard: true,
          tabBarActiveTintColor: "white",
          tabBarInactiveTintColor: "grey",
          tabBarStyle: {
            backgroundColor: PRIMARY_COLOR,
            height: 60,
            paddingTop: 15,
          },
          tabBarLabelStyle: {
            fontSize: 11,
            paddingBottom: 5,
            textAlign: "center",
          },
        })}
      >
        <Tab.Screen
          name="Home"
          component={HomeStack}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Booking History"
          component={BookingsScreen}
          options={{
            headerStyle: { backgroundColor: PRIMARY_COLOR },
            headerTintColor: "white",
          }}
        />
        <Tab.Screen
          name="Contact Us"
          component={ContactUsStackScreen}
          options={{ headerShown: false, tabBarItemStyle: { marginLeft: 20 } }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileStack}
          options={{ headerShown: false }}
        />
      </Tab.Navigator>
    </>
  );
}

// Nested Stack Navigator for Contact Us section
function ContactUsStackScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ContactUsMain"
        component={ContactUs}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AccountSettings"
        component={AccountSettingsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
      />
      
    </Stack.Navigator>
  );
}


// Main App Navigation Container
export default function App() {
  return (
    <NavigationContainer>
      <MainTabs />
    </NavigationContainer>
  );
}
