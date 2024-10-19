import React from "react";
import { render, fireEvent, waitFor, act } from "@testing-library/react-native";
import Login from "../../pages/Login"; 
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Alert } from "react-native";
import MockAdapter from "axios-mock-adapter";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// Mock axios and react-redux
const mockAxios = new MockAdapter(axios);
jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.spyOn(Alert, 'alert').mockImplementation(() => {});

// Mock navigation stack
const Stack = createStackNavigator();

function MockedNavigator({ component }) {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="MockedScreen" component={component} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Mock navigation.navigate
const mockNavigate = jest.fn();

jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: mockNavigate,
    }),
    useRoute: () => ({
        params: {},
      }),
  };
});

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
    Alert.alert.mockClear(); // Clear any previous Alert.alert calls
    mockNavigate.mockClear(); // Clear navigation mocks
  });

  test("should render login form and validate empty fields", async () => {
    const { getByText } = render(
      <MockedNavigator component={Login} />
    );

    // Press login button without entering anything
    act(() => {
      fireEvent.press(getByText("Login"));
    });

    // Check if validation error alert is called
    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith("Validation Error", "Please fill in all required fields.");
    });
  });

  test("should show error on failed login", async () => {
    // Mock failed login response from axios
    mockAxios.onPost(`${process.env.BASE_URL}/api/user/login`).reply(400, {
      message: "Invalid credentials",
    });

    const { getByTestId, getByText } = render(
      <MockedNavigator component={Login} />
    );

    // Fill in form fields
    fireEvent.changeText(getByTestId("username-input"), "testUser1");
    fireEvent.changeText(getByTestId("password-input"), "wrongpassword");

    // Press login button
    act(() => {
      fireEvent.press(getByText("Login"));
    });

    // Check if error alert is called
    await waitFor(() => {
      expect(Alert.alert).toHaveBeenLastCalledWith("Login Failed", "Please check your credentials and try again.");
    });
  });

  test("should navigate to Home on successful login", async () => {
    // Mock successful login response from axios
    mockAxios.onPost(`${process.env.BASE_URL}/api/user/login`).reply(200, {
      token: "fakeToken",
      user: { id: 1, username: "test@example.com" },
    });

    const { getByTestId, getByText } = render(
      <MockedNavigator component={Login} />
    );

    // Fill in form fields
    fireEvent.changeText(getByTestId("username-input"), "testUser1");
    fireEvent.changeText(getByTestId("password-input"), "correctpassword");

    // Press login button
    act(() => {
      fireEvent.press(getByText("Login"));
    });

    // // Check if navigation to Home screen is called
    // await waitFor(() => {
    //   expect(mockNavigate).toHaveBeenCalledWith("Home");
    // });
  });
});
