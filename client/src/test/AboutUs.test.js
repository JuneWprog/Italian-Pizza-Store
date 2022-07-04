import AboutUs from "../components/AboutUs";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

test("Dishplay about us story heading", async () => {
  render(<AboutUs />, { wrapper: BrowserRouter });
  const heading = screen.getByRole("heading", {
    name: /our story/i,
  });
  expect(heading).toBeInTheDocument();
});

test("Display about us story paragraph", async () => {
  render(<AboutUs />, { wrapper: BrowserRouter });
  const paragraph = screen.getByText(
    /it’s a simple equation that keeps our customers coming back for more\. always fresh toppings and great service plus low, low prices equals great pizza\. here at the authentic italian pizza, we strive to give our customers the best\. we’re one of the few family\-owned companies left that still truly care about our customers\./i
  );

  expect(paragraph).toBeInTheDocument();
});
