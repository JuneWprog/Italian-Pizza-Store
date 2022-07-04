import NotFoundPage from "../components/NotFoundPage"
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";


test("Display heading", () => {
  render(<NotFoundPage />, { wrapper: BrowserRouter });
  const heading = screen.getByRole("heading", {
    name: /oops!/i,
  });
  expect(heading).toBeInTheDocument();
});

test("Display invalid url", () => {
  render(<NotFoundPage />, { wrapper: BrowserRouter });
  const invalid = screen.getByRole("heading", {
    name: /invalid url! this page does not exist!/i,
  });
  expect(invalid).toBeInTheDocument();
});

test("Display logo", () => {
  render(<NotFoundPage />, { wrapper: BrowserRouter });
  const logo = screen.getByAltText(/logo/i);
  expect(logo).toBeInTheDocument();
});

test("Display back to home button", () => {
  render(<NotFoundPage />, { wrapper: BrowserRouter });
  const homeButton = screen.getByRole("link", {
    name: /take me home/i,
  });
  expect(homeButton).toBeInTheDocument();
});