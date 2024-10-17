import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CustomInput from '../../components/CustomInput'; 

describe('CustomInput Component', () => {
  it('renders correctly', () => {
    const { getByTestId } = render(
      <CustomInput
        placeholder="Enter text"
        onChange={jest.fn()}
        secureTextEntry={false}
        label="Custom Label"
        isRequired={true}
        testID="custom-input"
      />
    );
    const input = getByTestId('custom-input');
    expect(input).toBeTruthy();
  });

  it('shows error message when required field is empty', () => {
    const { getByTestId, getByText } = render(
      <CustomInput
        placeholder="Enter text"
        onChange={jest.fn()}
        secureTextEntry={false}
        label="Custom Label"
        isRequired={true}
        testID="custom-input"
      />
    );
    const input = getByTestId('custom-input');
    fireEvent.changeText(input, ''); // Simulate empty input
    fireEvent(input, 'onBlur'); // Simulate blur event

    expect(getByText('This field is required.')).toBeTruthy(); // Check if error message appears
  });

  it('does not show error when input is provided', () => {
    const { getByTestId, queryByText } = render(
      <CustomInput
        placeholder="Enter text"
        onChange={jest.fn()}
        secureTextEntry={false}
        label="Custom Label"
        isRequired={true}
        testID="custom-input"
      />
    );
    const input = getByTestId('custom-input');
    fireEvent.changeText(input, 'Test Input'); // Simulate valid input
    fireEvent(input, 'onBlur'); // Simulate blur event

    expect(queryByText('This field is required.')).toBeNull(); // Check that the error message is not shown
  });

  it('calls onChange when text is inputted', () => {
    const mockOnChange = jest.fn();
    const { getByTestId } = render(
      <CustomInput
        placeholder="Enter text"
        onChange={mockOnChange}
        secureTextEntry={false}
        label="Custom Label"
        isRequired={true}
        testID="custom-input"
      />
    );
    const input = getByTestId('custom-input');
    fireEvent.changeText(input, 'New Text');
    expect(mockOnChange).toHaveBeenCalledWith('New Text');
  });
});
