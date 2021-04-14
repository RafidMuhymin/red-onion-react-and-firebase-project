import React, { useContext } from "react";
import { UserContext } from "../../App";
import { initFirebase } from "../../Data/fireAuth";
import "./Profile.scss";

export default function Profile() {
  const [loggedInUser] = useContext(UserContext);

  initFirebase();
  return (
    <div
      id="profile"
      className="d-flex flex-wrap m-auto justify-content-center"
    >
      <div className="half mt-5">
        <div className="d-flex align-items-center">
          <div>
            {loggedInUser.photoURL ? (
              <img
                className="profile-picture"
                id="output"
                src={loggedInUser.photoURL}
                alt={loggedInUser.name + "Red Onion Profile Picture"}
              />
            ) : (
              <div className="profile-picture fake-profile-picture d-flex justify-content-center align-items-center">
                <span className="text-white">
                  {loggedInUser.name.slice(0, 1)}
                </span>
              </div>
            )}
          </div>
          <div>
            <big className="d-block">
              <b>{loggedInUser.name}</b>
            </big>
            <big className="d-block">
              <b>{loggedInUser.email}</b>
            </big>
          </div>
        </div>
      </div>
      <div className="half flex-grow-1">
        <h1 className="text-center text-primary">
          <small>
            <b>Recent Orders</b>
          </small>
        </h1>
        {loggedInUser.orders && loggedInUser.orders.length > 0 ? (
          loggedInUser.orders.map((order) => (
            <div className="orders">
              <span className="d-block">
                <b>Receiver's Name : </b>
                <span>{order.receiverName}</span>
              </span>
              <span className="d-block">
                <b>Contact Number : </b>
                <span>{order.receiverNumber}</span>
              </span>
              <span className="d-block">
                <b>Delivery Location : </b>
                <span>{order.receiverAddress}</span>
              </span>
              <span className="d-block">
                <b>Delivery Type : </b>
                <span>{order.ToD}</span>
              </span>
              {order.additionalInfo && (
                <span className="d-block">
                  <b>Delivery Instruction : </b>
                  <span>{order.additionalInfo}</span>
                </span>
              )}
              <span className="d-block">
                <b>Ordered Items : </b>
                <span>
                  <ul>
                    {order.items.map((pd) => (
                      <li>
                        <small>
                          {pd.quantity} × {pd.name}
                        </small>
                      </li>
                    ))}
                  </ul>
                </span>
              </span>
            </div>
          ))
        ) : (
          <h2 className="text-center">
            <small>
              <b>You Have Not Ordered Yet</b>
            </small>
          </h2>
        )}
      </div>
    </div>
  );
}
