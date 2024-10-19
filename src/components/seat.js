import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Seat = ({ seat, isBooked, isSelected, onSeatSelection }) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          left: seat.position[0],
          top: seat.position[1],
          backgroundColor: isBooked ? '#ff9999' : isSelected ? '#99ff99' : 'white',
        },
      ]}
      disabled={isBooked}
      onPress={() => onSeatSelection(seat._id)}
       testID="seat-button"
    >
      <View style={styles.iconContainer}>
        <Icon testID="seat-icon" name="chair" size={32} color="black" />
        <Text style={styles.seatName}>{seat.name}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    width: 55,
    height: 60,
    minWidth: 50,
    minHeight: 60,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 4,
    transition: 'background-color 0.3s',
    alignItems: 'center',
    justifyContent: 'center'
  },
  iconContainer: {
    alignItems: 'center'
  },
  seatName: {
    marginTop: 5,
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default Seat;
