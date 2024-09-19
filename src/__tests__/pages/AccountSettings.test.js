import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import axios from 'axios';
import AccountSettings from '../../pages/AccountSettings'; // Adjust the path if necessary
import { ThemeProvider } from '../../ThemeContext/ThemeProvider'; // Theme provider for context
import { BASE_URL } from "@env";

jest.mock('axios');

describe('AccountSettings', () => {
  const mockNavigation = {
    navigate: jest.fn(),
    goBack: jest.fn(),
  };

  beforeEach(() => {
    axios.get.mockResolvedValue({
      data: {
        username: 'testuser',
        email: 'test@example.com',
        phone: '1234567890',
      },
    });
  });

  it('renders the account settings form with fetched profile data', async () => {
    const { getByPlaceholderText } = render(
      <ThemeProvider>
        <AccountSettings navigation={mockNavigation} />
      </ThemeProvider>
    );

    // Check that inputs are initially populated with fetched data
    await waitFor(() => {
      expect(getByPlaceholderText('Username').props.value).toBe('testuser');
      expect(getByPlaceholderText('Email Address').props.value).toBe('test@example.com');
      expect(getByPlaceholderText('Phone Number').props.value).toBe('1234567890');
    });
  });

//   it('updates profile and navigates back on save', async () => {
//     axios.post.mockResolvedValue({}); // Ensure this resolves successfully
  
//     const { getByPlaceholderText, getByText } = render(
//       <ThemeProvider>
//         <AccountSettings navigation={mockNavigation} />
//       </ThemeProvider>
//     );
  
//     // Fill out the form
//     fireEvent.changeText(getByPlaceholderText('Username'), 'newusername');
//     fireEvent.changeText(getByPlaceholderText('Email Address'), 'newemail@example.com');
//     fireEvent.changeText(getByPlaceholderText('Phone Number'), '0987654321');
//     fireEvent.changeText(getByPlaceholderText('Old Password'), 'oldpassword123');
//     fireEvent.changeText(getByPlaceholderText('New Password'), 'newpassword456');
  
//     // Simulate save button press
//     fireEvent.press(getByText('Save Changes'));
  
//     // Check axios.post call
//     await waitFor(() => {
//       expect(axios.post).toHaveBeenCalled();
//     });
  
//     // Check navigation after successful save
//     await waitFor(() => {
//       expect(mockNavigation.navigate).toHaveBeenCalledWith('Home'); // Ensure 'Home' is the exact string used in the navigation
//     });
  
//     // Debugging: log the number of calls to navigate
//     console.log(mockNavigation.navigate.mock.calls);
//   });
  

//     // Check navigation after successful save
//     await waitFor(() => {
//       expect(mockNavigation.navigate).toHaveBeenCalledWith('Home');
//     });
//   });

//   it('shows an alert on profile update error', async () => {
//     axios.post.mockRejectedValue(new Error('Failed to update profile'));

//     const { getByPlaceholderText, getByText } = render(
//       <ThemeProvider>
//         <AccountSettings navigation={mockNavigation} />
//       </ThemeProvider>
//     );

//     // Fill out the form
//     fireEvent.changeText(getByPlaceholderText('Username'), 'newusername');
//     fireEvent.changeText(getByPlaceholderText('Email Address'), 'newemail@example.com');
//     fireEvent.changeText(getByPlaceholderText('Phone Number'), '0987654321');
//     fireEvent.changeText(getByPlaceholderText('Old Password'), 'oldpassword123');
//     fireEvent.changeText(getByPlaceholderText('New Password'), 'newpassword456');

//     // Simulate save button press
//     const saveButton = getByText('Save Changes');
//     fireEvent.press(saveButton);

//     await waitFor(() => {
//       expect(axios.post).toHaveBeenCalled();
//     });

    
});
