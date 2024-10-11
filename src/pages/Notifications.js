
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import { useTheme } from '../ThemeContext/ThemeProvider';
import LoadingSpinner from '../components/LoadingScreen'; 

export default function Notifications() {
  const { isDarkMode } = useTheme(); // Get theme context
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNotifications() {
      try {
        setLoading(true);
        
        // Sample notifications for testing
        const sampleNotifications = [
          { id: '1', message: 'Your train is delayed by 30 minutes.', timestamp: Date.now() - 3600000 },
          { id: '2', message: 'Booking confirmed for Galu Kumari.', timestamp: Date.now() - 7200000 },
          { id: '3', message: 'Your seat has been upgraded to First Class.', timestamp: Date.now() - 10800000 },
          { id: '4', message: 'Uttara Devi is now departing from Platform 3.', timestamp: Date.now() - 14400000 },
        ];

        
        // Simulate an API delay
        setTimeout(() => {
          setNotifications(sampleNotifications);
          setLoading(false);
        }, 1000);
        
      } catch (error) {
        console.error('Error fetching notifications:', error);
        setLoading(false);
      }
    }

    fetchNotifications();
  }, []);

  const renderItem = ({ item }) => (
    <View style={[styles.card, isDarkMode && styles.darkCard]}>
      <Text style={[styles.notificationText, isDarkMode && styles.darkText]}>
        {item.message}
      </Text>
      <Text style={[styles.timeText, isDarkMode && styles.darkTimeText]}>
        {new Date(item.timestamp).toLocaleString()}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, isDarkMode && styles.darkContainer]}>
      {loading ? (
        <LoadingSpinner />
      ) : notifications.length === 0 ? (
        <Text style={[styles.noNotifications, isDarkMode && styles.darkText]}>
          No notifications available.
        </Text>
      ) : (
        <FlatList
          data={notifications}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  darkContainer: {
    backgroundColor: '#121212',
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#F4F6F6',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  darkCard: {
    backgroundColor: '#1E1E1E',
  },
  notificationText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
  darkText: {
    color: '#fff',
  },
  timeText: {
    fontSize: 12,
    color: '#666',
  },
  darkTimeText: {
    color: '#999',
  },
  noNotifications: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
    color: '#333',
  },
});
