import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "./components/Footer.js";
import Header from "./components/Header";
import Home from "./components/Home.js";
import AboutUs from "./components/AboutUs.js";
import ContactUs from "./components/ContactUs.js";
import Menus from "./components/Menus.js";
import AddDish from "./components/AddDish.js";
import DishList from "./components/DishList.js";
import DishDetails from "./components/DishDetails.js";
import Cart from "./components/Cart.js";
import Login from "./components/Login.js";
import Register from "./components/Register.js";
import Profile from "./components/Profile.js";
import UpdateDish from "./components/UpdateDish.js";
import OrderList from "./components/OrderList";
import OrderDetails from "./components/OrderDetails";
import Payment from "./components/Payment";
import Search from "./components/Search";
import NotFoundPage from "./components/NotFoundPage.js";

export default function App() {
  let cartFromLocalStorage = JSON.parse(localStorage.getItem("pizzajoint-cartItems")) || [];
  let userLocal = localStorage.getItem("pizzajoint-user");
  userLocal = userLocal ? JSON.parse(userLocal) : null;
  const [user, setUser] = useState(userLocal);
  const [cartItems, setCartItems] = useState(cartFromLocalStorage);
  const [order, setOrder] = useState(null);
  const totalNumber = cartItems.reduce((a, c) => a + c.quantity, 0);

  const setLoggedInUser = (user) => {
    setUser(user);
    localStorage.setItem("pizzajoint-user", JSON.stringify(user));
  };

  const resetCartItems = (cartItems) => {
    setCartItems(cartItems);
    localStorage.setItem("pizzajoint-cartItems", JSON.stringify(cartItems));
  };

  const onAdd = (dish) => {
    const exist = cartItems.find((x) => x._id === dish._id);
    if (exist) {
      resetCartItems(
        cartItems.map((x) =>
          x._id === dish._id ? { ...exist, quantity: exist.quantity + 1 } : x
        )
      );
    } else {
      resetCartItems([...cartItems, { ...dish, quantity: 1 }]);
    }
  };

  const onRemove = (dish) => {
    const exist = cartItems.find((x) => x._id === dish._id);
    if (exist.quantity === 1) {
      resetCartItems(cartItems.filter((x) => x._id !== dish._id));
    } else {
      resetCartItems(
        cartItems.map((x) =>
          x._id === dish._id ? { ...exist, quantity: exist.quantity - 1 } : x
        )
      );
    }
  };

  return (
    <div className="container">
      <div className="App">
        <Header
          setLoggedInUser={setLoggedInUser}
          resetCartItems={resetCartItems}
          signedInUser={user}
          numberOfItemsInCart={totalNumber}
        />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Home />
                <Menus />
                <AboutUs />
                <Footer />
              </>
            }
          />

          <Route
            path="/about-us"
            element={
              <>
                <AboutUs />
                <Footer />
              </>
            }
          />
          <Route
            path="/contact-us"
            element={
              <>
                <ContactUs />
                <Footer />
              </>
            }
          />

          <Route
            path="/profile"
            element={
              <>
                <Profile
                  setLoggedInUser={setLoggedInUser}
                  signedInUser={user}
                />
                <Footer />
              </>
            }
          />

          <Route
            path="/dishes/addDish"
            element={
              <>
                <AddDish signedInUser={user} />
                <Footer />
              </>
            }
          ></Route>
          <Route
            path="/dishes/:dishId"
            element={
              <>
                <DishDetails signedInUser={user} onAdd={onAdd} />
                <Footer />
              </>
            }
          ></Route>
          <Route
            path="/dishes/:dishId/update"
            element={
              <>
                <UpdateDish signedInUser={user} />
                <Footer />
              </>
            }
          ></Route>

          <Route
            path="/menus"
            element={
              <>
                <Menus />
                <Footer />
              </>
            }
          />

          <Route
            path="/search"
            element={
              <>
                <Search />
                <Footer />
              </>
            }
          />

          <Route
            path="/search/:criteria"
            element={
              <>
                <Search onAdd={onAdd} />
                <Footer />
              </>
            }
          />

          <Route
            path="/menus/:category"
            element={
              <>
                <DishList signedInUser={user} onAdd={onAdd} />
                <Footer />
              </>
            }
          />
          <Route
            path="/cart"
            element={
              <>
                <Cart
                  signedInUser={user}
                  cartItems={cartItems}
                  onAdd={onAdd}
                  onRemove={onRemove}
                  setOrder={setOrder} />
                <Footer />
              </>
            }
          />

          <Route
            path="/login"
            element={
              <>
                <Login setLoggedInUser={setLoggedInUser}
                  signedInUser={user} />
                <Footer />
              </>
            }
          />

          <Route
            path="/register"
            element={
              <>
                <Register signedInUser={user} />
                <Footer />
              </>
            }
          />

          <Route
            path="/payment"
            element={
              <>
                <Payment
                  signedInUser={user}
                  order={order}
                  resetCartItems={resetCartItems}
                  setOrder={setOrder}
                />
              </>
            }
          ></Route>
          <Route
            path="/orders"
            element={
              <>
                <OrderList signedInUser={user} />
                <Footer />
              </>
            }
          />

          <Route
            path="/orders/:orderId"
            element={
              <>
                <OrderDetails signedInUser={user} />
                <Footer />
              </>
            }
          />

          <Route
            path="*"
            element={
              <>
                <NotFoundPage />
                <Footer />
              </>
            }
          />
        </Routes>
      </div>
    </div>
  );
}
