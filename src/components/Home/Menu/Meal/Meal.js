import React from "react";
import { Link } from "react-router-dom";
import { addToDatabaseCart, getDatabaseCart } from "../../../../Data/dbManager";
import "./Meal.scss";

export default function Meal({ meal, cart, setCart }) {
  const { name, type, id, price } = meal;

  const handleAddOrder = (event) => {
    event.preventDefault();
    let value = 1;
    if (getDatabaseCart()[name]) {
      value = getDatabaseCart()[name] + 1;
    }
    addToDatabaseCart(name, value);

    const newCart = [...cart];
    const existingItem = cart.find((meal) => meal.name === name);

    if (existingItem) {
      const changedItem =
        newCart[newCart.indexOf(newCart.find((meal) => meal.name === name))];
      changedItem.quantity = value;
      setCart(newCart);
    } else {
      const newItem = meal;
      newItem.quantity = 1;
      newCart.push(newItem);
      setCart(newCart);
    }
  };
  return (
    <Link
      to={"/" + type + "/" + name}
      className="m-4 p-3 text-center meal d-flex flex-column"
    >
      <img
        className="img-fluid m-auto d-block"
        src={`/images/${type}/${type}${id}.png`}
        alt={name}
      />
      <h4 className="my-2">{name}</h4>
      <p>{name}</p>
      <big>
        <strong>${price}</strong>
      </big>
      <br />
      <button onClick={handleAddOrder} className="btn-brand">
        <i className="lni lni-cart"></i> Add to Orders
      </button>
    </Link>
  );
}
