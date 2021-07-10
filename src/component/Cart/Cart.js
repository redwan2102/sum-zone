import React from "react";

const Cart = (props) => {
  const cart = props.cart;
  //console.log(cart);

  //const total = cart.reduce((total, prd) => total + prd.price, 0);
  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    const product = cart[i];
    total = total + product.price * product.quantity;
  }
  let shipping = 0;
  if (total > 35) {
    shipping = 0;
  } else if (total > 15) {
    shipping = 4.99;
  } else if (total > 0) {
    shipping = 14.99;
  }

  const tax = (total / 10).toFixed(2);
  const finalTotal = (total + shipping + Number(tax)).toFixed(2);
  const formatNumber = (num) => {
    const precision = num.toFixed(2);
    return Number(precision);
  };

  return (
    <div>
      <h2 className="text-danger"> Order Summary </h2>
      <p>Items Ordered : {cart.length}</p>
      <p>Product Price : {formatNumber(total)}</p>
      <p>
        <small>Shipping Cost : {shipping}</small>
      </p>
      <p>
        <small>Tax + VAT : {tax}</small>
      </p>
      <h3 className="text-danger">Total Price : {finalTotal} </h3>
      <br />
      {props.children}
    </div>
  );
};

export default Cart;
