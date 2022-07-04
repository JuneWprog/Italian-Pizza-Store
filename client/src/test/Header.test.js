import Header  from "../components/Header";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

const adminUser={
  "accessLevel": 1
}

const normalUser={
  "accessLevel": 0
}

test("Display logo in header",() => {
  render(<Header />, { wrapper: BrowserRouter });
  const logo = screen.getByRole('img', {
    name: /logo/i
  })
  expect(logo).toBeInTheDocument();
});

test("Display search in header",() => {
  render(<Header />, { wrapper: BrowserRouter });
  const search = screen.getByRole('button', {
    name: /search icon/i
  })
  expect(search).toBeInTheDocument();
});

test("Display cart in header",() => {
  render(<Header />, { wrapper: BrowserRouter });
  const cart = screen.getByRole('button', {
    name: /shopping cart/i
  })
  expect(cart).toBeInTheDocument();
});


test("Display number of items in cart banner",  () => {
  render(<Header numberOfItemsInCart={8}/>, { wrapper: BrowserRouter });
  const cartBanner = screen.getByRole('banner', {
    name: /8 items in cart/i
  })
  expect(cartBanner).toBeInTheDocument();
});

test("Display navigation in header",  () => {
  render(<Header/>, { wrapper: BrowserRouter });
  const linksArray =screen.getAllByRole("link");
  
  expect(linksArray).toHaveLength(6);
});


test("Display sign in button in header if no user signed in",  () => {
  render(<Header />, { wrapper: BrowserRouter });
  const signInButton= screen.getByRole('button', {
    name: /sign in/i
  })
  expect(signInButton).toBeInTheDocument();
});


test("Display signed user button in header when normal user signed in",  () => {
  render(<Header signedInUser={normalUser}/>, { wrapper: BrowserRouter });
  const signInButton= screen.getByRole('button', {
    name: /signed in user/i
  })
  expect(signInButton).toBeInTheDocument();
});


test("Display signed user button in header when admin signed in",  () => {
  render(<Header signedInUser={adminUser}/>, { wrapper: BrowserRouter });
  const signInButton= screen.getByRole('button', {
    name: /signed in user/i
  })
  expect(signInButton).toBeInTheDocument();
});

test("Display Add Dish when admin signed in",  () => {
  render(<Header signedInUser={adminUser}/>, { wrapper: BrowserRouter });
  const addDishButton= screen.getByRole('link', {
    name: /add dish/i
  })
  expect(addDishButton).toBeInTheDocument();
});


test("Not Display Add Dish when normal user signed in",  () => {
  render(<Header signedInUser={normalUser}/>, { wrapper: BrowserRouter });
  const addDishButton= screen.queryByRole('link', {
    name: /add dish/i
  })
  expect(addDishButton).not.toBeInTheDocument();
});





