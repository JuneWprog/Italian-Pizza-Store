import SignInLink from "../components/SignInLink";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

const signedInUser = {
  firstName: "John",
};
const adminUser = {
  accessLevel: 1,
};

const normalUser = {
  accessLevel: 0,
};

const resetCartItems = jest.fn();
const setLoggedInUser = jest.fn();

beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => undefined);
});

afterAll(() => {
  console.error.mockRestore();
});

test("should display sign In button when user not signed in", () => {
  render(<SignInLink />, {
    wrapper: BrowserRouter,
  });
  const signInButton = screen.getByRole("button", {
    name: /sign in/i,
  });
  expect(signInButton).toBeInTheDocument();
});

test("user signed in should display signedIn button", () => {
  render(<SignInLink signedInUser={signedInUser} />, {
    wrapper: BrowserRouter,
  });
  const signedInButton = screen.getByRole("button", {
    name: /signed in user/i,
  });
  expect(signedInButton).toBeInTheDocument();
});

test("should display 2 buttons for admin users", async () => {
  render(<SignInLink signedInUser={adminUser} />, {
    wrapper: BrowserRouter,
  });
  const signedInButton = screen.getByRole("button", {
    name: /signed in user/i,
  });
  await userEvent.click(signedInButton);
  const profileLink = screen.getByRole("link", {
    name: /your profile/i,
  });
  const logout = screen.getByRole("button", {
    name: /logout/i,
  });
  expect(profileLink).toBeInTheDocument();
  expect(logout).toBeInTheDocument();
});

test("should display 4 buttons for normal users", async () => {
  render(<SignInLink signedInUser={normalUser} />, {
    wrapper: BrowserRouter,
  });
  const signedInButton = screen.getByRole("button", {
    name: /signed in user/i,
  });
  await userEvent.click(signedInButton);
  const profileLink = screen.getByRole("link", {
    name: /your profile/i,
  });
  const logout = screen.getByRole("button", {
    name: /logout/i,
  });
  const cartLink = screen.getByRole("link", {
    name: /your shopping cart/i,
  });
  const orderLink = screen.getByRole("link", {
    name: /your orders/i,
  });
  expect(profileLink).toBeInTheDocument();
  expect(logout).toBeInTheDocument();
  expect(cartLink).toBeInTheDocument();
  expect(orderLink).toBeInTheDocument();
});

test("clean up when normal users log out", async () => {
  render(
    <SignInLink
      signedInUser={normalUser}
      resetCartItems={resetCartItems}
      setLoggedInUser={setLoggedInUser}
    />,
    {
      wrapper: BrowserRouter,
    }
  );
  const signedInButton = screen.getByRole("button", {
    name: /signed in user/i,
  });
  await userEvent.click(signedInButton);

  const logout = screen.getByRole("button", {
    name: /logout/i,
  });
  expect(logout).toBeInTheDocument();
    await userEvent.click(logout);
    expect(resetCartItems).toHaveBeenCalledWith([]);
    expect(setLoggedInUser).toHaveBeenCalledWith(null);
});
