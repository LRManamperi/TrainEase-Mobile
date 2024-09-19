import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import Notifications from '../../pages/Notifications';
import { Text } from 'react-native';
import { ThemeProvider } from '../../ThemeContext/ThemeProvider';
import LoadingSpinner from '../../components/LoadingSpinner';

// Mock the LoadingSpinner component
jest.mock('../../components/LoadingSpinner', () => {
    const { Text } = require('react-native');
    return () => <Text>MockedLoadingSpinner</Text>;
  });

describe('Notifications Component', () => {
  it('displays a loading spinner while fetching notifications', () => {
    const { getByText } = render(
      <ThemeProvider>
        <Notifications />
      </ThemeProvider>
    );
    
    expect(getByText('MockedLoadingSpinner')).toBeTruthy();
  });

//   it('displays "No notifications available." if no notifications are found', async () => {
//     const { getByText } = render(
//       <ThemeProvider>
//         <Notifications />
//       </ThemeProvider>
//     );
    
//     await waitFor(() => {
//       expect(getByText('No notifications available.')).toBeTruthy();
//     });
//   });

  it('renders the correct number of notifications', async () => {
    const { getByText } = render(
      <ThemeProvider>
        <Notifications />
      </ThemeProvider>
    );

    await waitFor(() => {
      expect(getByText('Your train is delayed by 30 minutes.')).toBeTruthy();
      expect(getByText('Booking confirmed for Galu Kumari.')).toBeTruthy();
      expect(getByText('Your seat has been upgraded to First Class.')).toBeTruthy();
      expect(getByText('Uttara Devi is now departing from Platform 3.')).toBeTruthy();
    });
  });

  it('renders timestamps correctly for notifications', async () => {
    const { getAllByText } = render(
      <ThemeProvider>
        <Notifications />
      </ThemeProvider>
    );

    await waitFor(() => {
      const timestamps = getAllByText(/\d{1,2}\/\d{1,2}\/\d{4}, \d{1,2}:\d{2}:\d{2}/);
      expect(timestamps.length).toBe(4);
    });
  });
});
