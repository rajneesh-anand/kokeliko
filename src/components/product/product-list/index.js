import React, { useState, useEffect } from "react";
import useMasonry from "@/utils/useMasonry";
import DataFilter from "@/components/data-filter";
import { slugify } from "@/utils/index";
import ProductCard from "@/components/product/product-card";

const ProductList = ({ data }) => {
  const { categories } = useMasonry(
    data,
    ".portfolio-list",
    ".masonry-grid",
    ".messonry-button",
    ".messonry-button button"
  );

  return (
    <>
      <div className="products-area pb-50 ">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="messonry-button text-center mb-8">
                <DataFilter categories={categories} />
              </div>
            </div>
          </div>

          <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 portfolio-list mb-n30">
            {data &&
              data.map((item) => (
                <div
                  key={item.id}
                  className={`col masonry-grid mb-30 ${item.category
                    .split(",")
                    .map((cat) => slugify(cat))
                    .join(" ")}`}
                >
                  <ProductCard data={item} />
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductList;
