import Login from "../components/Login";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

//setLoggedInUser, signedInUser

const adminUser={
  "accessLevel": 1
}

const normalUser={
  "accessLevel": 0
}

test("Display login Title with unsigned users", () => {
  render(<Login />, { wrapper: BrowserRouter });
  const title = screen.getByRole('heading', {
  name: /log in to your account/i
})
  expect(title).toBeInTheDocument();
});

test("Display email input with unsigned users", () => {
  render(<Login />, { wrapper: BrowserRouter });
  const inputEmail = screen.getByRole('textbox', {
    name: /email address \*/i
  })
  expect(inputEmail).toBeInTheDocument();
});

test("Display password input with unsigned users", () => {
  render(<Login />, { wrapper: BrowserRouter });
  const passwordInput = screen.getByLabelText(/password \*/i)
  expect(passwordInput).toBeInTheDocument();
});


test("email input changes when users type", async() => {
  render(<Login />, { wrapper: BrowserRouter });
  const inputEmail = screen.getByLabelText('Email Address *')
  
  expect(inputEmail).toBeInTheDocument();
  await userEvent.type(inputEmail, "test@gmail.com");
  expect(inputEmail).toHaveValue("test@gmail.com"); 
});

test("password input changes when users type", async() => {
  render(<Login/>, { wrapper: BrowserRouter });
  const passwordInput = screen.getByLabelText('Password *')
  
  expect(passwordInput).toBeInTheDocument();
  await userEvent.type(passwordInput, "^R8bAjhnzkVJ+r$U");
  expect(passwordInput).toHaveValue("^R8bAjhnzkVJ+r$U"); 
});

test("display button", () => {
  render(<Login/>, { wrapper: BrowserRouter });
  const loginButton=screen.getByRole('button', {name: /sign in/i});
  expect(loginButton).toBeInTheDocument();
});

test("display do have account", () => {
  render(<Login/>, { wrapper: BrowserRouter });
  const noAccountMessage=screen.getByText(/do not have an account\?/i);
  expect(noAccountMessage).toBeInTheDocument();
});

test("display register link", async() => {
  render(<Login/>, { wrapper: BrowserRouter });
  const registerLink=screen.getByRole('link', {
    name: /register now/i
  })
  expect(registerLink).toBeInTheDocument();

});

