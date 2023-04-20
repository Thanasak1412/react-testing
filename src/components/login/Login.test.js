import { render, screen, fireEvent, waitFor } from "@testing-library/react";

import Login from "./Login";

jest.mock("axios", () => ({
  __esModule: true,
  default: {
    get: () => ({
      data: {
        id: 1,
        name: "John",
      },
    }),
  },
}));

describe("Login", () => {
  it("should renders correctly the component", () => {
    render(<Login />);

    const loginPage = screen.getByText("Login Page");

    expect(loginPage).toBeInTheDocument();
  });

  it("button should be disabled, when the username and password to be null", () => {
    render(<Login />);

    const buttonElem = screen.getByRole("button", { name: "Login" });

    const usernameInputElem = screen.getByPlaceholderText("username");
    const passwordInputELem = screen.getByPlaceholderText("password");

    const testValue = "test";

    fireEvent.change(usernameInputElem, { target: { value: testValue } });
    fireEvent.change(passwordInputELem, { target: { value: testValue } });

    expect(buttonElem).not.toBeDisabled();
  });

  it("loading should not be rendered when after fetching data", async () => {
    render(<Login />);

    const buttonElem = screen.getByRole("button");
    const usernameInputElem = screen.getByPlaceholderText("username");
    const passwordInputElem = screen.getByPlaceholderText("password");

    const testValue = "test";

    fireEvent.change(usernameInputElem, { target: { value: testValue } });
    fireEvent.change(passwordInputElem, { target: { value: testValue } });
    fireEvent.click(buttonElem);

    await waitFor(() => expect(buttonElem).toHaveTextContent(/please wait/i));
  });

  it("username should be rendered after fetch", async () => {
    render(<Login />);

    const buttonElem = screen.getByRole("button");
    const usernameInputElem = screen.getByPlaceholderText("username");
    const passwordInputElem = screen.getByPlaceholderText("password");

    const testValue = "test";

    fireEvent.change(usernameInputElem, { target: { value: testValue } });
    fireEvent.change(passwordInputElem, { target: { value: testValue } });
    fireEvent.click(buttonElem);

    const user = await screen.findByText("John");

    expect(user).toBeInTheDocument();
  });
});
