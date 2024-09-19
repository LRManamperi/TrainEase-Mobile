import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import SettingsScreen from '../../pages/Settings';
import { ThemeProvider } from '../../ThemeContext/ThemeProvider';
import { NavigationContainer } from '@react-navigation/native';

const MockNavigation = ({ children }) => (
  <NavigationContainer>
    {children}
  </NavigationContainer>
);

describe('SettingsScreen', () => {
  const renderWithTheme = (isDarkMode) => {
    return render(
      <ThemeProvider value={{ isDarkMode, toggleTheme: jest.fn() }}>
        <MockNavigation>
          <SettingsScreen />
        </MockNavigation>
      </ThemeProvider>
    );
  };

  it('renders SettingsScreen correctly in light mode', () => {
    const { getByText } = renderWithTheme(false);

    expect(getByText('Theme')).toBeTruthy();
    expect(getByText('Dark Mode')).toBeTruthy();
    expect(getByText('General Settings')).toBeTruthy();
    expect(getByText('Enable Notifications')).toBeTruthy();
    expect(getByText('Location Access')).toBeTruthy();
    expect(getByText('Account Settings')).toBeTruthy();
    expect(getByText('Change Password')).toBeTruthy();
    expect(getByText('Privacy Settings')).toBeTruthy();
  });

  it('toggles notification switch state correctly', () => {
    const { getByTestId } = renderWithTheme(false);
    const notificationSwitch = getByTestId('notification-switch');

    expect(notificationSwitch.props.value).toBe(false);

    fireEvent(notificationSwitch, 'onValueChange', true);
    expect(notificationSwitch.props.value).toBe(true);
  });

  it('toggles location switch state correctly', () => {
    const { getByTestId } = renderWithTheme(false);
    const locationSwitch = getByTestId('location-switch');

    expect(locationSwitch.props.value).toBe(false);

    fireEvent(locationSwitch, 'onValueChange', true);
    expect(locationSwitch.props.value).toBe(true);
  });

  it('navigates to ChangePassword screen when Change Password is pressed', () => {
    const { getByText } = renderWithTheme(false);
    const changePasswordItem = getByText('Change Password');

    fireEvent.press(changePasswordItem);
    // Add your expectation here for navigation
  });

  it('handles Privacy Settings navigation correctly', () => {
    const { getByText } = renderWithTheme(false);
    const privacySettingsItem = getByText('Privacy Settings');

    fireEvent.press(privacySettingsItem);
    // Add your expectation here for navigation
  });
});
