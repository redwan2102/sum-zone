import React, { useState } from "react";
import fakeData from "../../fakeData";
import "./Shop.css";
import Products from "../Products/Products";
import Cart from "../Cart/Cart";

const Shop = () => {
  const first10 = fakeData.slice(0, 10);
  const [products, setProducts] = useState(first10);
  const [cart, setCart] = useState([]);

  const handleAddProduct = (products) => {
    const newCart = [...cart, products];
    setCart(newCart);
  };

  return (
    <div className="shop-container">
      <div className="product-container">
        <h1>This is product-part.</h1>
        {products.map((pd) => (
          <Products
            handleAddProduct={handleAddProduct}
            products={pd}
          ></Products>
        ))}
      </div>
      <div className="cart-container">
        <Cart cart={cart}></Cart>
      </div>
    </div>
  );
};

export default Shop;
