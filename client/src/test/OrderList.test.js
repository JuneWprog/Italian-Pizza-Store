import OrderList from "../components/OrderList";
import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import fetchMock from "jest-fetch-mock";

fetchMock.enableMocks();

const sampleOrder = [
    {
        "_id": "62bb73bec0570d84fd09f895",
        "userId": "62af8ff6cb8924ea363c39bb",
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
    },
    {
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
    },
    {
        "_id": "62ba8ae01eb85c178b7883fd",
        "userId": "62af8ff6cb8924ea363c39bb",
        "totalPrice": 39.27,
        "subTotal": 27.88,
        "taxPrice": 1.39,
        "shippingPrice": 10,
        "address": "1 Apple Park Way, Cupertino, CA 95014, USA",
        "createdOn": "2022-06-27T17:59:32.712Z",
        "dishes": [
            {
                "dishName": "Veggie",
                "quantity": 1,
                "price": 9.88,
                "totalItemPrice": 9.88,
                "_id": "62ba8ae01eb85c178b7883fe"
            },
            {
                "dishName": "peperoni",
                "quantity": 1,
                "price": 6,
                "totalItemPrice": 6,
                "_id": "62ba8ae01eb85c178b7883ff"
            },
            {
                "dishName": "Fanta",
                "quantity": 1,
                "price": 2.5,
                "totalItemPrice": 2.5,
                "_id": "62ba8ae01eb85c178b788400"
            },
            {
                "dishName": "Wings",
                "quantity": 1,
                "price": 9.5,
                "totalItemPrice": 9.5,
                "_id": "62ba8ae01eb85c178b788401"
            }
        ]
    },
    {
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
    },
    {
        "_id": "62b93858f2f6a295d24a8192",
        "userId": "62af8ff6cb8924ea363c39bb",
        "totalPrice": 17.88,
        "subTotal": 7.5,
        "taxPrice": 0.38,
        "shippingPrice": 10,
        "address": "1 Apple Park Way, Cupertino, CA 95014, USA",
        "createdOn": "2022-06-27T04:37:12.662Z",
        "dishes": [
            {
                "dishName": "Fanta",
                "quantity": 3,
                "price": 2.5,
                "totalItemPrice": 7.5,
                "_id": "62b93858f2f6a295d24a8193"
            }
        ]
    },
    {
        "_id": "62b92c483a11276c802317d6",
        "userId": "62af8ff6cb8924ea363c39bb",
        "totalPrice": 20.98,
        "subTotal": 10.46,
        "taxPrice": 0.52,
        "shippingPrice": 10,
        "address": "1 Apple Park Way, Cupertino, CA 95014, USA",
        "createdOn": "2022-06-27T03:53:41.889Z",
        "dishes": [
            {
                "dishName": "Marbled Cookie Brownie",
                "quantity": 2,
                "price": 5.23,
                "totalItemPrice": 10.46,
                "_id": "62b92c483a11276c802317d7"
            }
        ]
    },
    {
        "_id": "62b926371d904524fc4f372a",
        "userId": "62af8ff6cb8924ea363c39bb",
        "totalPrice": 17.88,
        "subTotal": 7.5,
        "taxPrice": 0.38,
        "shippingPrice": 10,
        "address": "1 Apple Park Way, Cupertino, CA 95014, USA",
        "createdOn": "2022-06-27T03:38:04.995Z",
        "dishes": [
            {
                "dishName": "Ginger Ale",
                "quantity": 3,
                "price": 2.5,
                "totalItemPrice": 7.5,
                "_id": "62b926371d904524fc4f372b"
            }
        ]
    }
];

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
    render(<OrderList signedInUser={normalUser} />, {
        wrapper: BrowserRouter,
    });
    const loading = screen.getByText("loading...");
    expect(loading).toBeInTheDocument();
});

it("Display Order when not available", async () => {
    fetch.mockResponseOnce(JSON.stringify([]));
    render(<OrderList signedInUser={normalUser} />, {
        wrapper: BrowserRouter,
    });
    await waitFor(() => {
        const description = screen.getByRole('heading', {  name: /You have no orders/i})
        expect(description).toBeInTheDocument();
    });
});

it("Orders count", async () => {
    fetch.mockResponseOnce(JSON.stringify(sampleOrder));
    render(<OrderList signedInUser={normalUser} />, {
        wrapper: BrowserRouter,
    });
    await waitFor(() => {
        expect(screen.getAllByText(/Italian Pizza/i)).toHaveLength(7);
    });
});