import Profile from "../components/Profile"
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

const normalUser = {
    accessLevel: 0,
    email: "test@test.com",
    firstName: "Komal",
    lastName: "Shah",
    phone: "1123456711",
    address: "1 Apple Park Way, Cupertino, CA 95014, USA",
};

const setLoggedInUser = jest.fn();

test("Display title", async () => {
    render(<Profile signedInUser={normalUser} setLoggedInUser={setLoggedInUser} />, {
        wrapper: BrowserRouter,
    });
    const heading = screen.getByRole('heading', {
        name: /account details/i
    });
    expect(heading).toBeInTheDocument();
});

test("Check if Data is loaded correctly.", () => {
    render(<Profile signedInUser={normalUser} setLoggedInUser={setLoggedInUser} />, {
        wrapper: BrowserRouter,
    });
    expect(screen.getByText(/first name \*/i)).toBeInTheDocument();
    expect(screen.getByText(/last name \*/i)).toBeInTheDocument();
    expect(screen.getByText(/email \*/i)).toBeInTheDocument();
    expect(screen.getByText(/address \*/i)).toBeInTheDocument();
    const firstName = screen.getByRole('textbox', { name: /first name \*/i }).value;
    expect(firstName).toBe('Komal');
    const lastName = screen.getByRole('textbox', { name: /last name \*/i }).value;
    expect(lastName).toBe('Shah');
    const email = screen.getByRole('textbox', { name: /email \*/i }).value;
    expect(email).toBe('test@test.com');
    const address = screen.getByRole('textbox', { name: /address \*/i }).value;
    expect(address).toBe('1 Apple Park Way, Cupertino, CA 95014, USA');
    const phone = screen.getByRole('spinbutton', { name: /phone number \*/i }).value;
    expect(phone).toBe('1123456711');
});

it("Check if Data is updated correctly.", async () => {
    render(<Profile signedInUser={normalUser} setLoggedInUser={setLoggedInUser} />, {
        wrapper: BrowserRouter,
    });
    const firstName = screen.getByRole('textbox', { name: /first name \*/i });
    await userEvent.type(firstName, "test");
    expect(firstName).toHaveValue("Komaltest");

    const lastName = screen.getByRole('textbox', { name: /last name \*/i });
    await userEvent.type(lastName, "test");
    expect(lastName).toHaveValue("Shahtest");

    const email = screen.getByRole('textbox', { name: /email \*/i }).value;
    expect(email).toBe('test@test.com');

    const address = screen.getByRole('textbox', { name: /address \*/i });
    await userEvent.type(address, "test");
    expect(address).toHaveValue('1 Apple Park Way, Cupertino, CA 95014, USAtest');

    const phone = screen.getByRole('spinbutton', { name: /phone number \*/i }).value;
    expect(phone).toBe('1123456711');
});

it("Check Error.", async () => {
    render(<Profile signedInUser={normalUser} setLoggedInUser={setLoggedInUser} />, {
        wrapper: BrowserRouter,
    });
    const firstName = screen.getByRole('textbox', { name: /first name \*/i });
    await userEvent.type(firstName, "1");
    expect(firstName).toHaveValue("Komal1");

    await userEvent.click(screen.getByRole('button', {  name: /update details/i}));
    expect(screen.getByText(/first name should be alphabetic/i)).toBeInTheDocument();

    const lastName = screen.getByRole('textbox', { name: /last name \*/i });
    await userEvent.type(lastName, "1");
    expect(lastName).toHaveValue("Shah1");

    await userEvent.click(screen.getByRole('button', {  name: /update details/i}));
    expect(screen.getByText(/last name should be alphabetic/i)).toBeInTheDocument();
});

