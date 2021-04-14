import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import "./MealDetail.scss";
import menuData from "../../../../Data/menuData";
import { Link } from "react-router-dom";
import { addToDatabaseCart, getDatabaseCart } from "../../../../Data/dbManager";

export default function MealDetail({ cart, setCart }) {
  const [orderCount, setOrderCount] = useState(1);

  const { mealName } = useParams();

  const onlyMealDeta = [...menuData[0], ...menuData[1], ...menuData[2]];

  const meal = onlyMealDeta.find((menuItem) => menuItem.name === mealName);
  const { id, key, name, price, type } = meal;

  let lsIndex;
  let rsIndex;
  const [msIndex, setMsIndex] = useState(key - 1);
  useEffect(() => {
    setMsIndex(key - 1);
  }, [key]);

  (() => {
    if (msIndex === 0) {
      lsIndex = 17;
      rsIndex = msIndex + 1;
    } else if (msIndex === 17) {
      lsIndex = msIndex - 1;
      rsIndex = 0;
    } else {
      lsIndex = msIndex - 1;
      rsIndex = msIndex + 1;
    }
  })();

  const leftMeal = onlyMealDeta[lsIndex];
  const middleMeal = onlyMealDeta[msIndex];
  const rightMeal = onlyMealDeta[rsIndex];

  const handleAddOrder = () => {
    let value = 1;
    if (getDatabaseCart()[name]) {
      value = getDatabaseCart()[name] + orderCount;
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
      newItem.quantity = value;
      newCart.push(newItem);
      setCart(newCart);
    }
    setOrderCount(1);
  };
  return (
    <div className="meal-detail d-flex flex-wrap">
      <div className="half-md d-flex justify-content-center align-items-center">
        <div className="p-10">
          <div className="large-container">
            <h1>{name}</h1>
            <small>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas
              sapiente vero modi et enim nostrum itaque veritatis, nemo
              reprehenderit sint tempora quaerat quia suscipit excepturi harum
              quam, consequuntur a molestiae.
            </small>
            <br />
            <br />
            <div className="d-flex justify-content-center align-items-center">
              <h3 className="d-inline-block mr-3">${price}</h3>
              <span className="order-counter">
                <span
                  className="oc oc-handler"
                  onClick={() => {
                    if (orderCount > 1) {
                      setOrderCount(orderCount - 1);
                    }
                  }}
                >
                  -
                </span>
                <span className="oc">{orderCount}</span>
                <span
                  className="oc oc-handler oc-plus"
                  onClick={() => setOrderCount(orderCount + 1)}
                >
                  +
                </span>
              </span>
            </div>

            <br />
            <button onClick={handleAddOrder} className="btn-brand">
              <i className="lni lni-cart mr-1"></i>
              Add to Orders
            </button>
            <div className="d-flex flex-shrink-0 align-items-center mt-5 mini-map">
              <div className="w-25">
                <Link
                  className="img-fluid"
                  to={"/" + leftMeal.type + "/" + leftMeal.name}
                >
                  <img
                    className="img-fluid d-block"
                    src={`/images/${leftMeal.type}/${leftMeal.type}${leftMeal.id}.png`}
                    alt={leftMeal.name}
                  />
                </Link>
                <b>{leftMeal.name}</b>
              </div>
              <div className="w-25">
                <Link
                  className="img-fluid"
                  to={"/" + middleMeal.type + "/" + middleMeal.name}
                >
                  <img
                    className="img-fluid d-block"
                    src={`/images/${middleMeal.type}/${middleMeal.type}${middleMeal.id}.png`}
                    alt={middleMeal.name}
                  />
                </Link>
                <b>{middleMeal.name}</b>
              </div>
              <div className="w-25">
                <Link
                  className="img-fluid"
                  to={"/" + rightMeal.type + "/" + rightMeal.name}
                >
                  <img
                    className="img-fluid d-block"
                    src={`/images/${rightMeal.type}/${rightMeal.type}${rightMeal.id}.png`}
                    alt={rightMeal.name}
                  />
                </Link>
                <b>{rightMeal.name}</b>
              </div>
              <span
                onClick={() => {
                  msIndex < 3
                    ? setMsIndex(msIndex + 18 - 3)
                    : setMsIndex(msIndex - 3);
                }}
                id="prev"
              >
                ❮
              </span>
              <span
                onClick={() => {
                  msIndex > 14
                    ? setMsIndex(msIndex - 18 + 3)
                    : setMsIndex(msIndex + 3);
                }}
                id="next"
              >
                ❯
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="half-md d-flex justify-content-center align-items-center">
        <div className="p-10">
          <div className="large-container">
            <img
              className="img-fluid d-block "
              src={`/images/${type}/${type}${id}.png`}
              alt={name}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
