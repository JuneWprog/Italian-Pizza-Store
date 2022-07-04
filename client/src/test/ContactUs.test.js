import ContactUs from "../components/ContactUs";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

test("Dishplay contact us heading", async () => {
  render(<ContactUs />, { wrapper: BrowserRouter });
  const heading = screen.getByRole('heading', {
    name: /contact us/i
  });
  expect(heading).toBeInTheDocument();
});

test("Dishplay contact us call us", async () => {
  render(<ContactUs />, { wrapper: BrowserRouter });
  const call = screen.getByRole('heading', {
    name: /call us/i
  });
  expect(call).toBeInTheDocument();
});

test("Dishplay contact us write us", async () => {
  render(<ContactUs />, { wrapper: BrowserRouter });
  const call = screen.getByRole('heading', {
    name: /write us/i
  });
  expect(call).toBeInTheDocument();
});
