import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Switch, List, Divider } from 'react-native-paper';
import { useTheme } from '../ThemeContext/ThemeProvider';
import { useNavigation } from '@react-navigation/native';

export default function SettingsScreen() {
  const { isDarkMode, toggleTheme } = useTheme();
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [locationEnabled, setLocationEnabled] = useState(false);

  const navigation = useNavigation();
  const handleNotificationToggle = async (value) => {
    setNotificationsEnabled(value);
    // Add logic to save the preference or enable notifications
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
              testID="notification-switch"
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
              testID="location-switch"
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
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#000',
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
