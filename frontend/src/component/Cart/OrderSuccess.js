import React from 'react'
import {CheckCheckIcon} from "lucide-react"
import "./OrderSuccess.css";
import { Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

const OrderSuccess = () => {
  return (
    <div className='orderSuccess'>
      <CheckCheckIcon />

      <Typography>Your Order has been Placed successfully</Typography>
      <Link to="/orders">View Orders</Link>
    </div>
  )
}

export default OrderSuccess
