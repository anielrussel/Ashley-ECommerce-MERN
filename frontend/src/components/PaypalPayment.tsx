import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux";
import {
  PayPalButtons,
  PayPalButtonsComponentProps,
} from "@paypal/react-paypal-js";

const PaypalPayment: React.FC = () => {
  const cart = useSelector((state: RootState) => state.product.cartItem);

  const createOrder = () => {
    // Order is created on the server and the order id is returned
    return fetch("http://localhost:5000/my-server/create-paypal-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // use the "body" param to optionally pass additional order information
      // like product skus and quantities
      body: JSON.stringify({
        cart: cart.map((item: any) => ({
          name: item.name,
          price: item.price,
        })),
      }),
    })
      .then((response) => response.json())
      .then((order) => order.id);
  };

  const onApprove = (data: any) => {
    // Order is captured on the server and the response is returned to the browser
    return fetch("/my-server/capture-paypal-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        orderID: data.orderID,
      }),
    }).then((response) => response.json());
  };

  const buttonProps: PayPalButtonsComponentProps = {
    createOrder,
    onApprove,
  };

  return <PayPalButtons {...buttonProps} />;
};

export default PaypalPayment;
