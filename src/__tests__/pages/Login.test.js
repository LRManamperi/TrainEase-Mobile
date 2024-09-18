import React from "react";
import { render, fireEvent, waitFor, act } from "@testing-library/react-native";
import Login from "../../pages/Login"; // Adjust path as necessary
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Alert } from "react-native";
import MockAdapter from "axios-mock-adapter";
import { loginStart, loginSuccess, loginFailure } from "../../redux/userSlice"; // Import your redux actions

// Mock axios and react-redux
const mockAxios = new MockAdapter(axios);
jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock("react-native-gesture-handler", () => ({
  GestureHandlerRootView: jest.fn().mockReturnValue(null),
  TouchableOpacity: jest.fn().mockReturnValue(null),
  // Expand if necessary
}));
jest.spyOn(Alert, 'alert').mockImplementation(() => {});

// Mock navigation prop
const mockNavigation = {
  navigate: jest.fn(),
};

describe("Login Component", () => {
  let dispatch;

  beforeEach(() => {
    dispatch = jest.fn();
    useDispatch.mockReturnValue(dispatch);
    useSelector.mockReturnValue({
      error: null,
      loading: false,
      currentUser: null,
    });
    mockAxios.reset(); // Reset axios mock between tests
  });

  test("should render login form and validate empty fields", async () => {
    const { getByText, queryByText } = render(<Login navigation={mockNavigation} />);

    // Press login button without entering anything
    act(() => {
      fireEvent.press(getByText("Login"));
    });

    // Check if validation error alert is called
    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith("Validation Error", "Please fill in all required fields.");
    });

    // Check if error message is displayed in the UI
    expect(queryByText("Please fill in all required fields.")).toBeNull(); // Expecting null as it's shown via Alert
  });

  test("should show error on failed login", async () => {
    // Mock failed login response from axios
    mockAxios.onPost(`${process.env.BASE_URL}/api/login`).reply(401, {
      message: "Login failed",
    });

    const { getByTestId, getByText } = render(<Login navigation={mockNavigation} />);

    // Find the username and password inputs using testID and change their values
    act(() => {
      fireEvent.changeText(getByTestId("username-input"), "testuser");
      fireEvent.changeText(getByTestId("password-input"), "wrongpassword");
    });

    // Press login button
    act(() => {
      fireEvent.press(getByText("Login"));
    });

    await waitFor(() => {
      // Check if redux actions were called for failed login
      expect(dispatch).toHaveBeenCalledWith(loginStart());
      expect(dispatch).toHaveBeenCalledWith(loginFailure("Login failed"));
    });

    // Check if Alert was called with the correct error message
    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith(
        "Login Failed",
        "Please check your credentials and try again."
      );
    });
  });
});

  

//   test("should navigate to Home on successful login", async () => {
//     // Mock successful login response from axios
//     mockAxios.onPost(`${process.env.BASE_URL}/api/login`).reply(200, {
//       username: "testuser",
//       token: "token123",
//     });

//     const { getByTestId, getByText } = render(<Login navigation={mockNavigation} />);

//     // Enter valid credentials
//     fireEvent.changeText(getByTestId("username-input"), "testuser");
//     fireEvent.changeText(getByTestId("password-input"), "correctpassword");
  

//     // Press login button
//     fireEvent.press(getByText("Login"));

//     await waitFor(() => {
//       // Check if redux actions were called for successful login
//       expect(dispatch).toHaveBeenCalledWith(loginStart());
//       expect(dispatch).toHaveBeenCalledWith(loginSuccess({ username: "testuser", token: "token123" }));
//     });

//     // Check if navigation to Home occurred
//     expect(mockNavigation.navigate).toHaveBeenCalledWith("Home");
//   });

