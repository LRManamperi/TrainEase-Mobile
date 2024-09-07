import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import myBookings from './myBookings';
import {navigate} from '@react-navigation/native';



const Profile = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Easier bookings, fast refunds</Text>
        {/* handle routes appropriately when other pages are done///// */}
        <TouchableOpacity style={styles.loginLink} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.subHeader}>Log in to start your booking</Text>
          <Icon name="chevron-right" size={16} color="#fff" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('myBookings')}>
        <Icon name="book" size={24} style={styles.icon} />
        <View style={styles.optionTextContainer}>
          <Text style={styles.optionText}>Booking History</Text>
          <Text style={styles.optionSubText}>View your travel bookings</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('Transactions')}>
        <Icon name="exchange" size={24} style={styles.icon} />
        <View style={styles.optionTextContainer}>
          <Text style={styles.optionText}>Transactions</Text>
          <Text style={styles.optionSubText}>View your transaction history</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('Notifications')}>
        <Icon name="bell" size={24} style={styles.icon} />
        <View style={styles.optionTextContainer}>
          <Text style={styles.optionText}>Notifications</Text>
          <Text style={styles.optionSubText}>View all your notifications</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('ShareApp')}>
        <Icon name="share-alt" size={24} style={styles.icon} />
        <View style={styles.optionTextContainer}>
          <Text style={styles.optionText}>Share App</Text>
          <Text style={styles.optionSubText}>Share via link</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('ReportAppIssues')}>
        <Icon name="exclamation-triangle" size={24} style={styles.icon} />
        <View style={styles.optionTextContainer}>
          <Text style={styles.optionText}>Report App Issues</Text>
          <Text style={styles.optionSubText}>Share your feedback and help us improve</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('Settings')}>
        <Icon name="cog" size={24} style={styles.icon} />
        <View style={styles.optionTextContainer}>
          <Text style={styles.optionText}>Settings</Text>
          <Text style={styles.optionSubText}>Set notifications and others</Text>
        </View>
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
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'flex-start',
  },
  loginLink: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 5,
  },
  subHeader: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'flex-start',
    marginRight: 5,
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
    justifyContent: 'center',
  },
  optionText: {
    fontSize: 16,
  },
  optionSubText: {
    fontSize: 14,
    color: '#666',
  },
});

export default Profile;
