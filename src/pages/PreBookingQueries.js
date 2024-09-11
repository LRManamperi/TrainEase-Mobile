import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import {Divider} from 'react-native-paper'
import { useTheme } from '../ThemeContext/ThemeProvider';
import { Icon } from 'react-native-elements';
import { MaterialIcons } from '@expo/vector-icons';

export default function PreBookingQueries() {
  const { isDarkMode } = useTheme();

  return (
    <ScrollView contentContainerStyle={[styles.container, isDarkMode && styles.darkContainer]}>
      <View style={styles.queryItem}>
        <MaterialIcons name="report-problem" size={24} color="gray" style={styles.icon} />
        <View style={styles.textContainer}>
          <Text style={[styles.queryTitle, isDarkMode && styles.darkText]}>Why can't I book a ticket?</Text>
          <Text style={[styles.queryAnswer, isDarkMode && styles.darkText]}>
            If you're unable to book a ticket, it may be due to no available seats, expired bookings, or a temporary service disruption. Please retry after some time.
          </Text>
        </View>
      </View>
      <Divider style={styles.divider} />

      <View style={styles.queryItem}>
      <MaterialIcons name="report-problem" size={24} color="gray" style={styles.icon} />
        <View style={styles.textContainer}>
          <Text style={[styles.queryTitle, isDarkMode && styles.darkText]}>What to do if I face payment issues?</Text>
          <Text style={[styles.queryAnswer, isDarkMode && styles.darkText]}>
            For payment issues, ensure that your payment details are correct. You can also try another method or contact your bank for more information.
          </Text>
        </View>
      </View>
      <Divider style={styles.divider} />
      <View style={styles.queryItem}>
        <Icon name="phone" size={24} style={[styles.icon, isDarkMode && styles.iconDark]} />
        <View style={styles.textContainer}>
          <Text style={[styles.queryTitle, isDarkMode && styles.darkText]}>How can I contact customer service?</Text>
          <Text style={[styles.queryAnswer, isDarkMode && styles.darkText]}>
            You can reach our customer service through the contact section on the app or by calling our hotline: 123-456-789.
          </Text>
        </View>
      </View>
      <Divider style={styles.divider} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  darkContainer: {
    backgroundColor: '#121212',
  },
  darkText: {
    color: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  queryItem: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  icon: {
    marginRight: 16,
    color: '#333',
  },
  iconDark: {
    color: '#fff',
  },
  textContainer: {
    flex: 1,
  },
  queryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  queryAnswer: {
    fontSize: 16,
    align : "left"
  },
  divider: {
    marginBottom: 16,
  },
});
