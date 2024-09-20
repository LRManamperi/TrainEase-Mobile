import * as React from "react";
import { useEffect } from "react";
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
import { ThemeProvider , useTheme} from "../ThemeContext/ThemeProvider";
import Home from "../pages/Home";
import ContactUs from "../pages/contactUs";
import ProfileScreen from "../pages/profile";
import BookingsScreen from "../pages/myBookings";
import SeatSelection from "../pages/SeatSelection";
import TrainDetails from "../pages/trainDetails";
import Schedules from "../pages/schedules";
import Checkout from "../pages/Checkout";
import AccountSettingsScreen from "../pages/AccountSettings";
import LoginScreen from "../pages/Login";
import RegisterScreen from "../pages/Register";
import AccountCreated from "../pages/AccountCreated";
import ReportIssuesScreen from "../pages/ReportAppIssues";
import ShareAppScreen from "../pages/ShareApp";
import SettingsScreen from "../pages/Settings";
import TransactionsScreen from "../pages/Transactions";
import ManagePaymentMethods from "../pages/ManagePaymentMethods";
import PreBookingQueries from "../pages/PreBookingQueries";
import Notifications from "../pages/Notifications";



const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Stack navigator for Home-related screens
function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: PRIMARY_COLOR },
        headerTitleStyle: { fontSize: 26, fontWeight: "bold", color: "white" },
        headerTintColor: "white",
      }}
    >
      <Stack.Screen name="TrainEase" component={Home}/>
      <Stack.Screen name="Schedules" component={Schedules} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="TrainDetails" component={TrainDetails} options = {{title : "Train Details"}} />
      <Stack.Screen name="SeatSelection" component={SeatSelection} options = {{title : "Seat Selection"}} />
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
      <Stack.Screen name="My Profile" component={ProfileScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="AccountSettings" component={AccountSettingsScreen} options={{title:"Account Settings"}}/>
      <Stack.Screen name="AccountCreated" component={AccountCreated} options={{title:"New Account Created"}} />
      <Stack.Screen name="MyBookings" component={BookingsScreen} options={{title:"My Bookings"}} />
      <Stack.Screen name="ReportIssues" component={ReportIssuesScreen} options={{title:"Report Issues"}}/>
      <Stack.Screen name="ShareApp" component={ShareAppScreen} options ={{title:"Share App"}}/>
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="ChangePassword" component={AccountSettingsScreen} options = {{title:"Change Password"}} />
      <Stack.Screen name="Transactions" component={TransactionsScreen} />
      <Stack.Screen name="Notifications" component={Notifications} />

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
        options={{ headerShown: true, title: "Account Settings" , headerStyle: {backgroundColor: PRIMARY_COLOR}, headerTintColor: "white"}}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
      name = "ManagePaymentMethods"
      component = {ManagePaymentMethods}
      options = {{headerShown: true, title: "Manage Payment Methods", headerStyle: {backgroundColor: PRIMARY_COLOR}, headerTintColor: "white"}}
      />
      <Stack.Screen
      name = "PreBookingQueries"
      component={PreBookingQueries}
      options = {{headerShown: true, title: "Pre Booking Queries", headerStyle: {backgroundColor: PRIMARY_COLOR}, headerTintColor: "white"}}
  />
      
    </Stack.Navigator>
  );
}


// Main App Navigation Container
export default function App() {

  const { theme } = useTheme();

  return (
    <ThemeProvider>
      <NavigationContainer theme = {theme}>
        <MainTabs />
      </NavigationContainer>
    </ThemeProvider>
  );
}