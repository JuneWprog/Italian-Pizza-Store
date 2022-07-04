import Footer  from "../components/Footer";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

test("Dishplay about us story heading", async () => {
  render(<Footer />, { wrapper: BrowserRouter });
  const footer = screen.getByText(/© 2022 italian pizza/i)
  expect(footer).toBeInTheDocument();
});


