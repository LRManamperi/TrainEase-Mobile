import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import RegisterScreen from "../pages/RegisterScreen"; // Adjust the import path if necessary
import axios from "axios";
import { BASE_URL } from "@env";

// Mock axios
jest.mock("axios");

const mockStore = configureStore([]);

describe("RegisterScreen Component", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      user: {
        loading: false,
        error: null,
        currentUser: null,
      },
    });
  });

  test("renders registration form correctly", () => {
    const { getByPlaceholderText, getByText } = render(
      <Provider store={store}>
        <RegisterScreen />
      </Provider>
    );

    // Check if the input fields and button are rendered
    expect(getByPlaceholderText("Username")).toBeTruthy();
    expect(getByPlaceholderText("Email Address")).toBeTruthy();
    expect(getByPlaceholderText("Phone Number")).toBeTruthy();
    expect(getByPlaceholderText("Password")).toBeTruthy();
    expect(getByText("Register")).toBeTruthy();
  });

  test("displays validation error if fields are empty", () => {
    const { getByText } = render(
      <Provider store={store}>
        <RegisterScreen />
      </Provider>
    );

    const registerButton = getByText("Register");
    fireEvent.press(registerButton);

    expect(Alert.alert).toHaveBeenCalledWith("Validation Error", "Please fill in all required fields.");
  });

  test("submits form successfully", async () => {
    axios.post.mockResolvedValueOnce({
      data: { username: "testuser" },
    });

    const { getByPlaceholderText, getByText } = render(
      <Provider store={store}>
        <RegisterScreen />
      </Provider>
    );

    fireEvent.changeText(getByPlaceholderText("Username"), "testuser");
    fireEvent.changeText(getByPlaceholderText("Email Address"), "test@example.com");
    fireEvent.changeText(getByPlaceholderText("Phone Number"), "1234567890");
    fireEvent.changeText(getByPlaceholderText("Password"), "password");

    fireEvent.press(getByText("Register"));

    await waitFor(() => expect(axios.post).toHaveBeenCalledWith(
      `${BASE_URL}/api/register`,
      {
        username: "testuser",
        email: "test@example.com",
        phone: "1234567890",
        password: "password",
      },
      { headers: { "Content-Type": "application/json" } }
    ));

    expect(navigation.navigate).toHaveBeenCalledWith("AccountCreated");
  });

  test("displays error message on failed registration", async () => {
    axios.post.mockRejectedValueOnce({ response: { data: { message: "Registration failed" } } });

    const { getByPlaceholderText, getByText } = render(
      <Provider store={store}>
        <RegisterScreen />
      </Provider>
    );

    fireEvent.changeText(getByPlaceholderText("Username"), "testuser");
    fireEvent.changeText(getByPlaceholderText("Email Address"), "test@example.com");
    fireEvent.changeText(getByPlaceholderText("Phone Number"), "1234567890");
    fireEvent.changeText(getByPlaceholderText("Password"), "password");

    fireEvent.press(getByText("Register"));

    await waitFor(() => expect(Alert.alert).toHaveBeenCalledWith(
      "Registration Failed",
      "Registration failed"
    ));
  });
});
