import PropTypes from "prop-types";
import Link from "next/link";

const ProductCard = ({ data }) => {
  return (
    <div className="content">
      <img src={data.image} />
      <p className="name">{data.name}</p>
      <p className="desc">{data.description}</p>
      <h6>${data.price}</h6>
      <div className="buy-now">
        <Link href={`/checkout/${data.id}`}>
          <a>Buy Now</a>
        </Link>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  data: PropTypes.object,
};

export default ProductCard;
