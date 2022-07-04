import DishList from "../components/DishList";
import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import fetchMock from "jest-fetch-mock";

fetchMock.enableMocks();

const adminUser = {
  "accessLevel": 1
}

const normalUser = {
  "accessLevel": 0
}
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

const onAdd = jest.fn();

test("Display loading before fetch data", () => {
  render(<DishList signedInUser={null} onAdd={onAdd} />, {
    wrapper: BrowserRouter,
  });
  const loading = screen.getByText("Loading...");
  expect(loading).toBeInTheDocument();
});

it("Display Dishes when not available", async () => {
  fetch.mockResponseOnce(JSON.stringify([]));
  render(<DishList signedInUser={null} onAdd={onAdd} />, {
      wrapper: BrowserRouter,
  });
  await waitFor(() => {
      const description = screen.getByRole('heading', {  name: /coming soon/i})
      expect(description).toBeInTheDocument();
  });
});

it("Dishes count", async () => {
  fetch.mockResponseOnce(JSON.stringify(dishList));
  render(<DishList signedInUser={null} onAdd={onAdd} />, {
      wrapper: BrowserRouter,
  });
  await waitFor(() => {
      expect(screen.getByRole('img', {  name: /fanta/i})).toBeInTheDocument();
      expect(screen.getByRole('img', {  name: /ginger /i})).toBeInTheDocument();
  });
});

it("Add to cart button for normal not logged in user", async () => {
  fetch.mockResponseOnce(JSON.stringify(dishList));
  render(<DishList signedInUser={null} onAdd={onAdd} />, {
      wrapper: BrowserRouter,
  });
  await waitFor(() => {
      expect(screen.getByRole('img', {  name: /fanta/i})).toBeInTheDocument();
      expect(screen.getByRole('img', {  name: /ginger /i})).toBeInTheDocument();
      expect(screen.getAllByRole('button', {  name: /add to car/i})).toHaveLength(2);
  });
});

it("Add to cart button for normal logged in user", async () => {
  fetch.mockResponseOnce(JSON.stringify(dishList));
  render(<DishList signedInUser={normalUser} onAdd={onAdd} />, {
      wrapper: BrowserRouter,
  });
  await waitFor(() => {
      expect(screen.getByRole('img', {  name: /fanta/i})).toBeInTheDocument();
      expect(screen.getByRole('img', {  name: /ginger /i})).toBeInTheDocument();
      expect(screen.getAllByRole('button', {  name: /add to car/i})).toHaveLength(2);
  });
});

it("Edit button for admin user", async () => {
  fetch.mockResponseOnce(JSON.stringify(dishList));
  render(<DishList signedInUser={adminUser} onAdd={onAdd} />, {
      wrapper: BrowserRouter,
  });
  await waitFor(() => {
      expect(screen.getByRole('img', {  name: /fanta/i})).toBeInTheDocument();
      expect(screen.getByRole('img', {  name: /ginger /i})).toBeInTheDocument();
      expect(screen.getAllByRole('button', {  name: /edit/i})).toHaveLength(2);
  });
});