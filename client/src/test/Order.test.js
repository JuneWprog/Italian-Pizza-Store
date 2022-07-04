import Order from "../components/Order"
import { render, screen, within} from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

const sampleOrder1={
    "_id": "62b9609faca3606e76ae9df0",
    "userId": "62af8ff6cb8924ea363c39bb",
    "totalPrice": 20.5,
    "subTotal": 10,
    "taxPrice": 0.5,
    "shippingPrice": 10,
    "address": "1 Apple Park Way, Cupertino, CA 95014, USA",
    "createdOn": "2022-06-27T07:40:42.558Z",
    "dishes": [
        {
            "dishName": "Fanta",
            "quantity": 4,
            "price": 2.5,
            "totalItemPrice": 10,
            "_id": "62b9609faca3606e76ae9df1"
        }
    ]
}

const sampleOrder2={
    "_id": "62ba61271eb85c178b7883da",
    "userId": "62af8ff6cb8924ea363c39bb",
    "totalPrice": 39.3,
    "subTotal": 27.9,
    "taxPrice": 1.4,
    "shippingPrice": 10,
    "address": "1 Apple Park Way, Cupertino, CA 95014, USA",
    "createdOn": "2022-06-27T17:59:32.712Z",
    "dishes": [
        {
            "dishName": "Wings",
            "quantity": 2,
            "price": 9.5,
            "totalItemPrice": 19,
            "_id": "62ba61271eb85c178b7883db"
        },
        {
            "dishName": "Specialty Chicken",
            "quantity": 1,
            "price": 8.9,
            "totalItemPrice": 8.9,
            "_id": "62ba61271eb85c178b7883dc"
        }
    ]
}



const adminUser={
"accessLevel": 1
}

const normalUser={
"accessLevel": 0
}
  
test("Display  order  title", () => {
    render(<BrowserRouter><Order order={sampleOrder1} /></BrowserRouter>);
    expect(screen.getByText("Italian Pizza")).toBeInTheDocument();
})

test("Display order  date", () => {
    render(<BrowserRouter><Order order={sampleOrder1} /></BrowserRouter>);
    expect(screen.getByText(/mon jun 27 2022/i)).toBeInTheDocument();
})

test("Display order  total quantity", () => {
    render(<BrowserRouter><Order order={sampleOrder1} /></BrowserRouter>);
    expect(screen.getByText(/4 items/i)).toBeInTheDocument();
})

test("Display item  quantity", () => {
    render(<BrowserRouter><Order order={sampleOrder1} /></BrowserRouter>);
    const row = screen.getByRole('row', {
        name: /4 fanta 2\.5 10\.00/i
      });
    const itemQuantity = within(row).getByText(/4/i);
    expect(itemQuantity).toBeInTheDocument();
})

test("Display item unit price", () => {
    render(<BrowserRouter><Order order={sampleOrder1} /></BrowserRouter>);
    const row = screen.getByRole('row', {
        name: /4 fanta 2\.5 10\.00/i
      });
    const itemPrice = within(row).getByText(/2\.5/i);
    expect(itemPrice).toBeInTheDocument();
})


test("Display item name", () => {
    render(<BrowserRouter><Order order={sampleOrder1} /></BrowserRouter>);
    const row = screen.getByRole('row', {
        name: /4 fanta 2\.5 10\.00/i
      });
    const itemName = within(row).getByText(/fanta/i);
    expect(itemName).toBeInTheDocument();
})

test("Display subtotal of one item", () => {
    render(<BrowserRouter><Order order={sampleOrder1} /></BrowserRouter>);
    const row = screen.getByRole('row', {
        name: /4 fanta 2\.5 10\.00/i
      });
    const itemName = within(row).getByText(/10\.00/i);
    expect(itemName).toBeInTheDocument();
})

test("Display multiple items in one order", () => {
    render(<BrowserRouter><Order order={sampleOrder2} /></BrowserRouter>);
    const  row1 = screen.getByRole('row', {
        name: /2 wings 9\.5 19\.00/i
      });
    const row2 = screen.getByRole('row', {
        name: /1 specialty chicken 8\.9 8\.90/i
      });
    expect(row1).toBeInTheDocument();
    expect(row2).toBeInTheDocument();
})


test("Display subtotal", () => {
    render(<BrowserRouter><Order order={sampleOrder2} /></BrowserRouter>);
    const  subtotal = screen.getByTestId("subtotal");
    expect(subtotal).toBeInTheDocument();
    expect(subtotal).toHaveTextContent("27.9");
})

test("Display Tax GST", () => {
    render(<BrowserRouter><Order order={sampleOrder2} /></BrowserRouter>);
    const  tax = screen.getByTestId("taxPrice");
    expect(tax).toBeInTheDocument();
    expect(tax).toHaveTextContent("1.4");
})


test("Display shipping", () => {
    render(<BrowserRouter><Order order={sampleOrder2} /></BrowserRouter>);
    const  shipping = screen.getByTestId("shipping");
    expect(shipping).toBeInTheDocument();
    expect(shipping).toHaveTextContent("10");
})

test("Display total price in order", () => {
    render(<BrowserRouter><Order order={sampleOrder2} /></BrowserRouter>);
    const  total = screen.getByTestId("total");
    expect(total).toBeInTheDocument();
    expect(total).toHaveTextContent("$39.3");
})

