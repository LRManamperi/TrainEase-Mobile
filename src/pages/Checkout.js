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
import { MaterialIcons } from '@expo/vector-icons'; // Assuming you are using Expo

export default function Checkout() {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('credit-card');
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolderName, setCardHolderName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [securityCode, setSecurityCode] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleConfirmBooking = () => {
    if (!cardNumber || !cardHolderName || !expiryDate || !securityCode) {
      Alert.alert('Error', 'Please fill in all the card details.');
      return;
    }
    setIsSuccess(true);
    Alert.alert('Success', 'Your reservation has been confirmed!');
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
              <RadioButton value="credit-card" />
              <Text style={styles.radioLabel}>Credit card</Text>
            </View>
            <View style={styles.radioItem}>
              <RadioButton value="debit-card" />
              <Text style={styles.radioLabel}>Debit card</Text>
            </View>
          </RadioButton.Group>
        </View>

        {/* <View style={styles.cardIconsContainer}>
          <Image source={require('../assets/visa-svgrepo-com.svg')} style={styles.cardIcon} />
          <Image source={require('../assets/mastercard-full-svgrepo-com.svg')} style={styles.cardIcon} />
          <Image source={require('../assets/american-express-svgrepo-com.svg')} style={styles.cardIcon} />
        </View> */}

        <Text style={styles.sectionTitle}>Card Details</Text>
        <TextInput
          mode="outlined"
          label="Card Number"
          value={cardNumber}
          onChangeText={setCardNumber}
          keyboardType="numeric"
          style={styles.input}
        />
        <TextInput
          mode="outlined"
          label="Card Holder's Name"
          value={cardHolderName}
          onChangeText={setCardHolderName}
          style={styles.input}
        />
        <View style={styles.expiryCVCContainer}>
          <TextInput
            mode="outlined"
            label="Expiry Date (MM/YY)"
            value={expiryDate}
            onChangeText={setExpiryDate}
            keyboardType="numeric"
            style={[styles.input, styles.expiryInput]}
          />
          <TextInput
            mode="outlined"
            label="Security Code (CVC)"
            value={securityCode}
            onChangeText={setSecurityCode}
            keyboardType="numeric"
            style={[styles.input, styles.cvcInput]}
          />
        </View>
      </View>

      <Button
        mode="contained"
        onPress={handleConfirmBooking}
        disabled={isSuccess}
        style={styles.confirmButton}
      >
        Confirm Reservation
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
});
