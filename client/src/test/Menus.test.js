import Menus from "../components/Menus"
import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import fetchMock from "jest-fetch-mock";

fetchMock.enableMocks();

const MOCK_MENU = [
    {
        "_id": "62aa2175a602525b153bb2e6",
        "name": "Drinks",
        "imagePath": "",
        "link": "drinks"
    },
    {
        "_id": "62aa2187a602525b153bb2ea",
        "name": "Sides",
        "imagePath": "",
        "link": "sides"
    },
    {
        "_id": "62aa2196a602525b153bb2ee",
        "name": "Pizza and Pasta",
        "imagePath": "",
        "link": "pizzaPasta"
    },
    {
        "_id": "62aa21a1a602525b153bb2f2",
        "name": "Desserts",
        "imagePath": "",
        "link": "desserts"
    }
];

beforeEach(() => {
    fetch.mockClear();
});

beforeAll(() => {
    jest.spyOn(console, 'log').mockImplementation(() => undefined);
});

afterAll(() => {
    console.log.mockRestore();
});

it("Display Menu", async () => {
    fetch.mockResponseOnce(JSON.stringify(MOCK_MENU));
    render(<Menus />, { wrapper: BrowserRouter });
    await waitFor(() => {
        const drinksMenu = screen.getByText(/drinks/i);
        expect(drinksMenu).toBeInTheDocument();
        const sidesMenu = screen.getByText(/sides/i);
        expect(sidesMenu).toBeInTheDocument();
        const pizzaMenu = screen.getByText(/pizza and pasta/i);
        expect(pizzaMenu).toBeInTheDocument();
        const dessertMenu = screen.getByText(/desserts/i);
        expect(dessertMenu).toBeInTheDocument();
    })
});

it("Nothing in Menu", async () => {
    
    render(<Menus />, { wrapper: BrowserRouter });
    await waitFor(() => {
        const comingSoon = screen.getByText(/coming soon/i);
        expect(comingSoon).toBeInTheDocument();
    })
});
