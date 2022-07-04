import Nav from "../components/Nav"
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

const adminUser={
  "accessLevel": 1
}

const normalUser={
  "accessLevel": 0
}

test("Should have 4 links for unsigned users", () => {
  render(<Nav />, { wrapper: BrowserRouter });
  const linksArray = screen.queryAllByRole('link')
    expect(linksArray).toHaveLength(4);
});

test("Should have 4 links for normal users", () => {
  render(<Nav signedInUser={normalUser}/>, { wrapper: BrowserRouter });
  const linksArray = screen.queryAllByRole('link')
    expect(linksArray).toHaveLength(4);
});

test("Should have 5 links for admin users", () => {
  render(<Nav signedInUser={adminUser}/>, { wrapper: BrowserRouter });
  const linksArray = screen.queryAllByRole('link')
    expect(linksArray).toHaveLength(5);
});

test("Display Home link for unsigned users", () => {
  render(<Nav />, { wrapper: BrowserRouter });
  const home = screen.getByRole('link', {
  name: /home/i
})
  expect(home).toBeInTheDocument();
});

test("Display Home link for normal users", () => {
  render(<Nav signedInUser={normalUser}/>, { wrapper: BrowserRouter });
  const home = screen.getByRole('link', {
  name: /home/i
})
  expect(home).toBeInTheDocument();
});

test("Display Home link for admin users", () => {
  render(<Nav signedInUser={adminUser}/>, { wrapper: BrowserRouter });
  const home = screen.getByRole('link', {
  name: /home/i
})
  expect(home).toBeInTheDocument();
});

test("Display Menus link for unsigned users", () => {
  render(<Nav />, { wrapper: BrowserRouter });
  const menus = screen.getByRole('link', {
  name: /menus/i
})
  expect(menus).toBeInTheDocument();
});

test("Display Menus link for normal users", () => {
  render(<Nav signedInUser={normalUser}/>, { wrapper: BrowserRouter });
  const menus = screen.getByRole('link', {
  name: /menus/i
})
  expect(menus).toBeInTheDocument();
});

test("Display Menus link for admin users", () => {
  render(<Nav signedInUser={adminUser}/>, { wrapper: BrowserRouter });
  const menus = screen.getByRole('link', {
  name: /menus/i
})
  expect(menus).toBeInTheDocument();
});


test("Display about us for unsigned users", () => {
  render(<Nav />, { wrapper: BrowserRouter });
  const aboutUs = screen.getByRole('link', {
  name: /about us/i
})
  expect(aboutUs).toBeInTheDocument();
});

test("Display about us for normal users", () => {
  render(<Nav signedInUser={normalUser}/>, { wrapper: BrowserRouter });
  const aboutUs = screen.getByRole('link', {
  name: /about us/i
})
  expect(aboutUs).toBeInTheDocument();
});

test("Display about us for admin users", () => {
  render(<Nav ignedInUser={adminUser}/>, { wrapper: BrowserRouter });
  const aboutUs = screen.getByRole('link', {
  name: /about us/i
})
  expect(aboutUs).toBeInTheDocument();
});


test("Display contact us for unsigned users", () => {
  render(<Nav />, { wrapper: BrowserRouter });
  const contactUs = screen.getByRole('link', {
  name: /contact us/i
})
  expect(contactUs).toBeInTheDocument();
});

test("Display contact us for normal users", () => {
  render(<Nav signedInUser={normalUser}/>, { wrapper: BrowserRouter });
  const contactUs = screen.getByRole('link', {
  name: /contact us/i
})
  expect(contactUs).toBeInTheDocument();
});

test("Display contact us for admin users", () => {
  render(<Nav signedInUser={adminUser}/>, { wrapper: BrowserRouter });
  const contactUs = screen.getByRole('link', {
  name: /contact us/i
})
  expect(contactUs).toBeInTheDocument();
});


test("Should not Display add dish for unsigned users", () => {
  render(<Nav />, { wrapper: BrowserRouter });
  const addDish = screen.queryByRole('link', {
  name: /add dish/i
})
  expect(addDish).not.toBeInTheDocument();
});

test("Should not Display add dish for normal users", () => {
  render(<Nav signedInUser={normalUser}/>, { wrapper: BrowserRouter });
  const addDish = screen.queryByRole('link', {
    name: /add dish/i
  })
    expect(addDish).not.toBeInTheDocument();
});

test("Display Display add dish for admin users", () => {
  render(<Nav signedInUser={adminUser}/>, { wrapper: BrowserRouter });
  const addDish = screen.queryByRole('link', {
    name: /add dish/i
  })
    expect(addDish).toBeInTheDocument();
});



