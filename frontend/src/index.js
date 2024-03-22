import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import store from './store';
// import { Elements } from '@stripe/react-stripe-js';

import {positions,transitions,Provider as AlertProvider} from "react-alert"
import AlertTemplate from "react-alert-template-basic"
// import { loadStripe } from '@stripe/stripe-js';

const options ={
  timeout:5000,
  position:positions.BOTTOM_CENTER,
  transition:transitions.SCALE,
}

//const stripeApiKey = loadStripe("pk_test_51OqsQpSAMoep2hpsxgvUu9xjq8KB6mFKjvdNN5k2EJJa2Z4dfc9ZAdhirKh7xPIsXaJj8Xy0hBhtQb0GcrCb9rC500GLOptuaE")


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    {/* <Elements stripe={stripeApiKey}> */}
    <AlertProvider template={AlertTemplate} {...options}>
    <App />
    </AlertProvider>
    {/* </Elements> */}
    </Provider>
);
