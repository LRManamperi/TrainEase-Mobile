import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import AccountCreated from '../../pages/AccountCreated'; // Adjust the path based on your project structure
import { NavigationContainer } from '@react-navigation/native'; // Necessary to mock navigation

// Mocking navigation
const mockNavigate = jest.fn();

const renderComponent = () => {
  return render(
    <NavigationContainer>
      <AccountCreated navigation={{ navigate: mockNavigate }} />
    </NavigationContainer>
  );
};

describe('AccountCreated Component', () => {
  test('displays congratulatory message and navigates on button press', () => {
    const { getByText, getByTestId } = renderComponent();

    // Test if the congratulatory text appears
    expect(getByText('Congratulations!')).toBeTruthy();
    expect(getByText('Your account has been created successfully.')).toBeTruthy();

    // Find the TouchableOpacity and simulate a press
    const button = getByTestId('navigate-home-button');
    fireEvent.press(button);

    // Ensure the navigation function is called with the correct argument
    expect(mockNavigate).toHaveBeenCalledWith('Home');
  });
});
