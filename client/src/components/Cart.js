/**
 * Display shoppping cart items
 * @author Jun Wang (wang.jun6@northeastern.edu)
 * 
 */
import React from 'react';
import Button from "react-bootstrap/Button";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';

export default function Cart(props) {
    let navigate = useNavigate();
    let { cartItems, onAdd, onRemove, signedInUser, setOrder } = props;
    let itemsPrice = cartItems.reduce((a, c) => a + c.quantity * c.price, 0);
    itemsPrice = itemsPrice.toFixed(2);
    const taxPrice = (itemsPrice * 0.05).toFixed(2);
    const shippingPrice = itemsPrice > 30 ? 0 : 10;
    const totalPrice = (Number(itemsPrice) + Number(taxPrice) + shippingPrice).toFixed(2);
    const totalNumber = cartItems.reduce((a, c) => a + c.quantity, 0);

    const handleSubmit = ((e) => {
        e.preventDefault();
        if (signedInUser === null) {
            navigate("/login");
        } else {
            const email = signedInUser.email;
            const newInvoice = {
                email,
                cartItems,
                totalNumber,
                itemsPrice,
                taxPrice,
                shippingPrice,
                totalPrice,
            };
            setOrder(newInvoice);
            navigate("/payment");
        }
    });

    return cartItems.length > 0 ? (
        <>
            <h2 className="cartTitle"> Your Cart</h2>
            <div className="cartDetailContainer">
                <ul>
                    {cartItems.map((item) => (
                        <CartItem
                            key={item._id}
                            item={item}
                            onAdd={onAdd}
                            onRemove={onRemove}
                        />
                    ))}
                </ul>
                <div className="summary">
                    <p>Free shipping on orders of $30 or more</p>
                    <p>{totalNumber} items</p>
                    <hr></hr>
                    <p>
                        Subtotal: <span>{itemsPrice}</span>
                    </p>
                    <p>
                        Order Tax GST 5%: <span>{taxPrice}</span>
                    </p>
                    <p>
                        Shipping:{" "}
                        <span>{shippingPrice === 0 ? "Free" : shippingPrice}</span>
                    </p>

                    <p>
                        Total: <span>${totalPrice}</span>
                    </p>
                    <hr />
                    <p>
                        {totalNumber}items <span>${totalPrice}</span>
                    </p>

                    <div className="cartButtons">
                        <Button
                            className="checkOutBtn"
                            onClick={handleSubmit}
                            variant="danger"
                        >
                            Check out
                        </Button>
                        <br />
                        <br></br>
                        <Button className="addMoreBtn" href="/menus" variant="secondary">
                            Add more food
                        </Button>
                    </div>
                </div>
            </div>
        </>
    ) : (
        <div className="emptyCart">
            <h2 className="cartTitle"> Your Cart</h2>
            <div className="suggestion">
                <p>Your cart is empty</p>
                <Button className="addMoreBtn" href="/menus" variant="secondary">
                    Add food to your cart
                </Button>
            </div>
        </div>
    );
}

function CartItem({ item, onAdd, onRemove }) {
    const { name, description, imagePath, price, quantity } = item;
    const sub = (price * quantity).toFixed(2);

 return (
    <>
      <li>
        <div className="itemContainer container">
          <div className="itemImage">
            <img src={`/${imagePath}`} alt={name} />
          </div>
          <div className="itemDetail">
            <div className="itemName">
              {quantity} X {name}
              <span>${sub}</span>
            </div>
            <p className="itemDiscrip">{description}</p>
            <p>Price: ${price}</p>

            <div className="updateQuantity">
              <button
                aria-label="delete"
                onClick={() => onRemove(item)}
              >
                <AiOutlineMinusCircle role="img" aria-label="delete one" />
              </button>
              <span>{quantity}</span>
              <button
                data-testid="add"
                aria-label="add"
                onClick={() => onAdd(item)}
              >
                <AiOutlinePlusCircle role="img" aria-label="add one" />
              </button>
            </div>
          </div>
        </div>
      </li>
    </>
  );
}

