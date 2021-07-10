import React from "react";
import { Counter } from "../counter/counter";
import { MdDeleteForever } from "react-icons/md";
import { CURRENCY } from "../../constant/currency";

export const CartItem = ({ data, onDecrement, onIncrement, onRemove }) => {
  const { name, image, price, salePrice, quantity } = data;
  const displayPrice = salePrice ? salePrice : price;

  // const handleRemoveClick = (e) => {
  //   e.stopPropagation();
  //   if (data.minimumQuantity >= data.quantity) {
  //     return;
  //   }
  //   onDecrement;
  // };

  return (
    <div className="cart-item">
      <div style={{ textAlign: "center" }}>
        <img src={image} alt={name} height="72" />
        <Counter
          value={quantity}
          onDecrement={
            data.minimumQuantity >= data.quantity ? null : onDecrement
          }
          onIncrement={onIncrement}
          variant="smallHorizontal"
        />
      </div>

      <div className="product-name">
        <p>{name}</p>
      </div>
      <h6>
        {CURRENCY.INR}
        {(quantity * displayPrice).toFixed(2)}
      </h6>
      <button className="deleteBtn" onClick={onRemove}>
        <MdDeleteForever style={{ height: 26, width: 26, color: "grey" }} />
      </button>
    </div>
  );
};
