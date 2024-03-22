import "./App.css";
import Header from "./component/layout/Header/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WebFont from "webfontloader";
import React, { useState, useEffect } from "react";
import Footerp from "./component/layout/Footer/Footerp";
import Home from "./component/home/Home";
import ProductDetails from "./component/Product/ProductDetails.jsx";
import Products from "./component/Product/Products.js";
import Search from "./component/Product/Search.js";
import LoginSignUp from "./component/User/LoginSignup.js";
import store from "./store.js";
import { loadUser } from "./actions/userAction.js";
import UserOptions from "./component/layout/Header/UserOptions.js";
import { useSelector } from "react-redux";
import Profile from "./component/User/Profile.js";
import ProtectedRoute from "./component/Route/ProtectedRoute.js";
import UpdateProfile from "./component/User/UpdateProfile.js";
import UpdatePassword from "./component/User/UpdatePassword.js";
import ForgotPassword from "./component/User/ForgotPassword.js";
import ResetPassword from "./component/User/ResetPassword.js";
import Cart from "./component/Cart/Cart.js";
import Shipping from "./component/Cart/Shipping.js";
import ConfirmOrder from "./component/Cart/ConfirmOrder.js";
import Payment from "./component/Cart/Payment.js";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from "./component/Cart/OrderSuccess.js";
import MyOrders from "./component/Orders/MyOrders.js";
import OrderDetails from "./component/Orders/OrderDetails.js";
import Dashboard from "./component/admin/Dashboard.js";
import ProductList from "./component/admin/ProductList.js";
import Cookies from "js-cookie";
import NewProduct from "./component/admin/NewProduct.js";
import UpdateProduct from "./component/admin/UpdateProduct.js"
import OrdersList from "./component/admin/OrdersList.js";
import ProcessOrder from "./component/admin/ProcessOrder.js";
import UserList from "./component/admin/UserList.js";
import UpdateUser from "./component/admin/UpdateUser.js";
import ProductReviews from "./component/admin/ProductReviews.js";
import About from "./component/layout/About/About.js";
import ContactPage from "./component/layout/Contact/Contact.js";
import NotFound from "./component/layout/Not found/NotFound.js";
export var baseurl = "http://localhost:8000/api/v1/";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [stripeApiKey, setStripeApiKey] = useState("");


  async function getStripeApiKey() {
    try {
      const cookieToken = Cookies.get("token");
  
      if (!cookieToken) {
        throw new Error("Token not found in cookie");
      }
  
      const response = await fetch(`${baseurl}stripeapikey`, {
        headers: {
          Authorization: `Bearer ${cookieToken}`,
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch Stripe API key");
      }
  
      const data = await response.json();
  
      if (!data || !data.stripeApiKey) {
        throw new Error("Stripe API key not found in response");
      }
  
      const stripeApiKey = data.stripeApiKey;
      Cookies.set("stripeApiKey", stripeApiKey, { expires: 7 }); // Store the API key in a cookie with a 7-day expiry
      setStripeApiKey(stripeApiKey);
    } catch (error) {
     // console.error("Error fetching Stripe API key:", error.message);
      // Provide a fallback value for `stripeApiKey` in case of API call failure
      const fallbackStripeApiKey =
        "pk_test_51OqsQpSAMoep2hpsxgvUu9xjq8KB6mFKjvdNN5k2EJJa2Z4dfc9ZAdhirKh7xPIsXaJj8Xy0hBhtQb0GcrCb9rC500GLOptuaE";
      Cookies.set("stripeApiKey", fallbackStripeApiKey, { expires: 7 }); // Store the fallback API key in a cookie with a 7-day expiry
      setStripeApiKey(fallbackStripeApiKey);
    }
  }
  
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    getStripeApiKey();

    store.dispatch(loadUser());
  }, []);

 // window.addEventListener("contextmenu", (e) => e.preventDefault());

  return (
    <Router>
      <Header /> {isAuthenticated && <UserOptions user={user} />}
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/products" element={<Products />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactPage />} />

        <Route path="/products/:keyword" element={<Products />} />
        <Route path="/search" element={<Search />} />
        <Route path="/account" element={<Profile />} />
        <Route path="/me/update" element={<UpdateProfile />} />
        <Route path="/password/update" element={<UpdatePassword />} />
        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />
        <Route path="/login" element={<LoginSignUp />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/order/confirm" element={<ConfirmOrder />} />
        <Route path="/success" element={<OrderSuccess />} />
        <Route path="/orders" element={<MyOrders />} />
        <Route path="/order/:id" element={<OrderDetails />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/products" element={<ProductList />} />
        <Route path="/admin/product" element={<NewProduct />} />
        <Route path="/admin/product/:id" element={<UpdateProduct />} />
        <Route path="/admin/orders" element={<OrdersList />} />
        <Route path="/admin/order/:id" element={<ProcessOrder />} />
        <Route path="/admin/users" element={<UserList />} />
        <Route path="/admin/user/:id" element={<UpdateUser />} />
        <Route path="/admin/reviews" element={<ProductReviews />} />
        <Route path="*" element={<NotFound />} />

        {stripeApiKey && (
          <Route
            path="/process/payment"
            element={
              <Elements stripe={loadStripe(stripeApiKey)}>
                <Payment stripeApiKey={stripeApiKey} />
              </Elements>
            }
          />
        )}
      </Routes>
      <Footerp />
    </Router>
  );
}
export default App;
