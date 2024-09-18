import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ElevatedButton from '../../components/ElevatedButton'; // Adjust the path to your component

describe('ElevatedButton Component', () => {
  it('renders correctly', () => {
    const { getByText } = render(
      <ElevatedButton text="Click Me" handlerFunc={jest.fn()} />
    );
    const buttonText = getByText('Click Me');
    expect(buttonText).toBeTruthy(); // Check if the button text is rendered
  });

  it('displays correct text', () => {
    const { getByText } = render(
      <ElevatedButton text="Submit" handlerFunc={jest.fn()} />
    );
    expect(getByText('Submit')).toBeTruthy(); // Check if the button displays the correct text
  });

  it('triggers the handler function when pressed', () => {
    const mockHandlerFunc = jest.fn();
    const { getByText } = render(
      <ElevatedButton text="Click Me" handlerFunc={mockHandlerFunc} />
    );

    const button = getByText('Click Me');
    fireEvent.press(button); // Simulate button press
    expect(mockHandlerFunc).toHaveBeenCalledTimes(1); // Check if the handler function is called once
  });
});
