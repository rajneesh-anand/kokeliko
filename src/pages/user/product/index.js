import React, { useState } from "react";
import SEO from "../../../components/seo";
import Footer from "../../../layouts/footer";
import Header from "../../../layouts/header";
import Layout from "../../../layouts";
import { useSession } from "next-auth/client";
import Link from "next/link";

import { useForm } from "react-hook-form";

const Product = () => {
  const [selectedImage, setSelectedImage] = useState();
  const [message, setMessage] = useState();
  const [error, setError] = useState();
  const [session, loading] = useSession();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });

  const handleChange = (event) => {
    setSelectedImage(event.target.files[0]);
    setMessage(null);
    setError(null);
  };

  const onSubmit = async (data, e) => {
    if (!selectedImage) {
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedImage);
    formData.append("product_name", data.product);
    formData.append("selling_price", data.sprice);
    formData.append("discount", data.discount);
    formData.append("description", data.productdesc);

    try {
      const result = await fetch(
        "https://nodappserver.herokuapp.com/api/product",
        {
          method: "POST",
          body: formData,
        }
      );
      const resultJson = await result.json();

      if (resultJson.msg === "success") {
        setMessage("Product uploaded successfully");
        setSelectedImage(null);
        e.target.reset();
      }
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };

  if (!loading && !session) {
    return (
      <React.Fragment>
        <Layout>
          <SEO
            title="Product | Victoria Studio "
            canonical={process.env.PUBLIC_URL + "/user/product"}
          />
          <div className="wrapper home-default-wrapper">
            <Header />

            <div className="main-content">
              <div className="text-center-black">
                <p>Please Sign In to upload product </p>
                <Link href="/auth/signin">
                  <a>Sign In</a>
                </Link>
              </div>
            </div>
            <Footer />
          </div>
        </Layout>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <Layout>
        <SEO
          title="Product | Victoria Studio "
          canonical={process.env.PUBLIC_URL + "/user/product"}
        />
        <div className="wrapper home-default-wrapper">
          <Header />

          <div className="main-content">
            <div className="container">
              <form
                method="POST"
                onSubmit={handleSubmit(onSubmit)}
                className="product-form"
              >
                <div className="row">
                  <div className="col-sm-6 col-md-6 col-lg-4">
                    <div className="text-center-black">
                      <p>SELECT PRODUCT IMAGE</p>
                    </div>
                    <div className="img-style">
                      <img
                        src={
                          selectedImage
                            ? URL.createObjectURL(selectedImage)
                            : null
                        }
                        alt={selectedImage ? selectedImage.name : null}
                        width={250}
                        height={280}
                      />
                      <div style={{ marginTop: 10 }}>
                        <input
                          accept=".jpg, .png, .jpeg"
                          onChange={handleChange}
                          type="file"
                        />
                      </div>
                    </div>
                    <div>
                      {message && (
                        <div>
                          <p style={{ color: "green" }}>{message}</p>
                          <Link href="/user/productlist">
                            <a style={{ border: "solid 1px teal", padding: 6 }}>
                              Goto Products List
                            </a>
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col-sm-6 col-md-6 col-lg-8">
                    <div className="form-group">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Produc Name"
                        {...register("product", {
                          required: "Product Name is required",
                        })}
                      />
                      {errors.product && <p>{errors.product.message}</p>}
                    </div>
                    <div className="form-group">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Produc Description"
                        {...register("productdesc", {
                          required: "Product Description is required",
                        })}
                      />
                      {errors.productdesc && (
                        <p>{errors.productdesc.message}</p>
                      )}
                    </div>
                    <div className="row">
                      <div className="col-6">
                        <div className="form-group">
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Selling Price"
                            {...register("sprice", {
                              required: "Selling Price is required",
                            })}
                          />
                          {errors.sprice && <p>{errors.sprice.message}</p>}
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="form-group">
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Discount Amount"
                            {...register("discount", {
                              required: "Discount Amount is required",
                            })}
                          />
                          {errors.discount && <p>{errors.discount.message}</p>}
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-6">
                        <div className="form-group">
                          <select
                            {...register("stock")}
                            className="form-select"
                            aria-label="Default select example"
                            defaultValue="Stock Available"
                          >
                            <option value="Stock Available">
                              Stock Available
                            </option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="text-center">
                      <button className="blue-button" type="submit">
                        Upload Product
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>

          <Footer />
        </div>
      </Layout>
    </React.Fragment>
  );
};

export default Product;
