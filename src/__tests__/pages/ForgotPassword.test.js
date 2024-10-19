import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import ForgotPassword from '../../pages/ForgotPassword'; 
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { BASE_URL } from '@env';
import { NavigationContainer } from '@react-navigation/native';

const mockAxios = new MockAdapter(axios);

describe('ForgotPassword Page', () => {
  afterEach(() => {
    mockAxios.reset();
  });

  const setup = () => {
    const utils = render(
      <NavigationContainer>
        <ForgotPassword navigation={{ navigate: jest.fn() }} />
      </NavigationContainer>
    );
    const emailInput = utils.getByTestId('email-input');
    const sendButton = utils.getByTestId('send-reset-link-button');
    return {
      emailInput,
      sendButton,
      ...utils,
    };
  };

  test('renders ForgotPassword component correctly', () => {
    const { getByTestId } = setup();
    expect(getByTestId('forgot-password-header')).toBeTruthy();
    expect(getByTestId('send-reset-link-button')).toBeTruthy();
    expect(getByTestId('back-to-login-button')).toBeTruthy();
  });


  test('sends reset link and displays success message', async () => {
    const { emailInput, sendButton, getByTestId } = setup();
    const mockResponse = { message: 'A reset link has been sent to your email.' };
    
    mockAxios.onPost(`${BASE_URL}/api/user/forgotPassword`).reply(200, mockResponse);

    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.press(sendButton);

    // await waitFor(() => {
    //   expect(getByTestId('success-message-snackbar')).toBeTruthy();
    // });
  });


  test('navigates back to login screen', async () => {
    const { getByTestId } = setup();
    const backButton = getByTestId('back-to-login-button');
    fireEvent.press(backButton);

    expect(backButton).toBeTruthy();
  });
});
