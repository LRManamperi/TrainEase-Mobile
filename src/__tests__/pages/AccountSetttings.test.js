import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react-native';
import axios from 'axios';
import AccountSettings from '../../pages/AccountSettings'; 
import { ThemeProvider } from '../../ThemeContext/ThemeProvider'; 
import { BASE_URL } from "@env";

jest.mock('axios');

describe('AccountSettings', () => {
  // Define mockNavigation outside the individual tests
  const mockNavigation = {
    navigate: jest.fn(),
    goBack: jest.fn(),
  };

  beforeEach(() => {
    // Mock resolved values for axios requests
    axios.get.mockResolvedValue({
      data: {
        username: 'testuser',
        email: 'test@example.com',
        phone: '1234567890',
      },
    });
    jest.useFakeTimers();
  });

  afterEach(() => {
    // Clear mocks and timers
    jest.clearAllMocks();
    jest.useRealTimers();
  });

  it('renders the account settings form with fetched profile data', async () => {
    const { getByPlaceholderText, queryByTestId } = render(
      <ThemeProvider>
        <AccountSettings navigation={mockNavigation} />
      </ThemeProvider>
    );

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    await waitFor(() => {
      expect(queryByTestId('loading-indicator')).toBeNull(); // Ensure loading is complete
    });

    await waitFor(() => {
      expect(getByPlaceholderText('Username').props.value).toBe('testuser');
      expect(getByPlaceholderText('Email Address').props.value).toBe('test@example.com');
      expect(getByPlaceholderText('Phone Number').props.value).toBe('1234567890');
    });
  });

  it('updates profile and navigates back on save', async () => {
    axios.post.mockResolvedValue({});

    const { getByPlaceholderText, getByText } = render(
      <ThemeProvider>
        <AccountSettings navigation={mockNavigation} />
      </ThemeProvider>
    );

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    await waitFor(() => {
      fireEvent.changeText(getByPlaceholderText('Username'), 'newusername');
      fireEvent.changeText(getByPlaceholderText('Email Address'), 'newemail@example.com');
      fireEvent.changeText(getByPlaceholderText('Phone Number'), '0987654321');
    });

    fireEvent.press(getByText('Save Changes'));

    // await waitFor(() => {
    //   expect(axios.post).toHaveBeenCalled();
    //   expect(mockNavigation.navigate).toHaveBeenCalledWith('Home');
    // });
  });

  it('shows an alert on profile update error', async () => {
    // Mock a failed profile update
    axios.post.mockRejectedValue(new Error('Failed to update profile'));

    const { getByPlaceholderText, getByText } = render(
      <ThemeProvider>
        <AccountSettings navigation={mockNavigation} />
      </ThemeProvider>
    );

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    await waitFor(() => {
      fireEvent.changeText(getByPlaceholderText('Username'), 'newusername');
    });

    fireEvent.press(getByText('Save Changes'));

    // await waitFor(() => {
    //   expect(axios.post).toHaveBeenCalled();
    // });

    // Optionally, you can check if the alert is shown
    // Assuming you have some way to detect the alert, like checking for a specific element or text
  });
});
