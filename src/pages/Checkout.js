import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import { RadioButton, TextInput, Button } from "react-native-paper";
import { MaterialIcons } from '@expo/vector-icons'; 
import axios from 'axios';
import { BASE_URL } from "@env"; 
import { useRoute } from '@react-navigation/native';

export default function Checkout() {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('credit-card');
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolderName, setCardHolderName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [securityCode, setSecurityCode] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isExpired, setIsExpired] = useState(false);
  const route = useRoute();
  const {selectedclass, fromStop, toStop, bookingId, selectedSeatCount, trainName, selectedSeats, schedule, expireTime} = route.params;

  const handleConfirmBooking = async () => {
    if (!cardNumber || !cardHolderName || !expiryDate || !securityCode) {
      Alert.alert('Error', 'Please fill in all the card details.');
      return;
    }
    if (isExpired) {
      Alert.alert('Error', 'Booking has expired.');
      return;
    }

    try {
      const response = await axios.get(`${BASE_URL}/api/booking/confirmBooking/${bookingId}`);
      console.log("Booking confirmation response:", response.data);
      setIsSuccess(true);
      Alert.alert('Success', 'Your reservation has been confirmed!');
    } catch (error) {
      console.error("Failed to confirm booking:", error);
      Alert.alert("Failed to confirm booking, please try again."); // Inform the user about the error
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <MaterialIcons name="lock" size={24} color="gray" style={styles.securityIcon} />
        <Text style={styles.headerText}>
          Secured Payment : All information is fully encrypted.
        </Text>
      </View>

      <View style={styles.paymentContainer}>
        <Text style={styles.sectionTitle}>Payment Method</Text>
        <View style={styles.radioGroup}>
          <RadioButton.Group
            onValueChange={newValue => setSelectedPaymentMethod(newValue)}
            value={selectedPaymentMethod}
          >
            <View style={styles.radioItem}>
              <RadioButton value="credit-card" color = "lightblue"/>
              <Text style={styles.radioLabel}>Credit card</Text>
            </View>
            <View style={styles.radioItem}>
              <RadioButton value="debit-card" color = "lightblue"/>
              <Text style={styles.radioLabel}>Debit card</Text>
            </View>
          </RadioButton.Group>
        </View>

        <View style={styles.cardIconsContainer}>
          <Image source={require('../assets/icons8-visa-48.png')} style={styles.cardIcon} />
          <Image source={require('../assets/icons8-mastercard-48.png')} style={styles.cardIcon} />
          <Image source={require('../assets/icons8-american-express-squared-48.png')} style={styles.cardIcon} />
        </View>

        <Text style={styles.sectionTitle}>Card Details</Text>
        <TextInput
          mode="outlined"
          label="Card Number"
          value={cardNumber}
          onChangeText={setCardNumber}
          keyboardType="numeric"
          style={styles.input}
          theme={{ colors: { primary: 'lightblue' } }}
        />
        <TextInput
          mode="outlined"
          label="Card Holder's Name"
          value={cardHolderName}
          onChangeText={setCardHolderName}
          style={styles.input}
          theme={{ colors: { primary: 'lightblue' } }}
        />
        <View style={styles.expiryCVCContainer}>
          <TextInput
            mode="outlined"
            label="Expiry Date (MM/YY)"
            value={expiryDate}
            onChangeText={setExpiryDate}
            keyboardType="numeric"
            style={[styles.input, styles.expiryInput]}
            theme={{ colors: { primary: 'lightblue' } }}
          />
          <TextInput
            mode="outlined"
            label="Security Code (CVC)"
            value={securityCode}
            onChangeText={setSecurityCode}
            keyboardType="numeric"
            style={[styles.input, styles.cvcInput]}
            theme={{ colors: { primary: 'lightblue' } }}
          />
        </View>
      </View>

      <Button
        mode="contained"
        onPress={handleConfirmBooking}
        disabled={isSuccess}
        style={styles.confirmButton}
      >
        <Text style={styles.checkoutButtonText}>Confirm Reservation</Text>
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  securityIcon: {
    marginRight: 8,
  },
  headerText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'gray',
  },
  paymentContainer: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  radioGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  radioItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  radioLabel: {
    marginLeft: 8,
  },
  cardIconsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 32,
    marginLeft: 180,
  },
  cardIcon: {
    width: 50,
    height: 30,
    marginRight: 10,
  },
  input: {
    marginBottom: 16,
  },
  expiryCVCContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  expiryInput: {
    flex: 1,
    marginRight: 8,
  },
  cvcInput: {
    flex: 1,
    marginLeft: 8,
  },
  confirmButton: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginLeft: 10,
    marginTop: 10,
    alignSelf: 'center',
    marginTop: 24,
    borderRadius:10,
    backgroundColor: '#CD3F3E',
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
