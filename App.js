import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ThemeProvider } from './src/ThemeContext/ThemeProvider';
import StackNavigator from './src/components/StackNavigator';
import store from './src/redux/store';
import * as Notifications from 'expo-notifications';
import * as Location from 'expo-location'; 
import { Alert, View, Text, StyleSheet, Animated, Dimensions } from 'react-native';
import Constants from 'expo-constants';
import { NotificationProvider } from './src/NotificationContext/NotificationContext';
import NetInfo from '@react-native-community/netinfo';  // NetInfo to detect connection
import { trackUserInsights, Insight } from 'expo-insights';
import { StripeProvider } from '@stripe/stripe-react-native';


export default function App() {

  const [detectedCity, setDetectedCity] = useState(null);
  const [isConnected, setIsConnected] = useState(true);  // Track connection status
  const [bannerHeight] = useState(new Animated.Value(0)); // Initial height of banner
  const [fadeAnim] = useState(new Animated.Value(0));

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

    // Subscribe to internet connection status
    const unsubscribe = NetInfo.addEventListener(state => {
      if (state.isConnected) {
        handleConnectionRestored();
      } else {
        handleConnectionLost();
      }
    });

    const subscription = Notifications.addNotificationReceivedListener(notification => {
      console.log('Notification received:', notification);
    });

    const responseSubscription = Notifications.addNotificationResponseReceivedListener(response => {
      console.log('Notification response:', response);
    });

    return () => {
      unsubscribe(); // Unsubscribe from NetInfo on cleanup
      subscription.remove();
      responseSubscription.remove();
    };
  }, []);

  // Function to handle connection lost
  const handleConnectionLost = () => {
    setIsConnected(false);
    Animated.timing(bannerHeight, {
      toValue: 50,  // Height of banner when shown
      duration: 300,
      useNativeDriver: false
    }).start();
  };

  // Function to handle connection restored
  const handleConnectionRestored = () => {
    setIsConnected(true);
    Animated.timing(bannerHeight, {
      toValue: 0,  // Height of banner when hidden
      duration: 300,
      useNativeDriver: false
    }).start();
  };

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true, // Use native driver for performance
    }).start();
  };

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

  function onScreenNavigate(screenName) {
    trackUserInsights('ScreenNavigated', { screen: screenName, timestamp: new Date().toISOString() });
  }

  return (
    <Provider store={store}>
      <StripeProvider publishableKey="pk_test_51Q8toPAc3xtK5yPN3ACfmd8it850Cbv4UVn4d9i2MbziUZAwMOyeUd4YXK3uNM1Ni7FsVAag0qF48iYFRllK9Dsv00sV9OO6fn">
      <ThemeProvider>
        <NotificationProvider>
          <GestureHandlerRootView style={{ flex: 1 }}>
            
            {/* Animated Banner for Internet Status */}
            <Animated.View style={[styles.banner, { height: bannerHeight }]}>
              <Text style={styles.bannerText}>No Internet Connection</Text>
            </Animated.View>
              
            <StackNavigator />
          </GestureHandlerRootView>
        </NotificationProvider>
      </ThemeProvider>
      </StripeProvider>  
    </Provider>
  );
}

const styles = StyleSheet.create({
  banner: {
    backgroundColor: '#ff4d4f',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    width: Dimensions.get('window').width,
    zIndex: 1,
  },
  bannerText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
