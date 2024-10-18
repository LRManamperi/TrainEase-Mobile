import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ContactUs from '../../pages/contactUs';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../ThemeContext/ThemeProvider';
import { useSelector } from 'react-redux';

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}));

jest.mock('../../ThemeContext/ThemeProvider', () => ({
  useTheme: jest.fn(),
}));

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

describe('ContactUs', () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    useNavigation.mockReturnValue({ navigate: mockNavigate });
  });

  it('should render the component correctly when the user is not logged in', () => {
    useTheme.mockReturnValue({ isDarkMode: false });
    useSelector.mockReturnValue({ currentUser: null });

    const { getByText, getByTestId } = render(<ContactUs />);
    
    // Check if the "Need help with recent booking?" text is displayed
    expect(getByText('Need help with recent booking?')).toBeTruthy();
    
    // Check if the login button is displayed when user is not logged in
    const loginButton = getByTestId('loginButton');
    expect(loginButton).toBeTruthy();

    // Simulate pressing the login button
    fireEvent.press(loginButton);
    expect(mockNavigate).toHaveBeenCalledWith('Login');
  });

  it('should render the component correctly when the user is logged in', () => {
    useTheme.mockReturnValue({ isDarkMode: false });
    useSelector.mockReturnValue({ currentUser: { username: 'testuser' } });

    const { getByText, queryByRole } = render(<ContactUs />);
    
    // Check if the welcome message is displayed
    expect(getByText('Hi, testuser')).toBeTruthy();
    
    // Ensure the login button is not rendered
    expect(queryByRole('button', { name: /Log in Now/i })).toBeNull();
  });

  it('should navigate to AccountSettings when the Account Settings option is clicked', () => {
    useTheme.mockReturnValue({ isDarkMode: false });
    useSelector.mockReturnValue({ currentUser: { username: 'testuser' } });

    const { getByText } = render(<ContactUs />);
    const accountSettingsOption = getByText('Account Settings');
    
    // Simulate pressing the Account Settings option
    fireEvent.press(accountSettingsOption);
    expect(mockNavigate).toHaveBeenCalledWith('AccountSettings');
  });

  it('should navigate to ManagePaymentMethods when the Manage Payment Methods option is clicked', () => {
    useTheme.mockReturnValue({ isDarkMode: false });
    useSelector.mockReturnValue({ currentUser: { username: 'testuser' } });

    const { getByText } = render(<ContactUs />);
    const managePaymentMethodsOption = getByText('Manage Payment Methods');
    
    // Simulate pressing the Manage Payment Methods option
    fireEvent.press(managePaymentMethodsOption);
    expect(mockNavigate).toHaveBeenCalledWith('ManagePaymentMethods');
  });

});
