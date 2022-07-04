import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import jwt_decode from 'jwt-decode';
import { useNavigate, Navigate } from "react-router-dom";
import CryptoJS from "crypto-js";

export default function LogIn({ setLoggedInUser, signedInUser }) {
  const [error, setError] = useState({});
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();

  const tableRef = useRef(null);
  useEffect(() => {
    tableRef.current.focus();
  }, []);

  const login = async (e) => {
    e.preventDefault();
    let error = {};

    if (!email || !password) {
      error.login = "Fill all fields!";
    }

    setError(error);

    if (Object.keys(error).length !== 0) {
      return;
    }

    let encryptedPassword = CryptoJS.AES.encrypt(password, process.env.REACT_APP_SECRET).toString();

    const user = {
      email, encryptedPassword
    };

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(user),
      });
      if (!response.ok) {
        setError(await response.json());
        return;
      } else {
        const data = await response.json();
        const { email } = jwt_decode(data.accessToken)
        const user = {
          firstName: data._doc.firstName,
          lastName: data._doc.lastName,
          address: data._doc.address,
          phone: data._doc.mobileNumber,
          email,
          token: data.accessToken,
          accessLevel: data._doc.userType === 'Admin' ? 1 : 0
        }
        setLoggedInUser(user);
      }
      navigate(-1);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    !signedInUser ? (
      <div className="logInContainer">
        <h2>Log in to your account</h2>
        <form onSubmit={login}>
          <div className="input-container">
            <label htmlFor="email">Email Address *</label>
            <br />
            <input
              className="form-control"
              ref={tableRef}
              id="email"
              type="email"
              name="email"
              placeholder="name@example.com"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            {error && error.email && (
              <div className="text-danger">{error.email}</div>
            )}
          </div>
          <div className="input-container">
            <label htmlFor="password">Password *</label>
            <br />
            <input
              id="password"
              className="form-control"
              type="password"
              name="password"
              placeholder="Your Password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && error.password && (
              <div className="text-danger">{error.password}</div>
            )}
            <br />
          </div>

          {error && error.login && (
            <div className="text-danger">{error.login}</div>
          )}

          <div className="button-container d-grid gap-2 col-6 mx-auto">
            <button
              className="btn btn-outline-primary"
              type="submit"
              value="Sign In"
            >
              SIGN IN
            </button>
          </div>
          <p>
            Do not have an account? <Link to="/register">Register now</Link>
          </p>
        </form>
      </div>
    ) : (<Navigate to="/" />)
  );
}
