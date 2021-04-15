import React, { useState } from "react";
import { addToDatabaseCart } from "../../../Data/dbManager";
import "./CartItem.scss";

export default function CartItem({ order, removeProduct, cart, setCart }) {
  const { name, type, id } = order;
  const [quantity, setQuantity] = useState(order.quantity);

  const handleQuantity = (change, limit) => {
    if (quantity > limit) {
      setQuantity(quantity + change);
      addToDatabaseCart(name, quantity + change);
      const newCart = [...cart];
      const changedItem =
        newCart[newCart.indexOf(newCart.find((meal) => meal.name === name))];
      changedItem.quantity = changedItem.quantity + change;
      setCart(newCart);
    }
  };
  return (
    <div className="cart-item">
      <img
        className="img-fluid order-image"
        src={`/images/${type}/${type}${id}.png`}
        alt={name}
      />
      <h4>{name}</h4>
      <span className="order-counter">
        <span className="oc oc-handler" onClick={() => handleQuantity(-1, 1)}>
          -
        </span>
        <span className="oc">{quantity}</span>
        <span
          className="oc oc-handler oc-plus"
          onClick={() => {
            handleQuantity(1, 0);
          }}
        >
          +
        </span>
      </span>
      <button className="btn-brand" onClick={() => removeProduct(name)}>
        Remove
      </button>
    </div>
  );
}
