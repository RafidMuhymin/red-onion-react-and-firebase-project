import React, { useState } from "react";
import { addToDatabaseCart } from "../../../Data/dbManager";
import "./DeliveryCartItem.scss";

export default function DeliveryCartItem({ order, cart, setCart }) {
  const { id, name, type, price } = order;
  const [quantity, setQuantity] = useState(order.quantity);

  const handleQuantity = (change) => {
    if (quantity > 1) {
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
    <div className="d-flex delivery-cart-item">
      <div className="d-inline-block w-25">
        <img
          src={`/images/${type}/${type}${id}.png`}
          alt={name}
          className="img-fluid"
        />
      </div>
      <div className="d-flex flex-column w-50">
        <small>
          <b>{name}</b>
        </small>
        <b className="text-danger">${price}</b>
      </div>
      <div className="w-25 counter-container">
        <span className="order-counter">
          <span
            className="oc oc-handler"
            onClick={() => {
              handleQuantity(-1);
            }}
          >
            -
          </span>
          <span className="oc">{quantity}</span>
          <span
            className="oc oc-handler oc-plus"
            onClick={() => {
              handleQuantity(1);
            }}
          >
            +
          </span>
        </span>
      </div>
    </div>
  );
}
