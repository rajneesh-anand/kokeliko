import PropTypes from "prop-types";
import { useCart } from "@/contexts/cart/use-cart";
import { useRouter } from "next/router";
import Image from "next/image";

const ProductCard = ({ data }) => {
  const { addItem, removeItem, getItem, isInCart, items } = useCart();
  const router = useRouter();

  const handleBuyNow = (e) => {
    e.stopPropagation();
    addItem(data);
    router.push("/checkout");
  };
  return (
    <div className="product-card">
      <div className="image">
        <Image
          src={
            data.image
              ? "https://source.unsplash.com/160x160/?food"
              : "https://source.unsplash.com/160x160/?food"
          }
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="product-name text-center">
        <h3>{data.name}</h3>
      </div>

      <div>
        <h6>&#x20B9;{data.price}</h6>
      </div>

      <div className="text-center">
        <button className="btn btn-warning mb-3" onClick={handleBuyNow}>
          Buy Now
        </button>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  data: PropTypes.object,
};

export default ProductCard;
