import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { Switch, List, Divider } from 'react-native-paper';
import { useTheme } from '../ThemeContext/ThemeProvider';
import { useNavigation } from '@react-navigation/native';
import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SettingsScreen() {
  const { isDarkMode, toggleTheme } = useTheme();
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [locationEnabled, setLocationEnabled] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    // Load saved notification settings from AsyncStorage
    const loadNotificationSettings = async () => {
      const savedNotificationStatus = await AsyncStorage.getItem('notificationsEnabled');
      if (savedNotificationStatus !== null) {
        setNotificationsEnabled(JSON.parse(savedNotificationStatus));
      }
    };

    loadNotificationSettings();
  }, []);

  const handleNotificationToggle = async (value) => {
    setNotificationsEnabled(value);

    // Save the preference in AsyncStorage
    await AsyncStorage.setItem('notificationsEnabled', JSON.stringify(value));

    if (value) {
      // Request notification permissions if enabling notifications
      const { status } = await Notifications.getPermissionsAsync();
      if (status !== 'granted') {
        const { status: newStatus } = await Notifications.requestPermissionsAsync();
        if (newStatus !== 'granted') {
          Alert.alert('Permission not granted', 'You will not receive notifications.');
          setNotificationsEnabled(false);
          return;
        }
      }
      Alert.alert('Notifications enabled', 'You will receive notifications.');
    } else {
      Alert.alert('Notifications disabled', 'You will no longer receive notifications.');
    }
  };

  return (
    <ScrollView contentContainerStyle={[styles.container, isDarkMode && styles.darkContainer]}>
      {/* Theme Settings Section */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, isDarkMode && styles.darkText]}>Theme</Text>
        <List.Item
          title="Dark Mode"
          titleStyle={isDarkMode && styles.darkText}
          right={() => (
            <Switch value={isDarkMode} onValueChange={toggleTheme} color="lightblue" />
          )}
        />
      </View>

      <Divider style={styles.divider} />

      {/* General Settings Section */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, isDarkMode && styles.darkText]}>General Settings</Text>
        <List.Item
          title="Enable Notifications"
          titleStyle={isDarkMode && styles.darkText}
          right={() => (
            <Switch
              value={notificationsEnabled}
              onValueChange={handleNotificationToggle}
              color="lightblue"
            />
          )}
        />
        <List.Item
          title="Location Access"
          titleStyle={isDarkMode && styles.darkText}
          right={() => (
            <Switch
              value={locationEnabled}
              onValueChange={() => setLocationEnabled(!locationEnabled)}
              color="lightblue"
            />
          )}
        />
      </View>

      <Divider style={styles.divider} />

      {/* Account Settings Section */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, isDarkMode && styles.darkText]}>Account Settings</Text>
        <List.Item
          title="Change Password"
          description="Update your password for security"
          titleStyle={isDarkMode && styles.darkText}
          descriptionStyle={isDarkMode && styles.darkText}
          onPress={() => navigation.navigate('ChangePassword')}
        />
        <List.Item
          title="Privacy Settings"
          description="Manage your data and privacy preferences"
          titleStyle={isDarkMode && styles.darkText}
          descriptionStyle={isDarkMode && styles.darkText}
          onPress={() => {
            // Handle privacy settings navigation here
          }}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 8,
    backgroundColor: '#fff',
  },
  darkContainer: {
    backgroundColor: '#121212',
  },
  darkText: {
    color: '#fff',
  },
  section: {
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  divider: {
    marginBottom: 16,
  },
});
