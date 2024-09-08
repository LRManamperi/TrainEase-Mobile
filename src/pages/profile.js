import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { logOutStart, logOutSuccess, logOutFailure } from '../redux/userSlice';
import axios from 'axios';
import { BASE_URL } from '@env';

export default function Profile({ navigation }) {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  console.log(currentUser);

  const handleLogout = async () => {
    dispatch(logOutStart());

    try {
      await axios.get(`${BASE_URL}/api/user/logout`, null, {
        withCredentials: true,
      });

      // Dispatch logOutSuccess and navigate to the Login screen
      dispatch(logOutSuccess(userData));
      navigation.replace("Profile");
    } catch (error) {
      console.error("Logout failed:", error);
      dispatch(logOutFailure(error.response?.data?.message || "Logout failed"));
      Alert.alert("Logout Failed", "An error occurred. Please try again.");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        {currentUser ? (
          <>
            <Text style={styles.header}>Welcome, {currentUser.username}</Text>
            <Button 
              mode="contained" 
              onPress={handleLogout} 
              style={styles.logoutButton} 
              buttonColor="#D9534F" 
              textColor="#fff"
              textStyles={{ fontSize: 20, fontWeight: 'bold' }}
            >
              Logout
            </Button>
          </>
        ) : (
          <>
            <Text style={styles.header}>Easier bookings, fast refunds</Text>
            <TouchableOpacity style={styles.loginLink} onPress={() => navigation.navigate('Login')}>
              <Text style={styles.subHeader}>Log in to start your booking</Text>
              <Icon name="chevron-right" size={16} color="#fff" />
            </TouchableOpacity>
            //some animation to appear when not logged in
          </>
        )}
      </View>

      {/* Show booking options only if the user is logged in */}
      {currentUser && (
        <>
          <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('MyBookings')}>
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
        </>
      )}
    </ScrollView>
  );
}

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
  logoutButton: {
    backgroundColor: '#D9534F',
    marginLeft: 250,  
    borderRadius: 10,
  },
});
