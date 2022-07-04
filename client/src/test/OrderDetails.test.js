import OrderDetails from "../components/OrderDetails";
import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import fetchMock from "jest-fetch-mock";

fetchMock.enableMocks();

const sampleOrder = {
    "_id": "62bb73bec0570d84fd09f895",
    "userId": {
        "_id": "62af8ff6cb8924ea363c39bb",
        "firstName": "Komal",
        "lastName": "Shah",
        "userType": "User",
        "email": "komal@shah.com",
        "mobileNumber": "1123456711",
        "address": "1 Apple Park Way, Cupertino, CA 95014, USA",
        "createdOn": "2022-06-19T21:07:00.187Z",
        "updatedOn": "2022-06-27T03:15:53.892Z"
    },
    "totalPrice": 23.13,
    "subTotal": 12.5,
    "taxPrice": 0.63,
    "shippingPrice": 10,
    "address": "1 Apple Park Way, Cupertino, CA 95014, USA",
    "createdOn": "2022-06-28T21:18:06.112Z",
    "dishes": [
        {
            "dishName": "Ginger Ale",
            "quantity": 3,
            "price": 2.5,
            "totalItemPrice": 7.5,
            "_id": "62bb73bec0570d84fd09f896"
        },
        {
            "dishName": "Chocolate Lava Crunch Cake",
            "quantity": 1,
            "price": 5,
            "totalItemPrice": 5,
            "_id": "62bb73bec0570d84fd09f897"
        }
    ]
};

beforeAll(() => {
    jest.spyOn(console, 'log').mockImplementation(() => undefined);
});

afterAll(() => {
    console.log.mockRestore();
});

beforeEach(() => {
    fetch.mockClear();
});

const normalUser = {
    accessLevel: 0,
    email: "test@test.com",
};

test("Display loading before fetch data", () => {
    render(<OrderDetails signedInUser={normalUser} />, {
        wrapper: BrowserRouter,
    });
    const loading = screen.getByText("Loading...");
    expect(loading).toBeInTheDocument();
});

it("Display Order", async () => {
    fetch.mockResponseOnce(JSON.stringify(sampleOrder));
    render(<OrderDetails signedInUser={normalUser} />, {
        wrapper: BrowserRouter,
    });
    await waitFor(() => {

        expect(screen.getByText(/order tax gst 5%:/i)).toBeInTheDocument();
        expect(screen.getByText(/tue jun 28 2022/i)).toBeInTheDocument();
        expect(screen.getByText(/4 items/i)).toBeInTheDocument();

        expect(screen.getByRole('cell', { name: /3/i })).toBeInTheDocument();
        expect(screen.getByRole('cell', { name: /ginger ale/i })).toBeInTheDocument();
        expect(screen.getByRole('cell', { name: /2\.5/i })).toBeInTheDocument();
        expect(screen.getByRole('cell', { name: /7\.5/i })).toBeInTheDocument();

        const subtotal = screen.getByText(/subtotal/i);
        expect(subtotal).toBeInTheDocument();
        expect(subtotal).toHaveTextContent("12.5");

        const orderTotal = screen.getByText(/order tax/i);
        expect(orderTotal).toBeInTheDocument();
        expect(orderTotal).toHaveTextContent("0.63");

        const  row1 = screen.getByRole('row', {
            name: /3 ginger ale 2\.5 7\.5/i
        });
        const  row2 = screen.getByRole('row', {
            name: /1 chocolate lava crunch cake 5 5/i
        });
        expect(row1).toBeInTheDocument();
        expect(row2).toBeInTheDocument();
    });
});

it("Display Order when not available", async () => {
    fetch.mockResponseOnce(JSON.stringify({}));
    render(<OrderDetails signedInUser={normalUser} />, {
        wrapper: BrowserRouter,
    });
    await waitFor(() => {
        const description = screen.getByRole('heading', {  name: /order not available/i})
        expect(description).toBeInTheDocument();
    });
});