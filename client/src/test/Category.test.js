import Category from "../components/category"
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";


const type={name: "Drinks", link: "drinks"}

test("display one category",()=>{
    render(<Category category={type}/>,{wrapper:BrowserRouter});
    const category = screen.getByRole('link', {
        name: /drinks drinks/i
      })
    expect(category).toBeInTheDocument();
})

test("display one category image",()=>{
    render(<Category category={type}/>,{wrapper:BrowserRouter});
    const categoryImg = screen.getByRole('img', {
        name: /drinks/i
      })
    expect(categoryImg).toBeInTheDocument();
})

test("display one category name",()=>{
    render(<Category category={type}/>,{wrapper:BrowserRouter});
    const categoryName = screen.getByText(/drinks/i)
    expect(categoryName).toBeInTheDocument();
})