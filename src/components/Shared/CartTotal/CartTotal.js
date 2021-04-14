import React from "react";
import "./CartTotal.scss";

export default function CartTotal({ cart }) {
  const quantities = [];
  const prices = [];
  cart.map((pd) => quantities.push(pd.quantity));
  cart.map((pd) => prices.push(pd.price));

  const subTotal = parseFloat(
    quantities.reduce((sum, num, i) => sum + num * prices[i], 0).toFixed(2)
  );
  const tax = parseFloat((subTotal / 10).toFixed(3));
  const deliveryFee = cart.length ? 9.99 : 0;
  const total = parseFloat((subTotal + tax + deliveryFee).toFixed(3));
  return (
    <div id="cart-total">
      <span className="total">
        <span>
          <b>Subtotal</b>
        </span>
        <span>
          <b>${subTotal}</b>
        </span>
      </span>
      <span className="total">
        <span>
          <b>Tax</b>
        </span>
        <span>
          <b>${tax}</b>
        </span>
      </span>
      <span className="total">
        <span>
          <b>Delivery Fee</b>
        </span>
        <span>
          <b>${deliveryFee}</b>
        </span>
      </span>
      <span className="total">
        <span>
          <b>Total</b>
        </span>
        <span>
          <b>${total}</b>
        </span>
      </span>
    </div>
  );
}
