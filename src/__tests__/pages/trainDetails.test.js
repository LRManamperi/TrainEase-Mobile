import React from "react";
import { render, waitFor, fireEvent } from "@testing-library/react-native";
import TrainDetails from "../../pages/trainDetails";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../../ThemeContext/ThemeProvider";

// Mock axios and navigation
jest.mock("axios");
jest.mock("@react-navigation/native", () => ({
  useNavigation: jest.fn(),
}));

jest.mock("../../ThemeContext/ThemeProvider", () => ({
  useTheme: jest.fn(() => ({ isDarkMode: false })),
}));

describe("TrainDetails Component", () => {
  const mockNavigate = jest.fn();
  const mockRoute = {
    params: {
      schedule: { _id: "schedule123", trainRef: { name: "Express Train" } },
      fromStop: { _id: "fromStop123", departureTime: "09:00", price: 500 },
      toStop: { _id: "toStop123", arrivalTime: "12:00", price: 800 },
      date: "2024-09-18",
    },
  };

  beforeEach(() => {
    useNavigation.mockReturnValue({ navigate: mockNavigate });
  });

  it("should render loading indicator while fetching data", () => {
    axios.get.mockResolvedValueOnce({ data: null });
    
    const { getByTestId } = render(<TrainDetails route={mockRoute} />);

    expect(getByTestId("loading-indicator")).toBeTruthy();
  });

  it("should display train details after fetching data", async () => {
    const trainDetailsMock = {
      fromStation: "Station A",
      toStation: "Station B",
      coachTypes: [
        {
          _id: "class1",
          name: "First Class",
          priceFactor: 1.5,
          available: true,
          facilities: ["Air Conditioning", "Wi-Fi", "Power Outlet"],
        },
      ],
    };

    axios.get.mockResolvedValueOnce({ data: trainDetailsMock });

    const { getByText } = render(<TrainDetails route={mockRoute} />);

    await waitFor(() => {
      expect(getByText("Station A")).toBeTruthy();
      expect(getByText("Station B")).toBeTruthy();
      expect(getByText("First Class")).toBeTruthy();
      expect(getByText("Rs. 450.00")).toBeTruthy(); // Calculated price (300 * 1.5)
    });
  });

  it("should navigate to SeatSelection screen on class selection", async () => {
    const trainDetailsMock = {
      fromStation: "Station A",
      toStation: "Station B",
      coachTypes: [
        {
          _id: "class1",
          name: "First Class",
          priceFactor: 1.5,
          available: true,
          facilities: ["Air Conditioning", "Wi-Fi", "Power Outlet"],
        },
      ],
    };

    axios.get.mockResolvedValueOnce({ data: trainDetailsMock });

    const { getByText } = render(<TrainDetails route={mockRoute} />);

    await waitFor(() => {
      expect(getByText("First Class")).toBeTruthy();
    });

    fireEvent.press(getByText("First Class"));

    expect(mockNavigate).toHaveBeenCalledWith("SeatSelection", {
      selectedClass: {
        _id: "class1",
        name: "First Class",
        priceFactor: 1.5,
      },
      schedule: mockRoute.params.schedule,
      fromStop: mockRoute.params.fromStop,
      toStop: mockRoute.params.toStop,
      date: mockRoute.params.date,
    });
  });

  // it("should show alert if class is not available", async () => {
  //   const trainDetailsMock = {
  //     fromStation: "Station A",
  //     toStation: "Station B",
  //     coachTypes: [
  //       {
  //         _id: "class1",
  //         name: "First Class",
  //         priceFactor: 1.5,
  //         available: false,
  //         facilities: ["Air Conditioning", "Wi-Fi", "Power Outlet"],
  //       },
  //     ],
  //   };

  //   axios.get.mockResolvedValueOnce({ data: trainDetailsMock });

  //   const alertMock = jest.spyOn(Alert, 'alert');
  //   const { getByText } = render(<TrainDetails route={mockRoute} />);

  //   await waitFor(() => {
  //     expect(getByText("First Class")).toBeTruthy();
  //   });

  //   fireEvent.press(getByText("First Class"));

  //   expect(alertMock).toHaveBeenCalledWith(
  //     "This class is not available",
  //     "Please select another class option."
  //   );
  // });
});
