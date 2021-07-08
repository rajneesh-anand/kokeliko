import React from "react";
import { Counter } from "../counter/counter";

export const CartItem = ({ data, onDecrement, onIncrement, onRemove }) => {
  const { name, image, price, salePrice, unit, quantity } = data;
  const displayPrice = salePrice ? salePrice : price;
  return (
    <div className="cart-item">
      <img src={image} alt={name} />
      <div className="product-name">
        <p>{name}</p>
        <Counter
          value={quantity}
          onDecrement={onDecrement}
          onIncrement={onIncrement}
        />
      </div>
      <h6>{(quantity * displayPrice).toFixed(2)}</h6>
      <button className="deleteBtn" onClick={onRemove}>
        X
      </button>
    </div>
  );
};
