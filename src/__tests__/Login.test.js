import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import Login from "../Login";  // Adjust path as necessary
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { loginStart, loginSuccess, loginFailure } from "../redux/userSlice";  // Import your redux actions

// Mock axios and react-redux
const mockAxios = new MockAdapter(axios);
jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

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
    mockAxios.reset();  // Reset axios mock between tests
  });

  test("should render login form and validate empty fields", async () => {
    const { getByPlaceholderText, getByText } = render(<Login navigation={mockNavigation} />);
    
    fireEvent.press(getByText("Login"));

    await waitFor(() => {
      expect(getByText("Validation Error")).toBeTruthy();
      expect(getByText("Please fill in all required fields.")).toBeTruthy();
    });
  });

  test("should show error on failed login", async () => {
    // Mock failed login response
    mockAxios.onPost(`${process.env.BASE_URL}/api/user/login`).reply(401, {
      message: "Login failed",
    });

    const { getByPlaceholderText, getByText } = render(<Login navigation={mockNavigation} />);
    
    fireEvent.changeText(getByPlaceholderText("Username"), "testuser");
    fireEvent.changeText(getByPlaceholderText("Password"), "wrongpassword");

    fireEvent.press(getByText("Login"));

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith(loginStart());
      expect(dispatch).toHaveBeenCalledWith(loginFailure("Login failed"));
    });

    // Check error message
    expect(getByText("Login Failed")).toBeTruthy();
    expect(getByText("Please check your credentials and try again.")).toBeTruthy();
  });

  test("should navigate to Home on successful login", async () => {
    // Mock successful login response
    mockAxios.onPost(`${process.env.BASE_URL}/api/user/login`).reply(200, {
      username: "testuser",
      token: "token123",
    });

    const { getByPlaceholderText, getByText } = render(<Login navigation={mockNavigation} />);
    
    fireEvent.changeText(getByPlaceholderText("Username"), "testuser");
    fireEvent.changeText(getByPlaceholderText("Password"), "correctpassword");

    fireEvent.press(getByText("Login"));

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith(loginStart());
      expect(dispatch).toHaveBeenCalledWith(loginSuccess({ username: "testuser", token: "token123" }));
    });

    // Verify that navigation happened
    expect(mockNavigation.navigate).toHaveBeenCalledWith("Home");
  });
});
