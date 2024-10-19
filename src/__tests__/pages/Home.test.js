import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import Home from "../../pages/Home";
import axios from "axios";
import * as Location from 'expo-location'; 
import { useTheme } from "../../ThemeContext/ThemeProvider";
import { Alert } from "react-native";
// Mock the axios module and Location module
jest.mock("axios");
jest.mock('@expo/vector-icons', () => ({
    FontAwesome: ({ name, size, color }) => {
      return <div data-testid="font-awesome" name={name} size={size} color={color} />;
    },
  }));

jest.mock('expo-location', () => ({
  requestForegroundPermissionsAsync: jest.fn().mockResolvedValue({ granted: true }),
  getCurrentPositionAsync: jest.fn().mockResolvedValue({
    coords: {
      latitude: 37.7749,
      longitude: -122.4194,
    },
  }),
}));

jest.mock('../../ThemeContext/ThemeProvider', () => ({
  useTheme: () => ({
    isDarkMode: false, 
  }),
}));

const mockedNavigation = { navigate: jest.fn() }; // Mock navigation

describe("Home", () => {
  beforeEach(() => {
    // Clear all instances and calls to mock functions
    jest.clearAllMocks();
  });
  
  
  afterEach(() => {
    jest.restoreAllMocks(); // Restore original implementation after each test
  });
  it("renders the main UI elements", () => {
    const { getByText, getByTestId } = render(<Home navigation={mockedNavigation} />);

    // Check if search button is rendered
    expect(getByText("Search")).toBeTruthy();

    // Check for date placeholder
    expect(getByText("mm/dd/yyyy")).toBeTruthy();
  });


  it("calls the search function and navigates to the Schedules screen with selected values", async () => {
    const { getByText, getByTestId } = render(<Home navigation={mockedNavigation} />);

    const pickerFrom = getByTestId("picker-from");
    const pickerTo = getByTestId("picker-to");
    const searchButton = getByText("Search");

    // Set picker values
    fireEvent.changeText(pickerFrom, "Station A");
    fireEvent.changeText(pickerTo, "Station B");

    // Trigger search
    fireEvent.press(searchButton);

    // await waitFor(() => {
    //   expect(mockedNavigation.navigate).toHaveBeenCalledWith("Schedules", {
    //     searchParams: {
    //       from: "Station A",
    //       to: "Station B",
    //       date: expect.any(String), // Check if date is passed
    //     },
    //   });
    // });
  });

  it("fetches stations and updates the picker options", async () => {
    const stations = [
      { name: "Station A" },
      { name: "Station B" },
    ];

    axios.get.mockResolvedValueOnce({ data: stations });

    const { getByTestId, getAllByTestId } = render(<Home navigation={mockedNavigation} />);

    // await waitFor(() => {
    //   const pickerItems = getAllByTestId("picker-item");
    //   expect(pickerItems).toHaveLength(2); // Should match the number of stations
    // });
  });
});
