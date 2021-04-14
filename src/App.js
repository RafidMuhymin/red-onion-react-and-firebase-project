import "./App.scss";
import Navbar from "./components/Shared/Navbar/Navbar";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Footer from "./components/Shared/Footer/Footer";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import SignUp from "./components/SignUp/SignUp";
import { createContext, useEffect, useState } from "react";
import NotFound from "./components/NotFound/NotFound";
import Cart from "./components/Cart/Cart";
import Delivery from "./components/Delivery/Delivery";
import Profile from "./components/Profile/Profile";
import { getDatabaseCart, getLoggedInUser } from "./Data/dbManager";
import menuData from "./Data/menuData";
import Success from "./components/Success/Success";

export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = getDatabaseCart();
    const productNames = Object.keys(savedCart);
    const mealData = [...menuData[0], ...menuData[1], ...menuData[2]];
    const products = productNames.map((pdName) => {
      const product = mealData.find((meal) => meal.name === pdName);
      product.quantity = savedCart[pdName];
      return product;
    });
    setCart(products);
  }, []);

  useEffect(() => {
    const saveduser = getLoggedInUser("loggedInUserInfo");
    setLoggedInUser(saveduser);
  }, []);

  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <Router>
        <Navbar cart={cart}></Navbar>
        <Switch>
          <Route path="/home">
            <Home cart={cart} setCart={setCart}></Home>
          </Route>
          <Route path="/cart">
            <Cart cart={cart} setCart={setCart}></Cart>
          </Route>
          <Route path="/login">
            {!loggedInUser.isSignedIn ? (
              <Login></Login>
            ) : (
              <Redirect to="/profile" />
            )}
          </Route>
          <Route path="/sign-up">
            {!loggedInUser.isSignedIn ? (
              <SignUp></SignUp>
            ) : (
              <Redirect to="/profile" />
            )}
          </Route>
          <Route path="/receive-your-order">
            {loggedInUser.isSignedIn ? (
              <Delivery cart={cart} setCart={setCart}></Delivery>
            ) : (
              <Redirect to="/login" />
            )}
          </Route>

          <Route path="/profile">
            {loggedInUser.isSignedIn ? (
              <Profile></Profile>
            ) : (
              <Redirect to="/login" />
            )}
          </Route>
          <Route path="/success">
            <Success></Success>
          </Route>
          <Route exact path="/">
            <Home cart={cart} setCart={setCart}></Home>
          </Route>
          <Route path="*">
            <NotFound></NotFound>
          </Route>
        </Switch>
        <Footer></Footer>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
