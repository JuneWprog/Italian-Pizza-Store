import Dish from "../components/Dish";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";


const adminUser={
  "accessLevel": 1
}

const normalUser={
  "accessLevel": 0
}
const dish ={
  "_id": "62b2720be84b5dc1b1071c3a",
  "name": "Ginger Ale",
  "category": {
      "_id": "62aa2175a602525b153bb2e6",
      "name": "Drinks",
      "imagePath": "",
      "link": "drinks"
  },
  "imagePath": "89c900d7-1b29-440a-ac6d-f0f191dc9607_1655963539595.jpeg",
  "price": 2.5,
  "description": "A delicious carbonated drink made with real ginger.",
  "spice": "Mild",
  "createdOn": "2022-06-22T01:25:16.488Z",
  "updatedOn": "2022-06-23T05:52:19.670Z"
}


test("Display dishImage for in unsigned in users", () => {
  render(<Dish dish={dish}/>, { wrapper: BrowserRouter });
  const dishImage = screen.getByRole('img', {
    name: /ginger ale/i
  })
  expect(dishImage).toBeInTheDocument();
});
test("Display dish name for in unsigned in users", () => {
  render(<Dish dish={dish}/>, { wrapper: BrowserRouter });
  const dishName = screen.getByText(/ginger ale/i);
  expect(dishName).toBeInTheDocument();
});


test("Display dish description for in unsigned in users", () => {
  render(<Dish dish={dish}/>, { wrapper: BrowserRouter });
  const dishName = screen.getByText(/a delicious carbonated drink made with real ginger./i);
  expect(dishName).toBeInTheDocument();
});

test("Display dish price for in unsigned in users", () => {
  render(<Dish dish={dish}/>, { wrapper: BrowserRouter });
  const dishPrice = screen.getByText(/price:\$2\.5/i)
  expect(dishPrice).toBeInTheDocument();
});


test("Display dishImage for signed in users", () => {
  render(<Dish dish={dish} signedInUser={normalUser}/>, { wrapper: BrowserRouter });
  const dishImage = screen.getByRole('img', {
    name: /ginger ale/i
  })
  expect(dishImage).toBeInTheDocument();
});
test("Display dishImage for admin users", () => {
  render(<Dish dish={dish} signedInUser={adminUser}/>, { wrapper: BrowserRouter });
  const dishImage = screen.getByRole('img', {
    name: /ginger ale/i
  })
  expect(dishImage).toBeInTheDocument();
});

test("Display add to cart for unsigned in users", () => {
  render(<Dish dish={dish}/>, { wrapper: BrowserRouter });
  const addToCartButton = screen.getByRole('button', {
    name: /add to cart/i
  })
  expect(addToCartButton).toBeInTheDocument();
});

test("Display add to cart for normal users", () => {
  render(<Dish  dish={dish} signedInUser={normalUser}  />, { wrapper: BrowserRouter });
  const addToCartButton = screen.getByRole('button', {
    name: /add to cart/i
  })
  expect(addToCartButton).toBeInTheDocument();
});

test("Not Display add to cart button for admin users", () => {
  render(<Dish  dish={dish} signedInUser={adminUser} />, { wrapper: BrowserRouter });
  const addToCartButton = screen.queryByRole('button', {
    name: /add to cart/i
  })
  expect(addToCartButton).not.toBeInTheDocument();
});


test("Display edit button for admin", () => {
  render(<Dish  dish={dish} signedInUser={adminUser}/>, { wrapper: BrowserRouter });
  const editButton = screen.getByRole('button', {
    name: /edit \/ delete/i
  })
  expect(editButton).toBeInTheDocument();
});
test("Not Display edit button for normal user", () => {
  render(<Dish  dish={dish} signedInUser={normalUser}/>, { wrapper: BrowserRouter });
  const editButton = screen.queryByRole('button', {
    name: /edit \/ delete/i
  })
  expect(editButton).not.toBeInTheDocument();
});


test("Not Display edit button for unsigned in user", () => {
  render(<Dish  dish={dish} />, { wrapper: BrowserRouter });
  const editButton = screen.queryByRole('button', {
    name: /edit \/ delete/i
  })
  expect(editButton).not.toBeInTheDocument();
});


test("onAdd function is called when normal user click on button", async() => {
  const callBackFunction = jest.fn();
  render(<Dish signedInUser={normalUser} dish ={dish} onAdd={callBackFunction}/>, { wrapper: BrowserRouter });
  const addToCartButton = screen.getByRole('button', {
    name: /add to cart/i
  })
  await userEvent.click(addToCartButton);
  expect(callBackFunction).toHaveBeenCalledTimes(1);
});
  