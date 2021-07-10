import React, { useEffect, useState } from "react";
import fakeData from "../../fakeData";
import "./Shop.css";
import Products from "../Products/Products";
import Cart from "../Cart/Cart";
import {
  addToDatabaseCart,
  getDatabaseCart,
} from "../../utilities/databaseManager";
import { Link } from "react-router-dom";

const Shop = () => {
  const first10 = fakeData.slice(0, 10);
  const [products, setProducts] = useState(first10);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const saveCart = getDatabaseCart();
    const productKeys = Object.keys(saveCart);
    const previousCart = productKeys.map((existingkey) => {
      const product = fakeData.find((pd) => pd.key === existingkey);
      product.quantity = saveCart[existingkey];
      return product;
    });
    setCart(previousCart);
  }, []);

  const handleAddProduct = (products) => {
    const productToBeAdded = products.key;
    const sameProduct = cart.find((pd) => pd.key === productToBeAdded);
    let count = 1;
    let newCart;
    if (sameProduct) {
      count = sameProduct.quantity + 1;
      sameProduct.quantity = count;
      const others = cart.filter((pd) => pd.key !== productToBeAdded);
      newCart = [...others, sameProduct];
    } else {
      products.quantity = 1;
      newCart = [...cart, products];
    }

    setCart(newCart);

    addToDatabaseCart(products.key, count);
  };

  return (
    <div className="twin-container">
      <div className="product-container">
        <h1>This is product-part.</h1>
        {products.map((pd) => (
          <Products
            key={pd.key}
            showAddToCart={true}
            handleAddProduct={handleAddProduct}
            products={pd}
          ></Products>
        ))}
      </div>
      <div className="cart-container">
        <Cart cart={cart}>
          <Link to="/review">
            <button className="cart-button">Review Order</button>
          </Link>
        </Cart>
      </div>
    </div>
  );
};

export default Shop;
