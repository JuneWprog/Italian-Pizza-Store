import { BsPersonCircle } from "react-icons/bs";
import { DropdownButton, Dropdown } from "react-bootstrap";
import { Link, useNavigate, Navigate } from "react-router-dom";

export default function SignInLink({
  resetCartItems,
  setLoggedInUser,
  signedInUser,
}) {
  return signedInUser ? (
    <SignedIn
      resetCartItems={resetCartItems}
      setLoggedInUser={setLoggedInUser}
      signedInUser={signedInUser}
    />
  ) : (
    <LoginButton />
  );
}

function LoginButton() {
  let navigate = useNavigate();
  return (
    <div className="logIn">
      <button onClick={() => navigate("/login")}>Sign In</button>
    </div>
  );
}

function logout(resetCartItems, setLoggedInUser) {
  setLoggedInUser(null);
  resetCartItems([]);
  <Navigate to="/" />;
}

function LogoutButton({ resetCartItems, setLoggedInUser }) {
  return (
    <div className="logOut">
      <button
        data-testid="logout"
        aria-label="logout"
        onClick={() => {
          logout(resetCartItems, setLoggedInUser);
        }}
      >
        Log out
      </button>
    </div>
  );
}

function SignedIn({ resetCartItems, setLoggedInUser, signedInUser }) {
  return (
    <nav>
      <DropdownButton
        id="dropdown-button"
        variant="light"
        title={<BsPersonCircle role="img" aria-label="signed in user" />}
      >
        <Dropdown.Item as={Link} to="/profile">Your Profile</Dropdown.Item>
        {signedInUser.accessLevel === 0 && (
          <>
            <hr />
            <Dropdown.Item as={Link} to="/cart">Your Shopping Cart</Dropdown.Item>
            <hr />
            <Dropdown.Item as={Link} to="/orders">Your Orders</Dropdown.Item>
          </>
        )}
        <hr />
        <Dropdown.Item>
          <LogoutButton
            resetCartItems={resetCartItems}
            setLoggedInUser={setLoggedInUser}
          />
        </Dropdown.Item>
      </DropdownButton>
    </nav>
  );
}
