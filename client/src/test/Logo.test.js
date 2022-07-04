import Logo from "../components/Logo"
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";


test("Display logo", () => {
  render(<Logo />, { wrapper: BrowserRouter });
  const logo = screen.getByRole('img', {
  name: /logo/i
})
  expect(logo).toBeInTheDocument();
});

