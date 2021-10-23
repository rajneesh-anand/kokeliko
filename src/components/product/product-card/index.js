import PropTypes from "prop-types";
import { useCart } from "@/contexts/cart/use-cart";
import { useRouter } from "next/router";

const ProductCard = ({ data }) => {
  const { addItem, removeItem, getItem, isInCart, items } = useCart();
  const router = useRouter();

  const handleBuyNow = (e) => {
    e.stopPropagation();
    addItem(data);
    router.push("/checkout");
  };
  return (
    <div className="product-card h-100 shadow-sm">
      <img
        src={
          data.image ? data.image : "https://source.unsplash.com/160x160/?food"
        }
        className="card-img-top"
        alt={data.name}
      />

      <div>
        <div className="clearfix mb-3">
          <span className="float-start price-hp">
            &#x20B9;{data.sellingPrice}
          </span>
        </div>
        <h5 className="card-title text-center">{data.name}</h5>
        <div className="text-center">
          <button className="btn btn-warning mb-3" onClick={handleBuyNow}>
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  data: PropTypes.object,
};

export default ProductCard;
