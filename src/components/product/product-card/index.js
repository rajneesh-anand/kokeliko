import PropTypes from "prop-types";
import { useCart } from "../../../contexts/cart/use-cart";
import { Counter } from "../../../components/counter/counter";
import { useRouter } from "next/router";

const ProductCard = ({ data }) => {
  const { addItem, removeItem, getItem, isInCart } = useCart();
  const router = useRouter();
  const handleAddClick = (e) => {
    e.stopPropagation();
    addItem(data);
  };
  const handleRemoveClick = (e) => {
    e.stopPropagation();
    removeItem(data);
  };
  const handleBuyNow = (e) => {
    e.stopPropagation();
    addItem(data);
    router.push("/checkout");
  };
  return (
    <div className="content">
      <img src={data.image} alt={data.name} />
      <p className="name">{data.name}</p>
      <p className="desc">{data.description}</p>
      <h6>${data.price}</h6>
      <div className="buy-now">
        <button className="buy-button" onClick={handleBuyNow}>
          Buy Now
        </button>
        {!isInCart(data.id) ? (
          <button className="buy-button" onClick={handleAddClick}>
            Add to Cart
          </button>
        ) : (
          <Counter
            value={getItem(data.id).quantity}
            onDecrement={handleRemoveClick}
            onIncrement={handleAddClick}
          />
        )}
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  data: PropTypes.object,
};

export default ProductCard;
