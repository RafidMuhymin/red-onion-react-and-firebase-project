import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Meal from "./Meal/Meal";
import MealDetail from "./MealDetail/MealDetail";
import "./Menu.scss";
import menuData from "../../../Data/menuData";

export default function Menu({ cart, setCart }) {
  const [menu, setMenu] = useState(menuData[0]);
  const setCurMenuTab = (event) => {
    document.getElementById("cur-menu-tab").id = "";
    event.target.id = "cur-menu-tab";
  };

  return (
    <div>
      <Router>
        <div className="text-center mb-5">
          <div className="links">
            <Link
              className="menu-tabs"
              to="/"
              id="cur-menu-tab"
              onClick={(event) => {
                setCurMenuTab(event);
                setMenu(menuData[0]);
              }}
            >
              Breakfast
            </Link>
            <Link
              className="menu-tabs"
              to="/"
              onClick={(event) => {
                setCurMenuTab(event);
                setMenu(menuData[1]);
              }}
            >
              Lunch
            </Link>
            <Link
              className="menu-tabs"
              to="/"
              onClick={(event) => {
                setCurMenuTab(event);
                setMenu(menuData[2]);
              }}
            >
              Dinner
            </Link>
          </div>
          <Switch>
            <Route path="/:mealType/:mealName">
              <MealDetail cart={cart} setCart={setCart}></MealDetail>
            </Route>
            <Route path="/">
              <div className="d-flex justify-content-center">
                <div className="menu d-flex flex-wrap justify-content-center">
                  {menu.map((meal) => (
                    <Meal
                      cart={cart}
                      setCart={setCart}
                      key={meal.id}
                      meal={meal}
                    ></Meal>
                  ))}
                </div>
              </div>
              <br />
            </Route>
          </Switch>
          <button disabled={localStorage.length === 0} className="btn-brand">
            <Link to="/receive-your-order">Proceed to Checkout</Link>
          </button>
        </div>
      </Router>
    </div>
  );
}
