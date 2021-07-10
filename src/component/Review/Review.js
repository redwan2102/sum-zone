import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import fakeData from "../../fakeData";
import {
  getDatabaseCart,
  processOrder,
  removeFromDatabaseCart,
} from "../../utilities/databaseManager";
import Cart from "../Cart/Cart";
import ReviewItem from "../ReviewItem/ReviewItem";

const Review = () => {
  const [cart, setCart] = useState([]);
  const [orderplaced, setOrderplaced] = useState(false);
  const history = useHistory();

  const handleProceedCheckout = () => {
    history.push("./shipment");
  };

  const handleRemoveProduct = (productKey) => {
    const newCart = cart.filter((pd) => pd.key !== productKey);
    setCart(newCart);
    removeFromDatabaseCart(productKey);
  };
  useEffect(() => {
    //cart
    const saveCart = getDatabaseCart();
    const productKeys = Object.keys(saveCart);

    const cartProducts = productKeys.map((key) => {
      const product = fakeData.find((pd) => pd.key === key);
      product.quantity = saveCart[key];
      return product;
    });
    setCart(cartProducts);
  }, []);
  return (
    <div className="twin-container">
      <div className="product-container">
        {cart.map((pd) => (
          <ReviewItem
            key={pd.key}
            handleRemoveProduct={handleRemoveProduct}
            product={pd}
          ></ReviewItem>
        ))}
      </div>
      <div className="cart-container">
        <Cart cart={cart}>
          <button onClick={handleProceedCheckout} className="cart-button">
            Proceed checkout
          </button>
        </Cart>
      </div>
    </div>
  );
};

export default Review;
