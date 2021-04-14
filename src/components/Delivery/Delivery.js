import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { UserContext } from "../../App";
import {
  addLoggedInUser,
  addReceiverInfo,
  getReceiverInfo,
  processOrder,
} from "../../Data/dbManager";
import { handleUpdateProfile } from "../../Data/fireAuth";
import CartTotal from "../Shared/CartTotal/CartTotal";
import "./Delivery.scss";
import DeliveryCartItem from "./DeliveryCartItem/DeliveryCartItem";

export default function Delivery({ cart, setCart }) {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const [receiverInfo, setReceiverInfo] = useState({});
  const [deliveryDetailsError, setDeliveryDetailsError] = useState();
  const [isUnableToOrder, setIsUnableToOrder] = useState(true);

  const history = useHistory();

  useEffect(() => {
    const savedReceiverInfo = getReceiverInfo();
    setReceiverInfo(savedReceiverInfo);
    savedReceiverInfo.ToD &&
      savedReceiverInfo.name &&
      savedReceiverInfo.phoneNumber &&
      savedReceiverInfo.address &&
      setIsUnableToOrder(false);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setDeliveryDetailsError();
    const selectedIndex = e.target.querySelector("select").selectedIndex;
    const ToD = e.target.querySelectorAll("select option")[selectedIndex].value;
    const receiverName = e.target.querySelector("input#receiver-name").value;
    const receiverNumber = e.target.querySelector("input#phone-number").value;
    const receiverAddress = e.target.querySelector("input#street-address")
      .value;
    const additionalInfo = e.target.querySelector("input#delivery-instruction")
      .value;
    if (receiverName !== loggedInUser.name) {
      handleUpdateProfile(receiverName).then((res) => {
        if (res) {
          setDeliveryDetailsError(res.message);
        } else {
          const updatedLoggedInUser = { ...loggedInUser };
          updatedLoggedInUser.name = receiverName;
          setLoggedInUser(updatedLoggedInUser);
          addLoggedInUser(updatedLoggedInUser);
        }
      });
    }
    const newReceiverInfo = {
      ToD,
      receiverName,
      receiverNumber,
      receiverAddress,
      additionalInfo,
    };
    setReceiverInfo(newReceiverInfo);
    addReceiverInfo(newReceiverInfo);
    setIsUnableToOrder(false);
  };

  const handleOrder = () => {
    const orderInfo = { ...receiverInfo };
    orderInfo.items = cart;
    const updatedLoggedInUser = { ...loggedInUser };
    if (!updatedLoggedInUser.orders) {
      updatedLoggedInUser.orders = [];
    }
    updatedLoggedInUser.orders.push(orderInfo);
    setLoggedInUser(updatedLoggedInUser);
    addLoggedInUser(updatedLoggedInUser);
    processOrder();
    setReceiverInfo({});
    setCart([]);
    setIsUnableToOrder(true);
    history.replace("/success");
  };

  return (
    <div className="delivery">
      <div id="delivery-details">
        <form
          onSubmit={handleSubmit}
          className="w-75 m-auto d-flex flex-column"
        >
          <h2>Edit Delivery Details</h2>
          <div className="divider"></div>
          <br />
          <select
            name="delivery-type"
            id="delivery-type"
            className="form-control mb-2 mt-3 p-2"
          >
            <option value="Cash on Order">Cash on Order</option>
            <option value="Cash on Delivery">
              Cash on Delivery (only for Previous Customers)
            </option>
            <option value="VIP Delivery">
              VIP Delivery (only for VIP Customers)
            </option>
          </select>

          <input
            type="text"
            name="receiver-name"
            id="receiver-name"
            defaultValue={loggedInUser.name}
            className="form-control my-2 p-2"
            placeholder="Enter Your Name"
            required
          />

          <input
            type="tel"
            name="phone-number"
            id="phone-number"
            defaultValue={loggedInUser.phoneNumber}
            className="form-control my-2 p-2"
            placeholder="Enter Your Phone Number"
            required
          />

          <input
            type="text"
            name="street-address"
            id="street-address"
            className="form-control my-2 p-2"
            placeholder="Enter Your Address"
            required
          />

          <input
            type="text"
            name="delivery-instruction"
            id="delivery-instruction"
            className="form-control my-2 p-2"
            placeholder="Add any Additional Instruction"
          />

          <button type="submit" className="btn-brand">
            Save & Continue
          </button>
          {
            <b className="text-center text-danger mt-2">
              {deliveryDetailsError}
            </b>
          }
        </form>
      </div>
      <div id="delivery-cart">
        <div>
          {cart.map((pd) => (
            <DeliveryCartItem
              order={pd}
              key={pd.key}
              cart={cart}
              setCart={setCart}
            ></DeliveryCartItem>
          ))}
        </div>
        <CartTotal cart={cart}></CartTotal>
        <button
          onClick={handleOrder}
          className="btn-brand"
          disabled={isUnableToOrder}
        >
          Place Order
        </button>
      </div>
    </div>
  );
}
