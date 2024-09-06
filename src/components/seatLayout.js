// import React from 'react';
// import { View, StyleSheet } from 'react-native';
// import Seat from './seat'; 

// const sampleSeats = [
//     { _id: 'seat1', name: '1A', position: [10, 10] },
//     { _id: 'seat2', name: '1B', position: [80, 10] },
//     { _id: 'seat3', name: '2A', position: [10, 80] },
//     { _id: 'seat4', name: '2B', position: [80, 80] },
//   ];
  
//   const sampleBookedSeats = ['seat2'];

// const SeatLayout = ({  seats = sampleSeats, bookedSeats = sampleBookedSeats, selectedSeats = [], onSeatSelection  }) => {
//   return (
//     <View style={styles.container}>
//       {seats.map((seat) => (
//         <Seat
//           key={seat._id}
//           seat={seat}
//           onSeatSelection={onSeatSelection}
//           isBooked={bookedSeats.includes(seat._id)}
//           isSelected={selectedSeats.includes(seat._id)}
//         />
//       ))}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     position: 'relative',
//     width: '100%',
//     aspectRatio: 4 / 4.5, // Adjusted aspect ratio for seat layout
//     backgroundColor: 'white',
//     borderRadius: 8,
//     borderWidth: 1,
//     borderColor: 'lightgrey',
//     alignItems: 'center',
//     justifyContent: 'center',
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 5,
//     marginVertical: 10, // Adjusted margin for spacing
//   },
// });

// export default SeatLayout;


import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Seat from './seat';

// Get device dimensions
const { width: screenWidth } = Dimensions.get('window');

const SeatLayout = ({ seats, bookedSeats, selectedSeats, onSeatSelection }) => {
  const leftColumnSeats = seats.filter((_, index) => index % 4 < 2); // First two seats of each row
  const rightColumnSeats = seats.filter((_, index) => index % 4 >= 2); // Last two seats of each row

  return (
    <View style={styles.container}>
      {/* Left Column */}
      <View style={styles.column}>
        {leftColumnSeats.map((seat) => (
          <Seat
            key={seat._id}
            seat={seat}
            onSeatSelection={onSeatSelection}
            isBooked={bookedSeats.includes(seat._id)}
            isSelected={selectedSeats.includes(seat._id)}
          />
        ))}
      </View>

      {/* Right Column */}
      <View style={styles.rightcolumn}>
        {rightColumnSeats.map((seat) => (
          <Seat
            key={seat._id}
            seat={seat}
            onSeatSelection={onSeatSelection}
            isBooked={bookedSeats.includes(seat._id)}
            isSelected={selectedSeats.includes(seat._id)}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding:10
  },
  column: {
    flex: 1, // Each column takes 50% of the container width
    flexDirection: 'column'
  },
  rightcolumn: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: -40, 
  }
});

export default SeatLayout;
