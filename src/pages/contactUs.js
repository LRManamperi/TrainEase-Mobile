import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const ContactUs = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Need help with recent booking?</Text>
        <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginButtonText}>Log in Now</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.separator} />
      <Text style={styles.quickGuidesHeader}>Quick Guides</Text>
      <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('AccountSettings')}>
        <Icon name="cog" size={24} style={styles.icon} />
        <View style={styles.optionTextContainer}>
          <Text style={styles.optionText}>Account Settings</Text>
          <Text style={styles.optionSubText}>Update email, phone no. or password</Text>
        </View>
        <Icon name="chevron-right" size={16} style={styles.chevronIcon} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('PreBookingQueries')}>
        <Icon name="question-circle" size={24} style={styles.icon} />
        <View style={styles.optionTextContainer}>
          <Text style={styles.optionText}>Pre-booking Queries</Text>
          <Text style={styles.optionSubText}>Facing issue while booking? Not able to book?</Text>
        </View>
        <Icon name="chevron-right" size={16} style={styles.chevronIcon} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('ManagePaymentMethods')}>
        <Icon name="credit-card" size={24} style={styles.icon} />
        <View style={styles.optionTextContainer}>
          <Text style={styles.optionText}>Manage Payment Methods</Text>
          <Text style={styles.optionSubText}>Delete saved cards or link/delink wallets</Text>
        </View>
        <Icon name="chevron-right" size={16} style={styles.chevronIcon} />
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    width: '100%'
  },
  headerContainer: {
    backgroundColor: '#1C2938',
    paddingVertical: 20,
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  header: {
    fontSize: 24,
    fontWeight: 'semi-bold',
    color: '#fff',
  },
  loginButton: {
    backgroundColor: '#D9534F',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 5
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  separator: {
    height: 50,
    backgroundColor: '#eee'
  },
  quickGuidesHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  option: {
    flexDirection: 'row',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    alignItems: 'center',
  },
  icon: {
    marginRight: 20,
  },
  optionTextContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  optionText: {
    fontSize: 16
  },
  optionSubText: {
    fontSize: 14,
    color: '#666',
  },
  chevronIcon: {
    color: '#666',
  },
});

export default ContactUs;
