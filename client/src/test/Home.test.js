import Home from "../components/Home";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";


test("Display Carousel images", () => {
  render(<Home/>, { wrapper: BrowserRouter });
  const imageArray = screen.getAllByRole("img");
  expect(imageArray).toHaveLength(3);
});

