import Payment from "../components/Payment"
import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

const normalUser = {
    "accessLevel": 0
};

const resetCartItems = jest.fn();
const setOrder = jest.fn();

const order = {
    email: "komal@shah.com",
    itemsPrice: "5.00",
    shippingPrice: 10,
    taxPrice: "0.25",
    totalNumber: 3,
    totalPrice: "15.25",
    cartItems: [
        {
            category: "62aa2175a602525b153bb2e6",
            createdOn: "2022-06-22T01:25:16.488Z",
            description: "A delicious carbonated drink made with real ginger.",
            imagePath: "89c900d7-1b29-440a-ac6d-f0f191dc9607_1655963539595.jpeg",
            name: "Ginger Ale",
            price: 2.5,
            quantity: 3,
            spice: "Mild",
            updatedOn: "2022-06-23T05:52:19.670Z",
            _id: "62b2720be84b5dc1b1071c3a"
        }
    ]
};

test("Display loading before fetch data", () => {
    render(<Payment signedInUser={normalUser} order={null} resetCartItems={resetCartItems} setOrder={setOrder} />, {
        wrapper: BrowserRouter,
    });
    const add = screen.getByText(/please add food/i);
    expect(add).toBeInTheDocument();
});

it("Display Order", async () => {
    render(<Payment signedInUser={normalUser} order={order} resetCartItems={resetCartItems} setOrder={setOrder} />, {
        wrapper: BrowserRouter,
    });
    await waitFor(() => {
        expect(screen.getByText(/order tax gst 5%:/i)).toBeInTheDocument();
        expect(screen.getByText(/3 items/i)).toBeInTheDocument();

        const subtotal = screen.getByText(/subtotal/i);
        expect(subtotal).toBeInTheDocument();
        expect(subtotal).toHaveTextContent("5.00");

        const orderTotal = screen.getByText(/order tax/i);
        expect(orderTotal).toBeInTheDocument();
        expect(orderTotal).toHaveTextContent("0.25");

        expect(screen.getByRole('button', {  name: /pay/i})).toBeInTheDocument();
        expect(screen.getByRole('button', {  name: /back to cart/i})).toBeInTheDocument();
    });
});