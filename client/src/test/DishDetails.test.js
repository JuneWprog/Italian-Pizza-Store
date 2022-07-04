import DishDetails from "../components/DishDetails";
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

test("Display add to cart for un-signed in user", () => {
  render(<DishDetails />, { wrapper: BrowserRouter });
  const addToCartButton = screen.getByRole('button', {
    name: /add to cart/i
  })
  expect(addToCartButton).toBeInTheDocument();
});

test("Display add to cart for normal users", () => {
  render(<DishDetails signedInUser={normalUser}  />, { wrapper: BrowserRouter });
  const addToCartButton = screen.getByRole('button', {
    name: /add to cart/i
  })
  expect(addToCartButton).toBeInTheDocument();
});

test("Display back to previous button for un-signed in user", () => {
  render(<DishDetails />, { wrapper: BrowserRouter });
  const backButton = screen.getByRole('button', {
    name: /back/i
  })
  expect(backButton).toBeInTheDocument();
});

test("Display  back to previous button for normal users", () => {
  render(<DishDetails signedInUser={normalUser}  />, { wrapper: BrowserRouter });
  const backButton = screen.getByRole('button', {
    name: /back/i
  })
  expect(backButton).toBeInTheDocument();
});

test("onAdd function is called when normal user click on button", async() => {
  const callBackFunction = jest.fn();
  render(<DishDetails signedInUser={normalUser} onAdd={callBackFunction}/>, { wrapper: BrowserRouter });
  const addToCartButton = screen.getByRole('button', {
    name: /add to cart/i
  })
  await userEvent.click(addToCartButton);
  expect(callBackFunction).toHaveBeenCalledTimes(1);
});
  
test("onAdd function is called when un-signed in user click on button", async() => {
  const callBackFunction = jest.fn();
  render(<DishDetails  onAdd={callBackFunction}/>, { wrapper: BrowserRouter });
  const addToCartButton = screen.getByRole('button', {
    name: /add to cart/i
  })
  await userEvent.click(addToCartButton);
  expect(callBackFunction).toHaveBeenCalledTimes(1);
});



test("Display Edit button for admin user", async() => {
  render(<DishDetails signedInUser={adminUser} />, { wrapper: BrowserRouter });
  const editButton = screen.getByRole('button', {
    name: /edit/i
  });
  expect(editButton).toBeInTheDocument();

});

test("Display delete button for admin user", async() => {
  render(<DishDetails signedInUser={adminUser} />, { wrapper: BrowserRouter });
  const deleteButton =screen.getByRole('button', {
    name: /delete/i
  })
  expect(deleteButton).toBeInTheDocument();
});

