import Register from "../components/Register"
import { render, screen, waitFor } from "@testing-library/react";
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

test("Display title", async () => {
    render(<Register signedInUser={null} />, {
        wrapper: BrowserRouter,
    });
    const heading = screen.getByRole('heading', {
        name: /register your account/i
    });
    expect(heading).toBeInTheDocument();
});

test("Check if page is loaded correctly.", () => {
    render(<Register signedInUser={null} />, {
        wrapper: BrowserRouter,
    });
    expect(screen.getByText(/first name \*/i)).toBeInTheDocument();
    expect(screen.getByText(/last name \*/i)).toBeInTheDocument();
    expect(screen.getByText(/email \*/i)).toBeInTheDocument();
    expect(screen.getByText(/address \*/i)).toBeInTheDocument();
    expect(screen.getByText(/confirm password \*/i)).toBeInTheDocument();
    expect(screen.getByRole('button', {  name: /sign up/i})).toBeInTheDocument();
    expect(screen.getByRole('link', {  name: /sign in\./i})).toBeInTheDocument();

    const firstName = screen.getByRole('textbox', { name: /first name \*/i }).value;
    expect(firstName).toBe('');
    const lastName = screen.getByRole('textbox', { name: /last name \*/i }).value;
    expect(lastName).toBe('');
    const email = screen.getByRole('textbox', { name: /email \*/i }).value;
    expect(email).toBe('');
    const address = screen.getByRole('textbox', { name: /address \*/i }).value;
    expect(address).toBe('');
    const phone = screen.getByRole('spinbutton', { name: /phone number \*/i }).value;
    expect(phone).toBe('');
    expect(screen.getByLabelText(/confirm password \*/i).value).toBe('');
});

it("Check if Data is updated correctly.", async () => {
    render(<Register signedInUser={null} />, {
        wrapper: BrowserRouter,
    });
    const firstName = screen.getByRole('textbox', { name: /first name \*/i });
    await userEvent.type(firstName, "test");
    expect(firstName).toHaveValue("test");

    const lastName = screen.getByRole('textbox', { name: /last name \*/i });
    await userEvent.type(lastName, "test");
    expect(lastName).toHaveValue("test");

    const email = screen.getByRole('textbox', { name: /email \*/i });
    await userEvent.type(email, "test@test.com");
    expect(email).toHaveValue("test@test.com");

    const address = screen.getByRole('textbox', { name: /address \*/i });
    await userEvent.type(address, "test");
    expect(address).toHaveValue('test');

    const phone = screen.getByRole('spinbutton', { name: /phone number \*/i });
    await userEvent.type(phone, "1123456711");
    expect(phone).toHaveValue(1123456711);

    const pwd = screen.getByLabelText(/confirm password \*/i);
    await userEvent.type(pwd, "1123456711");
    expect(pwd).toHaveValue("1123456711");
});

it("Check Error.", async () => {
    render(<Register signedInUser={null} />, {
        wrapper: BrowserRouter,
    });
    const firstName = screen.getByRole('textbox', { name: /first name \*/i });
    await userEvent.type(firstName, "1");
    expect(firstName).toHaveValue("1");

    await userEvent.click(screen.getByRole('button', {  name: /sign up/i}));
    expect(screen.getByText(/first name should be alphabetic/i)).toBeInTheDocument();

    const lastName = screen.getByRole('textbox', { name: /last name \*/i });
    await userEvent.type(lastName, "1");
    expect(lastName).toHaveValue("1");

    await userEvent.click(screen.getByRole('button', {  name: /sign up/i}));
    expect(screen.getByText(/last name should be alphabetic/i)).toBeInTheDocument();

    const phone = screen.getByRole('spinbutton', { name: /phone number \*/i });
    await userEvent.type(phone, "123");

    await userEvent.click(screen.getByRole('button', {  name: /sign up/i}));
    expect(screen.getByText(/phone number should have 10 numbers/i)).toBeInTheDocument();

    const pwd = screen.getAllByLabelText(/password/i)[0];
    const confirmPwd = screen.getAllByLabelText(/password/i)[1];

    await userEvent.type(pwd, "123");
    await userEvent.type(confirmPwd, "12");
    await userEvent.click(screen.getByRole('button', {  name: /sign up/i}));
    expect(screen.getByText(/passwords should match!/i)).toBeInTheDocument();
});
