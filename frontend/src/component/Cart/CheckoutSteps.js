import React, { Fragment } from 'react'
import { Truck, CheckCheck ,Landmark } from 'lucide-react';
import { Step, StepLabel, Stepper, Typography } from '@material-ui/core';
import "./CheckoutSteps.css"
const CheckoutSteps = ({activeStep}) => {

    const steps =[
        {
            label: <Typography>Shipping Details</Typography>,
            icon:<Truck />,
        },
        {
            label: <Typography>Confirm Orders</Typography>,
            icon:<CheckCheck />,
        },
        {
            label: <Typography>Payment</Typography>,
            icon:<Landmark />,
        },
    ];

    const stepStyles = {
        boxSizing: "border-box",
      };
  return (
        <Fragment>
            <Stepper alternativeLabel activeStep={activeStep} style={stepStyles}>
            {steps.map((item, index) => (
          <Step
            key={index}
            active={activeStep === index ? true : false}
            completed={activeStep >= index ? true : false}
          >
            <StepLabel
              style={{
                color: activeStep >= index ? "tomato" : "rgba(0, 0, 0, 0.649)",
              }}
              icon={item.icon}
            >
              {item.label}
            </StepLabel>
          </Step>
        ))}
            </Stepper>

        </Fragment>
  )
}

export default CheckoutSteps
