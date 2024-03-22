import React, { Fragment, useEffect, useRef } from 'react'
import CheckoutSteps from './CheckoutSteps'
import { useDispatch, useSelector } from 'react-redux'
import MetaData from '../layout/MataData'
import { Typography } from '@material-ui/core'
import { useAlert } from 'react-alert'
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js'
import axios from 'axios'
import './payment.css'
import { CreditCard, Calendar, KeyRound } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { clearErrors, createOrder } from '../../actions/orderAction'
import { baseurl } from '../../App'

// 4000003560000008
const Payment = ({ stripeApiKey }) => {
  const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'))

  const dispatch = useDispatch()
  const alert = useAlert()
  const stripe = useStripe()
  const elements = useElements()
  const navigate = useNavigate()
  const { shippingInfo, cartItems } = useSelector((state) => state.cart)
  const { user } = useSelector((state) => state.user)
  const { error } = useSelector((state) => state.newOrder)
  const payBtn = useRef(null)
  

  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
    currency: 'INR',
  }

  const order = {
    shippingInfo,
    orderItems: cartItems.map((item) => ({
      ...item,
      quantity: item.quantity,
      price: item.price,
    })),
    itemsPrice: orderInfo.subtotal,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalPrice,
  }


  const submitHandler = (e) => {
    e.preventDefault();
  
    payBtn.current.disabled = true;
  
    // Check if Stripe and Elements are initialized
    if (!stripe || !elements || !elements.getElement(CardNumberElement)) {
      throw new Error('Stripe or Elements not properly initialized');
    }
  
    // Check if the user's business is registered in India
    if (!user || user.businessType !== 'INDIAN_COMPANY') {
      // const errorMessage = 'Only registered Indian businesses can accept international payments. However, you can still proceed with the payment if you wish.';
      // console.error(errorMessage); // Log the error message
      // alert.error(errorMessage);
    }
  
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
  
    axios.post(`${baseurl}payment/process`, paymentData, config)
      .then((response) => {
        const data = response.data;
        const client_secret = data.client_secret;
        return stripe.confirmCardPayment(client_secret, {
          payment_method: {
            card: elements.getElement(CardNumberElement),
            billing_details: {
              name: user.name,
              email: user.email,
              address: {
                line1: shippingInfo.address,
                city: shippingInfo.city,
                state: shippingInfo.state,
                postal_code: shippingInfo.pinCode,
                country: shippingInfo.country,
              },
              phone: shippingInfo.phoneNumber,
            },
          },
        });
      })
      .then((result) => {
        console.log('Stripe payment confirmation result:', result);
        if (result.error) {
          payBtn.current.disabled = false;
          alert.error(result.error.message);
        } else {
          if (result.paymentIntent.status === 'succeeded') {
            order.paymentInfo = {
              id: result.paymentIntent.id,
              status: result.paymentIntent.status,
            };
            dispatch(createOrder(order));
            navigate('/success');
          } else {
            alert.error('There is some issue while processing payment');
          }
        }
      })
      .catch((error) => {
        console.error('Error during payment processing:', error);
        payBtn.current.disabled = false;
        alert.error(error.response ? error.response.data.message : 'An error occurred while processing payment');
      });
  };

  
  
  
  
  

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
    }, [dispatch, error, alert]);

    return (
      <Fragment>
        <MetaData title="Payment" />
        <CheckoutSteps activeStep={2} />
        <div className="paymentContainer">
          {/* <Elements stripe={loadStripe(stripeApiKey)}> */}
            <form className="paymentForm" onSubmit={(e) => submitHandler(e)}>
              <Typography>Card Info</Typography>
              <div>
                <CreditCard />
                <CardNumberElement className="paymentInput" />
              </div>
              <div>
                <Calendar />
                <CardExpiryElement className="paymentInput" />
              </div>
              <div>
                <KeyRound />
                <CardCvcElement className="paymentInput" />
              </div>
  
              <input
                type="submit"
                value={`Pay - ₹${orderInfo && orderInfo.totalPrice}`}
                ref={payBtn}
                className="paymentFormBtn"
              />
            </form>
          {/* </Elements> */}
        </div>
      </Fragment>
    );
  }

export default Payment;
