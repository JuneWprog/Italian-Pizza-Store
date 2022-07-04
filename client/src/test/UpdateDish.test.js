import UpdateDish from "../components/UpdateDish";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
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

test("should not display edit dish for normal user", async () => {
  expect(() => render(<UpdateDish signedInUser={normalUser} />, { wrapper: BrowserRouter }))
  .toThrow("Cannot read properties of null (reading 'focus')");
});

test("Display edit dish title for admin", async () => {
  render(<UpdateDish signedInUser={adminUser} />, { wrapper: BrowserRouter });
  const heading = screen.getByRole('heading', {
    name: /edit dish/i
  });
  expect(heading).toBeInTheDocument();
});



test("Display dish name input",  () => {
  render(<UpdateDish signedInUser={adminUser} />, { wrapper: BrowserRouter });
  const  dishNameInput=  screen.getByLabelText(/dish name \*/i)
  expect(dishNameInput).toBeInTheDocument();
  
});


test("Dish name input changes as admin types", async () => {
  render(<UpdateDish signedInUser={adminUser} />, { wrapper: BrowserRouter });
  const nameInput = screen.getByLabelText(/dish name \*/i);
  expect(nameInput).toBeInTheDocument();
  await userEvent.type(nameInput, "test pizza");
  expect(nameInput).toHaveValue("test pizza"); 
});


// test("Display Category default value",  () => {
//   render(<UpdateDish signedInUser={adminUser} />, { wrapper: BrowserRouter });
//   const categorySelect = screen.getByLabelText(/category \*/i)
//   expect(categorySelect.value).toBe('Pizza and Pasta') //default value
  
// });

test("Category value changes as users select",  () => {
  render(<UpdateDish signedInUser={adminUser} />, { wrapper: BrowserRouter });
  const categorySelect = screen.getByLabelText(/category \*/i)
  expect(categorySelect.value).toBe('Pizza and Pasta') //default value
  fireEvent.change(categorySelect, {target: {value: 'Drinks'}})
  expect(categorySelect.value).toBe('Drinks') //select value
  
});


test("Category value can not be other values",  () => {
  render(<UpdateDish signedInUser={adminUser} />, { wrapper: BrowserRouter });
  const categorySelect = screen.getByLabelText(/category \*/i)
  fireEvent.change(categorySelect, {target: {value: 'Sandwich'}})
  expect(categorySelect.value).toBe('Pizza and Pasta') 
  
});


test("display image path label and input",  () => {
  render(<UpdateDish signedInUser={adminUser} />, { wrapper: BrowserRouter });
  const  imageLabel=  screen.getByText(/image/i)
  expect(imageLabel).toBeInTheDocument();
  const  imageInput=  screen.getByLabelText(/image/i)
  expect(imageInput).toBeInTheDocument();
  
});

test("display discription label and input",  () => {
  render(<UpdateDish signedInUser={adminUser} />, { wrapper: BrowserRouter });
  const  descriptionLabel=  screen.getByText(/description \*/i)
  const  discriptionInput=  screen.getByRole('textbox', {
    name: /description \*/i
  })
  expect(discriptionInput).toBeInTheDocument();
  expect(descriptionLabel).toBeInTheDocument();

});


test("description input changes as admin types",  async() => {
  render(<UpdateDish signedInUser={adminUser} />, { wrapper: BrowserRouter });
  const  descriptionInput=screen.getByLabelText(/description \*/i)
  await userEvent.type(descriptionInput, "test");
  expect(descriptionInput).toHaveValue("test"); 
})


test("desplay price input",  async() => {
  render(<UpdateDish signedInUser={adminUser} />, { wrapper: BrowserRouter });
  const  priceInput=screen.getByLabelText(/price \$ \*/i)
  expect(priceInput).toBeInTheDocument();
 
})


test("price input changes as users type",  async() => {
  render(<UpdateDish signedInUser={adminUser} />, { wrapper: BrowserRouter });
  const  priceInput=screen.getByLabelText(/price \$ \*/i)
  await userEvent.type(priceInput, "0");
  expect(priceInput).toHaveValue(0); 
})


test("price input should not allow letters to be inputted",  async() => {
  render(<UpdateDish signedInUser={adminUser} />, { wrapper: BrowserRouter });
  const  priceInput=screen.getByLabelText(/price \$ \*/i)
  expect(priceInput.value).toBe('') // empty before
  fireEvent.change(priceInput, {target: {value: 'test'}})
  expect(priceInput.value).toBe('') //empty after
})





test("Display spice select",  () => {
  render(<UpdateDish signedInUser={adminUser} />, { wrapper: BrowserRouter });
  const  spiceSelect=  screen.getByLabelText(/spice\*/i)
  expect(spiceSelect).toBeInTheDocument();
  
});


// test("Display spice default value",  () => {
//   render(<UpdateDish signedInUser={adminUser} />, { wrapper: BrowserRouter });
//   const  spiceSelect=  screen.getByLabelText(/spice\*/i)
//   expect(spiceSelect.value).toBe('Hot') //default value
  
// });

test("spice value changes as users select",  () => {
  render(<UpdateDish signedInUser={adminUser} />, { wrapper: BrowserRouter });
  const  spiceSelect=  screen.getByLabelText(/spice\*/i);
  fireEvent.change(spiceSelect, {target: {value: 'Medium'}});
  expect(spiceSelect.value).toBe('Medium') //select value
});


test("spice value can not be other values",  () => {
  render(<UpdateDish signedInUser={adminUser} />, { wrapper: BrowserRouter });
  const  spiceSelect=  screen.getByLabelText(/spice\*/i)
  fireEvent.change(spiceSelect, {target: {value: 'extremely hot'}})
  expect(spiceSelect.value).toBe('Mild') 
});


test("Submit button display for admin", async () => {
  render(<UpdateDish signedInUser={adminUser} />, { wrapper: BrowserRouter });
  const submit = screen.getByRole('button', {
    name: /submit/i
  });
  expect(submit).toBeInTheDocument(); 
});


test("cancel button display for admin", async () => {
  render(<UpdateDish signedInUser={adminUser} />, { wrapper: BrowserRouter });
  const cancelButton =screen.getByRole('button', {
    name: /cancel/i
  });
  expect(cancelButton).toBeInTheDocument(); 
});



// test('rendering and submitting form', async () => {
//   const handleSubmit = jest.fn()
//   render(<AddDish signedInUser={adminUser} />, { wrapper: BrowserRouter })


//   await userEvent.type(screen.getByLabelText(/dish name \*/i), 'pizza')
//   await userEvent.type(screen.getByLabelText(/category \*/i), 'Pizza and Pasta')
//   await userEvent.type(screen.getByLabelText(/Image \*/i), 'pizzaDisplay3.jpg')
//   await userEvent.type(screen.getByLabelText(/description \*/i), 'pizzaDisplay')
//   await userEvent.type(screen.getByLabelText(/price \$ \*/i), '3.5')
//   await userEvent.type(screen.getByLabelText(/spice\*/i), 'Hot')

//   await userEvent.click(screen.getByRole('button', {name: /submit/i}))

//   // await waitFor(() =>
//     expect(handleSubmit).toHaveBeenCalledTimes(1);
//     // With({
//     //   name: 'pizza',
//     //   category: 'Pizza and Pasta',
//     //   image: 'pizzaDisplay3.jpg',
//     //   description: 'pizzaDisplay',
//     //   price: 3.5,
//     //   spice: 'Hot'
//     // }),
//   // )
// })