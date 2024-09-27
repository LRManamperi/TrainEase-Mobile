import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ThemeProvider } from './src/ThemeContext/ThemeProvider';
import StackNavigator from './src/components/StackNavigator';
import store from './src/redux/store';
import * as Notifications from 'expo-notifications';
import { Alert } from 'react-native';
import Constants from 'expo-constants';
import { NotificationProvider } from './src/NotificationContext/NotificationContext';

export default function App() {
  useEffect(() => {
    registerForPushNotificationsAsync();
  
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
