// import * as React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
// import Profile from './src/pages/profile';
// import ContactUs from './src/pages/contactUs';
// import AccountSettings from './src/pages/accountSettings';
// import MyBookings from './src/pages/myBookings';
// import TripSummary from './src/components/tripSummary';
// import Seat from './src/components/seat';
// import SeatLayout from './src/components/seatLayout';
// import SeatSelection from './src/pages/seatSelection';
// import TrainDetails from './src/pages/trainDetails';
// import axios from 'axios';

// export default function App() {
//   return (
//     <View style={styles.container}>
//       {/* <Profile/> */}
//       {/* <ContactUs/> */}
//       {/* <AccountSettings/> */}
//       {/* <MyBookings/> */}
//       {/* <TripSummary/> */}
//       {/* <SeatLayout/> */}
//       {/* <SeatSelection/> */}
//       {/* <Seat/> */}
//       <TrainDetails/>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });




// Trip Summary Checking
// import React from 'react';
// import { SafeAreaView, StyleSheet } from 'react-native';
// import TripSummary from './src/components/tripSummary';

// const App = () => {
//   // Sample Data for Testing
//   const sampleFromStop = {
//     stationRef: 'ST01',
//     departureTime: '10:00 AM',
//     price: 100,
//   };

//   const sampleToStop = {
//     stationRef: 'ST02',
//     arrivalTime: '12:00 PM',
//     price: 200,
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <TripSummary
//         selectedClass={{ name: 'First Class', priceFactor: 1.5 }}
//         fromStop={sampleFromStop}
//         toStop={sampleToStop}
//         date="2024-07-17"
//         selectedSeatCount={3}
//         trainName="Yal Devi"
//         holdTime={new Date().getTime() + 15 * 60 * 1000} // 15 minutes from now
//         isSuccessful={false}
//       />
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     padding: 16,
//   },
// });

// export default App;



//for seat layout
// import React, { useState } from 'react';
// import SeatLayout from './src/components/seatLayout'

// const App = () => {
//   // Sample data for testing
//   const [bookedSeats, setBookedSeats] = useState(['1', '3']); // IDs of booked seats
//   const [selectedSeats, setSelectedSeats] = useState([]); // IDs of selected seats

//   const handleSeatSelection = (seatId) => {
//     // Logic to handle seat selection
//     if (selectedSeats.includes(seatId)) {
//       setSelectedSeats(selectedSeats.filter(id => id !== seatId)); // Deselect seat
//     } else {
//       setSelectedSeats([...selectedSeats, seatId]); // Select seat
//     }
//   };

//   // Example seat data
//   const seats = [
//     { _id: '1', name: 'A1', position: [50, 50] },
//     { _id: '2', name: 'A2', position: [120, 50] },
//     { _id: '3', name: 'B1', position: [50, 120] },
//     { _id: '4', name: 'B2', position: [120, 120] },
//   ];

//   return (
//     <SeatLayout
//       seats={seats}
//       bookedSeats={bookedSeats}
//       selectedSeats={selectedSeats}
//       onSeatSelection={handleSeatSelection}
//     />
//   );
// };

// export default App;


//seatselection page
// import * as React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import SeatSelection from './src/pages/seatSelection'
// import TrainDetails from './src/pages/trainDetails';
// import Schedules from './src/pages/schedules';
// import CheckOut from './src/pages/checkOut';


// const Stack = createStackNavigator();

// function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="Schedules">
//         <Stack.Screen name="Schedules" component={Schedules} />
//         <Stack.Screen name="TrainDetails" component={TrainDetails} />
//         <Stack.Screen name="SeatSelection" component={SeatSelection} />
//         <Stack.Screen name="checkout" component={CheckOut} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

// export default App;


// import * as React from "react";
// import { NavigationContainer } from "@react-navigation/native";
// import { createStackNavigator } from "@react-navigation/stack";
// import Home from "./src/pages/Home";
// import SeatSelection from "./src/pages/seatSelection";
// import TrainDetails from "./src/pages/trainDetails";
// import Schedules from "./src/pages/schedules";
// import CheckOut from "./src/pages/checkOut";

// const Stack = createStackNavigator();

// function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="Home">
//         <Stack.Screen name="Home" component={Home} />
//         <Stack.Screen name="Schedules" component={Schedules} />
//         <Stack.Screen name="TrainDetails" component={TrainDetails} />
//         <Stack.Screen name="SeatSelection" component={SeatSelection} />
//         <Stack.Screen name="checkout" component={CheckOut} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

// export default App;


// import * as React from "react";
// import { NavigationContainer } from "@react-navigation/native";
// import { createStackNavigator } from "@react-navigation/stack";
// import StackNavigator from "./src/components/StackNavigator"; // Import the StackNavigator file
// import Home from "./src/pages/Home";
// import SeatSelection from "./src/pages/seatSelection";
// import TrainDetails from "./src/pages/trainDetails";
// import Schedules from "./src/pages/schedules";
// import CheckOut from "./src/pages/checkOut";

// const Stack = createStackNavigator();

// function App() {
//   return (
//     <NavigationContainer>
//       {/* Render the main StackNavigator here */}
//       <Stack.Navigator initialRouteName="Home">
//         <Stack.Screen name="Home" component={Home} />
//         <Stack.Screen name="Schedules" component={Schedules} />
//         <Stack.Screen name="TrainDetails" component={TrainDetails} />
//         <Stack.Screen name="SeatSelection" component={SeatSelection} />
//         <Stack.Screen name="Checkout" component={CheckOut} />
//         <Stack.Screen name="Main" component={StackNavigator} options={{ headerShown: false }} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

// export default App;



import { StyleSheet, Text, View } from "react-native";
import StackNavigator from "./src/components/StackNavigator";
import AccountCreated from "./src/pages/AccountCreated";
import AccountSettings from "./src/pages/AccountSettings";
import LoginScreen from "./src/pages/Login";
import RegisterScreen from "./src/pages/Register";
import store from "./src/redux/store";

import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider } from "react-redux";

export default function App() {
  return (
    <Provider store={store}>
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StackNavigator />
    </GestureHandlerRootView>
  </Provider>
  );
}

// import React from "react";
// import { View } from "react-native";
// import Example from "./src/pages/Example"; // Assuming Example is in the same directory

// export default function App() {
//   return (
//     <View style={styles.container}>
//       {" "}
//       // Make sure styles.container is correctly defined
//       <Example />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
// });