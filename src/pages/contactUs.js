import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import Login from './Login';
import { useTheme } from '../ThemeContext/ThemeProvider';
import ManagePaymentMethods from './ManagePaymentMethods';
import { useDispatch, useSelector } from 'react-redux';


export default function ContactUs() {
  const { isDarkMode } = useTheme();
  const navigation = useNavigation();
  const {currentUser} = useSelector((state) => state.user);

  return (
    <ScrollView style={[styles.container, isDarkMode && styles.darkContainer]}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Need help with recent booking?</Text>
        {currentUser? (
          <Text style={styles.welcomeText}>Hi, {currentUser.username}</Text>
        ) : (
          <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginButtonText}>Log in Now</Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.separator} />
      <Text style={[styles.quickGuidesHeader, isDarkMode && styles.darkText]}>Quick Guides</Text>
      <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('AccountSettings')}>
        <Icon name="cog" size={24} style={[styles.icon, isDarkMode && styles.iconDark]} />
        <View style={styles.optionTextContainer}>
          <Text style={[styles.optionText, isDarkMode && styles.darkText]}>Account Settings</Text>
          <Text style={styles.optionSubText}>Update email, phone no. or password</Text>
        </View>
        <Icon name="chevron-right" size={16} style={[styles.chevronIcon, isDarkMode && styles.chevronIconDark ]} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('PreBookingQueries')}>
        <Icon name="question-circle" size={24} style={[styles.icon, isDarkMode && styles.iconDark]} />
        <View style={styles.optionTextContainer}>
          <Text style={[styles.optionText, isDarkMode && styles.darkText]}>Pre-booking Queries</Text>
          <Text style={styles.optionSubText}>Facing issue while booking? Not able to book?</Text>
        </View>
        <Icon name="chevron-right" size={16} style={[styles.chevronIcon, isDarkMode && styles.chevronIconDark ]} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('ManagePaymentMethods')}>
        <Icon name="credit-card" size={24} style={[styles.icon, isDarkMode && styles.iconDark]} />
        <View style={styles.optionTextContainer}>
          <Text style={[styles.optionText, isDarkMode && styles.darkText]}>Manage Payment Methods</Text>
          <Text style={styles.optionSubText}>Delete saved cards or link/delink wallets</Text>
        </View>
        <Icon name="chevron-right" size={16} style={[styles.chevronIcon, isDarkMode && styles.chevronIconDark ]} />
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
  darkContainer: {
    backgroundColor: '#121212',
  },
  headerContainer: {
    backgroundColor: '#1C2938',
    paddingVertical: 25,
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  header: {
    fontSize: 24,
    fontWeight: 'semi-bold',
    color: '#fff',
  },
  darkText: {
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
    height: 20,
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
  iconDark: {
    color: 'white',
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
  chevronIconDark: {
    color: 'white',
  },
  welcomeText: {
    color: '#fff',
    fontSize: 25,
    paddingVertical: 10,
    fontWeight: 'bold'
  }
});


