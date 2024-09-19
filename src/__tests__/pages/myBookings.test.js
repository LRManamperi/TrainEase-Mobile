import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import BookingHistory from '../../pages/myBookings'; // Adjust the path as necessary
import { useSelector } from 'react-redux';
import axios from 'axios';
import moment from 'moment';
import { Text } from 'react-native';
import { useTheme } from '../../ThemeContext/ThemeProvider';
import { useFocusEffect } from '@react-navigation/native'; // To mock useFocusEffect

// Mock necessary modules
jest.mock('axios');
jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
}));
jest.mock('../../ThemeContext/ThemeProvider', () => ({
  useTheme: jest.fn(),
}));
jest.mock('@react-navigation/native', () => ({
  useFocusEffect: jest.fn(),
}));
jest.mock('../../components/LoadingSpinner', () => () => <div testID="loading-spinner" />);

describe('BookingHistory Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('displays loading spinner while fetching data', async () => {
    // Mock Redux to return a current user
    useSelector.mockReturnValue({ currentUser: { id: '123', name: 'John Doe' } });
    // Mock the theme context for light mode
    useTheme.mockReturnValue({ isDarkMode: false });
    // Mock axios to simulate API call
    //axios.get.mockResolvedValue({ data: [] });

    render(<BookingHistory />);
    await waitFor(() => expect(screen.getByTestId('loading-spinner')).toBeTruthy());
    // Expect the loading spinner to be shown initially
    //expect(screen.getByText('Loading Spinner')).toBeTruthy();
  });

//   test('displays a message when user is not logged in', async () => {
//     // Mocking currentUser to be null to simulate user not logged in
//     useSelector.mockReturnValue({ currentUser: null });
//     useTheme.mockReturnValue({ isDarkMode: false });

//     render(<BookingHistory />);

//     // Expect to see the prompt for user login using testID
//     const loginMessage = await screen.findByTestId('login-message');
//     expect(loginMessage).toBeTruthy();
//   });

  
//   test('displays booking history when data is fetched successfully', async () => {
//     useSelector.mockReturnValue({ currentUser: { id: '123', name: 'John Doe' } });
//     useTheme.mockReturnValue({ isDarkMode: false });
  
//     // Mock axios to return booking data
//     axios.get.mockResolvedValueOnce({
//       data: [
//         {
//           _id: '1',
//           date: moment().add(1, 'day').toISOString(),
//           from: { stationRef: { name: 'Station A' } },
//           to: { stationRef: { name: 'Station B' } },
//           seats: ['1A', '1B'],
//           totalAmount: 2000,
//           scheduleRef: { trainRef: { name: 'Express Train' } },
//         },
//       ],
//     });

//     render(<BookingHistory />);

//     // Wait for bookings to be rendered
//     await waitFor(() => {
//       expect(screen.getByText('Express Train')).toBeTruthy();
//       expect(screen.getByText('From: Station A')).toBeTruthy();
//       expect(screen.getByText('To: Station B')).toBeTruthy();
//       expect(screen.getByText('Passengers: 2')).toBeTruthy();
//       expect(screen.getByText('Total Amount: 2000 LKR')).toBeTruthy();
//     });
//   });

//   test('allows cancellation of future bookings', async () => {
//     const mockBookings = [
//       {
//         _id: '1',
//         date: moment().add(1, 'day').toISOString(),
//         from: { stationRef: { name: 'Station A' } },
//         to: { stationRef: { name: 'Station B' } },
//         seats: ['1A', '1B'],
//         totalAmount: 2000,
//         scheduleRef: { trainRef: { name: 'Express Train' } },
//       },
//     ];

//     useSelector.mockReturnValue({ currentUser: { id: '123', name: 'John Doe' } });
//     useTheme.mockReturnValue({ isDarkMode: false });
//     axios.get.mockResolvedValue({ data: mockBookings });
//     axios.delete.mockResolvedValue({ status: 200 });

//     render(<BookingHistory />);

//     await waitFor(() => {
//       expect(screen.getByText('Express Train')).toBeTruthy();
//     });

//     const cancelButton = screen.getByText('Cancel');
//     fireEvent.press(cancelButton);

//     // Wait for cancel confirmation
//     await waitFor(() => {
//       expect(axios.delete).toHaveBeenCalledWith(`${BASE_URL}/api/user/cancelBooking/1`);
//     });

//     // After successful cancellation, booking should be removed
//     await waitFor(() => {
//       expect(screen.queryByText('Express Train')).toBeNull();
//     });
//   });

//   test('displays error message on failed booking cancellation', async () => {
//     const mockBookings = [
//       {
//         _id: '1',
//         date: moment().add(1, 'day').toISOString(),
//         from: { stationRef: { name: 'Station A' } },
//         to: { stationRef: { name: 'Station B' } },
//         seats: ['1A', '1B'],
//         totalAmount: 2000,
//         scheduleRef: { trainRef: { name: 'Express Train' } },
//       },
//     ];

//     useSelector.mockReturnValue({ currentUser: { id: '123', name: 'John Doe' } });
//     useTheme.mockReturnValue({ isDarkMode: false });
//     axios.get.mockResolvedValue({ data: mockBookings });
//     axios.delete.mockRejectedValue(new Error('Cancellation failed'));

//     render(<BookingHistory />);

//     await waitFor(() => {
//       expect(screen.getByText('Express Train')).toBeTruthy();
//     });

//     const cancelButton = screen.getByText('Cancel');
//     fireEvent.press(cancelButton);

//     // Wait for the error message
//     await waitFor(() => {
//       expect(screen.getByText('Error')).toBeTruthy();
//       expect(screen.getByText('Failed to cancel booking. Please try again.')).toBeTruthy();
//     });
//   });
});
