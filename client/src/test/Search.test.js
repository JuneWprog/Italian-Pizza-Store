import Search from "../components/Search"
import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import fetchMock from "jest-fetch-mock";
import userEvent from "@testing-library/user-event";

fetchMock.enableMocks();
global.window = { location: { pathname: null } };

const dishList = [
  {
    "_id": "62b2720be84b5dc1b1071c3a",
    "name": "Ginger Ale",
    "category": "62aa2175a602525b153bb2e6",
    "imagePath": "89c900d7-1b29-440a-ac6d-f0f191dc9607_1655963539595.jpeg",
    "price": 2.5,
    "description": "A delicious carbonated drink made with real ginger.",
    "spice": "Mild",
    "createdOn": "2022-06-22T01:25:16.488Z",
    "updatedOn": "2022-06-23T05:52:19.670Z"
  },
  {
    "_id": "62b8f60044d71ed97bed9e86",
    "name": "Fanta",
    "category": "62aa2175a602525b153bb2e6",
    "imagePath": "9e627c3a-3085-408c-8859-5448b95fb27b_1656288768651.jpg",
    "price": 2.5,
    "description": "A refreshing carbonated soft drink made with Real Fruit.",
    "spice": "Mild",
    "createdOn": "2022-06-26T22:01:53.792Z",
    "updatedOn": "2022-06-26T22:01:53.792Z"
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

test("Check if page loaded correctly", () => {
    render(<Search />, {
        wrapper: BrowserRouter,
    });
    expect(screen.getByRole('searchbox', { name: /search category, dish or spice level/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /no results to show!/i })).toBeInTheDocument();
});

test("Check if resuls are loaded correctly", async () => {
    fetch.mockResponseOnce(JSON.stringify(dishList));
    render(<Search />, {
        wrapper: BrowserRouter,
    });
    const search = screen.getByRole('searchbox', { name: /search category, dish or spice level/i });
    await userEvent.type(search, "drink");
    expect(search).toHaveValue("drink");
    await waitFor(() => {
        expect(screen.getByRole('img', {  name: /fanta/i})).toBeInTheDocument();
        expect(screen.getByRole('img', {  name: /ginger /i})).toBeInTheDocument();
    });
    expect(global.window.location.pathname).toEqual('/search/drink');
});