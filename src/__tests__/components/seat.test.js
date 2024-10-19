import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Seat from '../../components/seat'; 
import Icon from 'react-native-vector-icons/MaterialIcons';

describe('Seat component', () => {
  const mockSeat = {
    _id: '1',
    name: 'A1',
    position: [10, 20],
  };
  const mockOnSeatSelection = jest.fn();

  it('should render the seat correctly', () => {
    const { getByText, getByTestId } = render(
      <Seat seat={mockSeat} isBooked={false} isSelected={false} onSeatSelection={mockOnSeatSelection} />
    );

    // Check if the seat name is rendered
    expect(getByText('A1')).toBeTruthy();

    // Check if the chair icon is rendered
    const iconElement = getByTestId('seat-icon');
    expect(iconElement).toBeTruthy();
  });

  it('should apply the correct background color for booked seats', () => {
    const { getByTestId } = render(
      <Seat seat={mockSeat} isBooked={true} isSelected={false} onSeatSelection={mockOnSeatSelection} />
    );
  
    // Verify that the button has the booked background color
    const button = getByTestId('seat-button');
    expect(button.props.style.backgroundColor).toBe('#ff9999');
  });
  

  it('should call the onSeatSelection function when pressed', () => {
    const mockOnSeatSelection = jest.fn();
    const mockSeat = { _id: 'seat1', name: 'A1', position: [0, 0] };
  
    const { getByTestId } = render(
      <Seat seat={mockSeat} isBooked={false} isSelected={false} onSeatSelection={mockOnSeatSelection} />
    );
  
    // Simulate pressing the seat button
    const button = getByTestId('seat-button');
    fireEvent.press(button);
  
    // Check if the callback was called with the correct seat ID
    expect(mockOnSeatSelection).toHaveBeenCalledWith('seat1');
  });
  
  it('should disable the button if the seat is booked', () => {
    const mockSeat = { _id: 'seat1', name: 'A1', position: [0, 0] };
  
    const { getByTestId } = render(
      <Seat seat={mockSeat} isBooked={true} isSelected={false} onSeatSelection={jest.fn()} />
    );
  
    // Verify that the button is disabled
    const button = getByTestId('seat-button');
    expect(button.props.accessibilityState.disabled).toBe(true);
  });
  

  it('should apply the correct background color for selected seats', () => {
    const mockSeat = { _id: 'seat1', name: 'A1', position: [0, 0] };
  
    const { getByTestId } = render(
      <Seat seat={mockSeat} isBooked={false} isSelected={true} onSeatSelection={jest.fn()} />
    );
  
    // Verify that the button has the selected background color
    const button = getByTestId('seat-button');
    const buttonStyle = Array.isArray(button.props.style)
      ? button.props.style.find(style => style.backgroundColor)
      : button.props.style;
  
    expect(buttonStyle.backgroundColor).toBe('#99ff99');
  });
  
  
});
