import React from "react";
import { removeFromDatabaseCart } from "../../Data/dbManager";
import "./Cart.scss";
import CartItem from "./CartItem/CartItem";
import CartTotal from "../Shared/CartTotal/CartTotal";
import { Link } from "react-router-dom";

export default function Cart({ cart, setCart }) {
  const removeProduct = (pdName) => {
    const newCart = cart.filter((pd) => pd.name !== pdName);
    setCart(newCart);
    removeFromDatabaseCart(pdName);
  };

  return (
    <div id="cart" className="d-flex flex-wrap justify-content-around">
      <div id="cart-items">
        {cart.map((order) => (
          <CartItem
            cart={cart}
            setCart={setCart}
            key={order.key}
            removeProduct={removeProduct}
            order={order}
          ></CartItem>
        ))}
      </div>
      <div className="cart-total">
        <CartTotal cart={cart}></CartTotal>
        <button className="btn-brand">
          <Link disabled={!cart.length} to="/receive-your-order">
            Proceed to Checkout
          </Link>
        </button>
      </div>
    </div>
  );
}
