import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import ReportAppIssues from '../../pages/ReportAppIssues';
import { useTheme } from '../../ThemeContext/ThemeProvider';  
import { Alert } from 'react-native'; 

// Mocking useTheme
jest.mock('../../ThemeContext/ThemeProvider', () => ({
  useTheme: jest.fn(),
}));
jest.mock('axios');
// jest.mock('react-native', () => ({
//   ...jest.requireActual('react-native'),
//   Alert: {
//     alert: jest.fn(),
//   },
// }));
// Mocking @expo/vector-icons
jest.mock('@expo/vector-icons', () => ({
  MaterialIcons: (props) => <></>, // Mocking icon component as a blank element
}));
describe('ReportAppIssues', () => {
  beforeEach(() => {
    // Mocking the return value for useTheme
    useTheme.mockReturnValue({ isDarkMode: false });
  });

  it('renders correctly', () => {
    const { getByPlaceholderText, getByText } = render(<ReportAppIssues/>);
    expect(getByPlaceholderText('Enter your email')).toBeTruthy();
    expect(getByPlaceholderText("Describe the issue you're facing")).toBeTruthy();
    expect(getByText('Submit Issue')).toBeTruthy();
  });

//   it('shows error alert when email or issue is not filled', async () => {
//     const { getByText } = render(<ReportAppIssues />);
//     fireEvent.press(getByText('Submit Issue'));
//     await waitFor(() => {
//       expect(Alert.alert).toHaveBeenCalledWith('Error', 'Please fill in all fields');
//     });
//   });

//   it('shows error alert for invalid email format', async () => {
//     const { getByPlaceholderText, getByText } = render(<ReportAppIssues />);
//     fireEvent.changeText(getByPlaceholderText('Enter your email'), 'invalid-email');
//     fireEvent.changeText(getByPlaceholderText("Describe the issue you're facing"), 'Issue description');
//     fireEvent.press(getByText('Submit Issue'));
//     await waitFor(() => {
//       expect(Alert.alert).toHaveBeenCalledWith('Error', 'Invalid email format');
//     });
//   });

//   it('submits the form successfully with valid inputs', async () => {
//     const { getByPlaceholderText, getByText } = render(<ReportAppIssues />);
//     fireEvent.changeText(getByPlaceholderText('Enter your email'), 'test@example.com');
//     fireEvent.changeText(getByPlaceholderText("Describe the issue you're facing"), 'Issue description');
//     fireEvent.press(getByText('Submit Issue'));

//     await waitFor(() => {
//       expect(Alert.alert).toHaveBeenCalledWith('Success', 'Your issue has been submitted');
//     });
//   });

//   it('shows error alert if the submission fails', async () => {
//     const { getByPlaceholderText, getByText } = render(<ReportAppIssues />);
//     fireEvent.changeText(getByPlaceholderText('Enter your email'), 'test@example.com');
//     fireEvent.changeText(getByPlaceholderText("Describe the issue you're facing"), 'Issue description');
//     fireEvent.press(getByText('Submit Issue'));

//     // Simulate a failed submission (modify as per your actual submission handling)
//     await waitFor(() => {
//       expect(Alert.alert).toHaveBeenCalledWith('Error', 'Submission failed');
//     });
//   });
});
