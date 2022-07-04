import Cart from "../components/Cart";
import { render, screen, cleanup } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";



const adminUser = {
  accessLevel: 1,
};

const normalUser = {
  accessLevel: 0,
};
const cartItems = [
  {
    name: "Fanta",
    price: 2.5,
    description: "A refreshing carbonated soft drink made with Real Fruit.",
    quantity: 2,
  },
];
const cartItems2 = [
  {
    name: "Fanta",
    price: 2.5,
    description: "A refreshing carbonated soft drink made with Real Fruit.",
    quantity: 2,
  },
  {
    name: "Ginger Ale",
    price: 3.5,
    description: "A delicious carbonated drink made with real ginger.",
    quantity:1,

  },


];

beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => undefined);
});

afterAll(() => {
  console.error.mockRestore();
});

test("No item in cart for unsigned in users", () => {
  render(<Cart cartItems={[]} />, { wrapper: BrowserRouter });
  const itemImages = screen.queryAllByRole("img");
  expect(itemImages).toHaveLength(0);
  const noItemMessage = screen.getByText(/your cart is empty/i);
  expect(noItemMessage).toBeInTheDocument();
  const addSomeButton = screen.getByRole("button", {
    name: /add food to your cart/i,
  });
  expect(addSomeButton).toBeInTheDocument();
});

test("No item in cart for normal users", () => {
  render(<Cart cartItems={[]} signedInUser={normalUser} />, {
    wrapper: BrowserRouter,
  });
  const itemImages = screen.queryAllByRole("img");
  expect(itemImages).toHaveLength(0);
  const noItemMessage = screen.getByText(/your cart is empty/i);
  expect(noItemMessage).toBeInTheDocument();
  const addSomeButton = screen.getByRole("button", {
    name: /add food to your cart/i,
  });
  expect(addSomeButton).toBeInTheDocument();
});

test("No item in cart for admin users", () => {
  render(<Cart cartItems={[]} signedInUser={adminUser} />, {
    wrapper: BrowserRouter,
  });
  const itemImages = screen.queryAllByRole("img");
  expect(itemImages).toHaveLength(0);
  const noItemMessage = screen.getByText(/your cart is empty/i);
  expect(noItemMessage).toBeInTheDocument();
  const addSomeButton = screen.getByRole("button", {
    name: /add food to your cart/i,
  });
  expect(addSomeButton).toBeInTheDocument();
});

test("Display multiple itemes for unsigned in user", () => {
  render(<Cart cartItems={cartItems2} />, { wrapper: BrowserRouter });
  const fantaImage = screen.getByRole('img', {
    name: /fanta/i
  });

  const gingerAleImage = screen.getByRole('img', {name: /ginger ale/i});
  expect(fantaImage).toBeInTheDocument();
  expect(gingerAleImage).toBeInTheDocument();
});

test("Display multiple itemes for signed in user", () => {
  render(<Cart cartItems={cartItems2} signedInUser={normalUser} />, {
    wrapper: BrowserRouter,
  });
  const fantaImage = screen.getByRole('img', {
    name: /fanta/i
  });

  const gingerAleImage = screen.getByRole('img', {name: /ginger ale/i});
  expect(fantaImage).toBeInTheDocument();
  expect(gingerAleImage).toBeInTheDocument();
});

test("Display multiple itemes for admin user", () => {
  render(<Cart cartItems={cartItems2} signedInUser={adminUser} />, {
    wrapper: BrowserRouter,
  });
  const fantaImage = screen.getByRole('img', {
    name: /fanta/i
  });

  const gingerAleImage = screen.getByRole('img', {name: /ginger ale/i});
  expect(fantaImage).toBeInTheDocument();
  expect(gingerAleImage).toBeInTheDocument();
});


test("Display item quantity", () => {
  render(<Cart cartItems={cartItems}  />, {
    wrapper: BrowserRouter,
  });
  const itemQuantities =screen.getByText(/2 x fanta/i)
  expect(itemQuantities).toBeInTheDocument();
});

test("Display item subtotal", () => {
  render(<Cart cartItems={cartItems}  />, {
    wrapper: BrowserRouter,
  });
  const itemSubtotal =screen.getByText(/\$5\.00/i)
  expect(itemSubtotal).toBeInTheDocument();
});

test("Display item description", () => {
  render(<Cart cartItems={cartItems}  />, {
    wrapper: BrowserRouter,
  });
  const itemDescrition =screen.getByText(/a refreshing carbonated soft drink made with real fruit\./i)
  expect(itemDescrition).toBeInTheDocument();
});

test("Display item price", () => {
  render(<Cart cartItems={cartItems}  />, {
    wrapper: BrowserRouter,
  });
  const itemPriceArray =screen.queryAllByText(/price: \$2\.5/i);
  expect(itemPriceArray).toHaveLength(1);
});

test("Display add one button + and function well", async () => {
  const mockCallBack = jest.fn();
  render(<Cart cartItems={cartItems}  onAdd ={mockCallBack}/>, {
    wrapper: BrowserRouter,
  });
  const addButton = screen.getByTestId('add')
  expect(addButton).toBeInTheDocument();
  await userEvent.click(addButton);
  expect(mockCallBack).toHaveBeenCalledTimes(1);
});


test("Display delete one button - and function well", async () => {
  const mockCallBack = jest.fn();
  render(<Cart cartItems={cartItems}  onRemove ={mockCallBack} />, {
    wrapper: BrowserRouter,
  });
  const deleteButton =screen.getByRole('button', {
  name: /delete/i});
  expect(deleteButton).toBeInTheDocument();
  await userEvent.click(deleteButton);
  expect(mockCallBack).toHaveBeenCalledTimes(1);
});


test("Display shipping message", () => {
  render(<Cart cartItems={cartItems}  />, {
    wrapper: BrowserRouter,
  });
  const shippingMessage =screen.getByText(/free shipping on orders of \$30 or more/i);
  expect(shippingMessage).toBeInTheDocument();
});


test("Display total number of items", () => {
  render(<Cart cartItems={cartItems}  />, {
    wrapper: BrowserRouter,
  });
  const numberOfItems =screen.getByText(/2 items/i)
  expect(numberOfItems).toBeInTheDocument();
});


test("Display sub total of items", () => {
  render(<Cart cartItems={cartItems}  />, {
    wrapper: BrowserRouter,
  });
  const subtotal =screen.getByText(/subtotal:/i)
  expect(subtotal).toBeInTheDocument();
});

test("Display tax info", () => {
  render(<Cart cartItems={cartItems}  />, {
    wrapper: BrowserRouter,
  });
  const tax =screen.getByText(/order tax gst 5%:/i)
  expect(tax).toBeInTheDocument();
});
test("Display shipping price", () => {
  render(<Cart cartItems={cartItems}  />, {
    wrapper: BrowserRouter,
  });
  const shipping =screen.getByText(/shipping:/i)
  expect(shipping).toBeInTheDocument();
});

test("Display total price of multiple items", () => {
  render(<Cart cartItems={cartItems2}  />, {
    wrapper: BrowserRouter,
  });
  const view = screen.getByText(/3items/i);
  expect(view).toBeInTheDocument();
});



test("Display add more food button", () => {
  render(<Cart cartItems={cartItems}  />, {
    wrapper: BrowserRouter,
  });
  const addMoreButton =screen.getByRole('button', {
    name: /add more food/i
  })
  expect(addMoreButton).toBeInTheDocument();
});

test("Display check out button", () => {
  render(<Cart cartItems={cartItems}  />, {
    wrapper: BrowserRouter,
  });
  const checkoutButton =screen.getByRole('button', {
    name: /check out/i
  })
  expect(checkoutButton).toBeInTheDocument();
});




