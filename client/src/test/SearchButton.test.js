import SearchButton from "../components/SearchButton"
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

test("search button display", () => {
    render(<SearchButton/>,{
        wrapper: BrowserRouter,
      });
      const searchButton =screen.getByRole('button', {
        name: /search icon/i
      });
        expect(searchButton).toBeInTheDocument();
})