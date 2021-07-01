import React, { useEffect, useState } from "react";
// import BlogFilter from "../../../components/blog/blog-filter";
import ProductCard from "../../../components/product/product-card";
// import BlogData from "../../../data/blog.json";
// import useMasonry from "../../../hooks/use-masonry";
// import { slugify } from "../../../utils";

const ShopContainer = () => {
  const [ShopData, setShopData] = useState([]);
  const [loading, setLoading] = useState(true);

  // "https://nodappserver.herokuapp.com/api/upload"
  // http://localhost:8080

  useEffect(async () => {
    const res = await fetch("https://nodappserver.herokuapp.com/api/product");
    const data = await res.json();
    console.log(data);

    if (data.msg === "success") {
      setLoading(false);
      setShopData(data.result);
    }
  }, []);

  return loading ? (
    <div className="hv-center">
      <div className="spinner-border text-primary" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  ) : (
    <>
      <div className="row gallery">
        {ShopData &&
          ShopData.map((product) => (
            <ProductCard key={product.id} data={product} />
          ))}
      </div>
    </>
  );
};

export default ShopContainer;
