import AddDish from "../components/AddDish";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";


const adminUser={
  "accessLevel": 1
}

const normalUser={
  "accessLevel": 0
}

beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => undefined);
});

afterAll(() => {
  console.error.mockRestore();
});

test("Dish name input changes as admin types", async () => {
  render(<AddDish signedInUser={adminUser} />, { wrapper: BrowserRouter });
  const nameInput = screen.getByLabelText(/dish name \*/i);
  expect(nameInput).toBeInTheDocument();
  await userEvent.type(nameInput, "test pizza");
  expect(nameInput).toHaveValue("test pizza"); 
});


test("Display Category select",  () => {
  render(<AddDish signedInUser={adminUser} />, { wrapper: BrowserRouter });
  const  categoryInput=  screen.getByLabelText(/category \*/i)
  expect(categoryInput).toBeInTheDocument();
  
});


test("Display Category default value",  () => {
  render(<AddDish signedInUser={adminUser} />, { wrapper: BrowserRouter });
  const categorySelect = screen.getByLabelText(/category \*/i)
  expect(categorySelect.value).toBe('Pizza and Pasta') //default value
  
});

test("Category value changes as users select",  () => {
  render(<AddDish signedInUser={adminUser} />, { wrapper: BrowserRouter });
  const categorySelect = screen.getByLabelText(/category \*/i)
  expect(categorySelect.value).toBe('Pizza and Pasta') //default value
  fireEvent.change(categorySelect, {target: {value: 'Drinks'}})
  expect(categorySelect.value).toBe('Drinks') //select value
  
});


test("Category value can not be other values",  () => {
  render(<AddDish signedInUser={adminUser} />, { wrapper: BrowserRouter });
  const categorySelect = screen.getByLabelText(/category \*/i)
  expect(categorySelect.value).toBe('Pizza and Pasta') //default value
  fireEvent.change(categorySelect, {target: {value: 'Sandwich'}})
  expect(categorySelect.value).toBe('Pizza and Pasta') //select value
  
});


test("display image path label and input",  () => {
  render(<AddDish signedInUser={adminUser} />, { wrapper: BrowserRouter });
  const  imageLabel=  screen.getByText(/image \*/i)
  expect(imageLabel).toBeInTheDocument();
  const  imageInput=  screen.getByLabelText(/image \*/i)
  expect(imageInput).toBeInTheDocument();
  
});

test("display discription label and input",  () => {
  render(<AddDish signedInUser={adminUser} />, { wrapper: BrowserRouter });
  const  descriptionLabel=  screen.getByText(/description \*/i)
  const  discriptionInput=  screen.getByRole('textbox', {
    name: /description \*/i
  })
  expect(discriptionInput).toBeInTheDocument();
  expect(descriptionLabel).toBeInTheDocument();

});


test("description input changes as admin types",  async() => {
  render(<AddDish signedInUser={adminUser} />, { wrapper: BrowserRouter });
  const  descriptionInput=screen.getByLabelText(/description \*/i)
  await userEvent.type(descriptionInput, "test");
  expect(descriptionInput).toHaveValue("test"); 
})


test("desplay price input",  async() => {
  render(<AddDish signedInUser={adminUser} />, { wrapper: BrowserRouter });
  const  priceInput=screen.getByLabelText(/price \$ \*/i)
  expect(priceInput).toBeInTheDocument();
 
})


test("price input changes as users type",  async() => {
  render(<AddDish signedInUser={adminUser} />, { wrapper: BrowserRouter });
  const  priceInput=screen.getByLabelText(/price \$ \*/i)
  await userEvent.type(priceInput, "0");
  expect(priceInput).toHaveValue(0); 
})


test("price input should not allow letters to be inputted",  async() => {
  render(<AddDish signedInUser={adminUser} />, { wrapper: BrowserRouter });
  const  priceInput=screen.getByLabelText(/price \$ \*/i)
  expect(priceInput.value).toBe('') // empty before
  fireEvent.change(priceInput, {target: {value: 'test'}})
  expect(priceInput.value).toBe('') //empty after
})





test("Display spice select",  () => {
  render(<AddDish signedInUser={adminUser} />, { wrapper: BrowserRouter });
  const  spiceSelect=  screen.getByLabelText(/spice\*/i)
  expect(spiceSelect).toBeInTheDocument();
  
});


test("Display spice default value",  () => {
  render(<AddDish signedInUser={adminUser} />, { wrapper: BrowserRouter });
  const  spiceSelect=  screen.getByLabelText(/spice\*/i)
  expect(spiceSelect.value).toBe('Hot') //default value
  
});

test("spice value changes as users select",  () => {
  render(<AddDish signedInUser={adminUser} />, { wrapper: BrowserRouter });
  const  spiceSelect=  screen.getByLabelText(/spice\*/i)
  expect(spiceSelect.value).toBe('Hot') //default value
  fireEvent.change(spiceSelect, {target: {value: 'Medium'}})
  expect(spiceSelect.value).toBe('Medium') //select value
  
});


test("spice value can not be other values",  () => {


  render(<AddDish signedInUser={adminUser} />, { wrapper: BrowserRouter });
  const  spiceSelect=  screen.getByLabelText(/spice\*/i)
  expect(spiceSelect.value).toBe('Hot') //default value
  fireEvent.change(spiceSelect, {target: {value: 'extremely hot'}})
  expect(spiceSelect.value).toBe('Mild') 
});


test("Submit button display for admin", async () => {
  render(<AddDish signedInUser={adminUser} />, { wrapper: BrowserRouter });
  const submit = screen.getByRole('button', {
    name: /submit/i
  });
  expect(submit).toBeInTheDocument(); 
});

test("Throw errors when not admin", () => {
  expect(() => render(<AddDish signedInUser={normalUser} />, { wrapper: BrowserRouter }))
    .toThrow("Cannot read properties of null (reading 'focus')");
});
  




