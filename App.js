import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ThemeProvider } from './src/ThemeContext/ThemeProvider';
import StackNavigator from './src/components/StackNavigator';
import store from './src/redux/store';
import * as Notifications from 'expo-notifications';
import * as Location from 'expo-location'; // Import Location
import { Alert } from 'react-native';
import Constants from 'expo-constants';
import { NotificationProvider } from './src/NotificationContext/NotificationContext';

export default function App() {
  useEffect(() => {
    registerForPushNotificationsAsync();
    requestLocationPermission(); // Request location permission

    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
      }),
    });

    const subscription = Notifications.addNotificationReceivedListener(notification => {
      console.log('Notification received:', notification);
    });

    const responseSubscription = Notifications.addNotificationResponseReceivedListener(response => {
      console.log('Notification response:', response);
    });

    return () => {
      subscription.remove();
      responseSubscription.remove();
    };
  }, []);

  const registerForPushNotificationsAsync = async () => {
    // Request permissions for notifications
    const { status } = await Notifications.getPermissionsAsync();

    if (status !== 'granted') {
      const { status: newStatus } = await Notifications.requestPermissionsAsync();
      if (newStatus !== 'granted') {
        Alert.alert('Permission not granted', 'You will not receive notifications.');
        return;
      }
    }

    // Get the token that uniquely identifies this device
    const token = await Notifications.getExpoPushTokenAsync({ projectId: "3ff97b5b-5f2e-42a8-8616-b62af1d215f7" });
    console.log('Push Notification Token:', token);
  };

  // Function to request location permissions
  const requestLocationPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Location permission not granted', 'You will not be able to access your location.');
      return;
    }

    // Optionally, you can get the current location here
    const location = await Location.getCurrentPositionAsync({});
    console.log('Current Location:', location);

    // Reverse geocode to get city name
  const geocodedLocation = await Location.reverseGeocodeAsync(location.coords);
  console.log('Geocoded Location:', geocodedLocation);

  // Extract city from geocoded location
  if (geocodedLocation.length > 0) {
    const { city, region } = geocodedLocation[0]; // Get the first result
    const cityName = city || region; // Fallback to region if city is not available
    Alert.alert('Welcome to TrainEase:', `You're all set! It looks like you're in ${cityName}. Let's get you on the right train to your destination! 🚆`);
  } else {
    Alert.alert('City not found', 'Oops! We couldn’t determine your location. Please make sure your location services are enabled and try again.');
  }
  
  };

  return (
    <Provider store={store}>
      <ThemeProvider>
        <NotificationProvider>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <StackNavigator />
          </GestureHandlerRootView>
        </NotificationProvider>
      </ThemeProvider>
    </Provider>
  );
}
