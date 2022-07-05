/**
 * links and buttons in the header
 * @author Jun Wang (wang.jun6@northeastern.edu)
 * 
 */
import React from "react";
import Logo from "./Logo";
import SignInLink from "./SignInLink";
import Nav from "./Nav";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Link } from "react-router-dom";
import Badge from "react-bootstrap/Badge";
import SearchButton from "./SearchButton";

export default function Header({ resetCartItems, setLoggedInUser, signedInUser, numberOfItemsInCart }) {
  return (
    <header className="headerContainer">
      <Logo />
      <SearchButton />
      <SignInLink
        resetCartItems={resetCartItems}
        signedInUser={signedInUser}
        setLoggedInUser={setLoggedInUser}
      />
      <CartStatus numberOfItemsInCart={numberOfItemsInCart} />

      <Nav signedInUser={signedInUser} />
    </header>
  );
}

function CartStatus({ numberOfItemsInCart }) {
  return (
    <div className="cartStatus">
      <Link to="/cart">
        <span className="cartIcon">
          <AiOutlineShoppingCart role="button" aria-label="shopping cart" />
        </span>
        <Badge pill bg="danger" role="banner" aria-label={`${numberOfItemsInCart} items in cart`}>
        {numberOfItemsInCart}
      </Badge>
      </Link>
      
    </div>
  );
}
