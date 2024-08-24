import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment';

const MyBookings = ({ navigation }) => {
  const currentDate = moment();

  // Sort bookings in descending order based on the date
  const sortedBookings = bookings.sort((a, b) => moment(b.dateTime, 'M/D/YYYY h.mmA') - moment(a.dateTime, 'M/D/YYYY h.mmA'));

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.header}>Booking History</Text>
      </View>
      {sortedBookings.map((booking, index) => {
        const bookingDate = moment(booking.dateTime, 'M/D/YYYY h.mmA');
        const isPastBooking = bookingDate.isBefore(currentDate);

        return (
          <TouchableOpacity key={index} style={styles.option}>
            <View style={styles.optionTextContainer}>
              <Text style={styles.optionText}>{booking.trainName}</Text>
              <Text style={styles.optionSubText}>{booking.dateTime}</Text>
              <Text style={styles.optionSubText}>Passengers: {booking.passengers}</Text>
              <Text style={styles.optionSubText}>Total Amount: {booking.amount}</Text>
            </View>
            {!isPastBooking && (
              <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.navigate('cancel')}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            )}
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

const bookings = [
  {
    trainName: 'Galu Kumari',
    dateTime: '7/16/2024 8.00A.M.',
    passengers: 4,
    amount: 'Rs. 2000.00',
  },
  {
    trainName: 'Ruhunu Kumari',
    dateTime: '7/18/2024 9.00A.M.',
    passengers: 2,
    amount: 'Rs. 1000.00',
  },
  {
    trainName: 'Udarata Menike',
    dateTime: '7/20/2024 6.00A.M.',
    passengers: 1,
    amount: 'Rs. 500.00',
  },
  {
    trainName: 'Podi Menike',
    dateTime: '7/22/2024 7.00A.M.',
    passengers: 3,
    amount: 'Rs. 1500.00',
  },
  {
    trainName: 'Yal Devi',
    dateTime: '7/24/2024 5.00A.M.',
    passengers: 5,
    amount: 'Rs. 2500.00',
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    width: '100%',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1C2938',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: '600',
    color: '#fff',
    marginLeft: 10,
  },
  backButton: {
    padding: 5,
    borderRadius: 50,
    backgroundColor: '#162233',
  },
  option: {
    flexDirection: 'row',
    padding: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginVertical: 1,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  optionTextContainer: {
    flex: 1,
  },
  optionText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333',
  },
  optionSubText: {
    fontSize: 14,
    color: '#666',
  },
  cancelButton: {
    backgroundColor: '#D9534F',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginLeft: 10,
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default MyBookings;
