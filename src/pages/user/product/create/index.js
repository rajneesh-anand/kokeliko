import React, { useState, useEffect, useRef, useCallback } from "react";
import { slugify } from "@/utils/index";
import SEO from "@/components/seo";
import Footer from "@/layout/footer";
import Header from "@/layout/header";
import Layout from "@/layout/index";
import { useSession, getSession } from "next-auth/client";
import { productCategoryOptions } from "@/constant/product";
import { ToastContainer, toast } from "react-toastify";
import { useForm } from "react-hook-form";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import dynamic from "next/dynamic";

const Multiselect = dynamic(
  () =>
    import("multiselect-react-dropdown").then((module) => module.Multiselect),
  {
    ssr: false,
  }
);

const ProductPage = () => {
  const [session, loading] = useSession();
  const editorRef = useRef();
  const { CKEditor, ClassicEditor } = editorRef.current || {};
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [message, setMessage] = useState();
  const [usage, setUsage] = useState("");
  const [productImage, setProductImage] = useState();
  const [category, setCategory] = useState([]);
  const [isProcessing, setProcessingTo] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });

  const catSelectedValues = ["Automotive"];

  const onCatSelect = (event) => {
    setCategory(event);
  };

  const onCatRemove = (event) => {
    setCategory(event);
  };

  useEffect(() => {
    editorRef.current = {
      CKEditor: require("@ckeditor/ckeditor5-react").CKEditor,
      ClassicEditor: require("@ckeditor/ckeditor5-build-classic"),
    };
    setEditorLoaded(true);
    if (message === "success") {
      toast.success("Product Uploaded !");
    }
    if (message === "failed") {
      toast.error("Oops something went wrong !");
    }
  }, [message]);

  const onSubmit = async (data) => {
    if (!productImage) {
      return;
    }
    setProcessingTo(true);
    const formData = new FormData();
    formData.append("image", productImage);
    formData.append("product_name", data.product_name);
    formData.append("description", data.product_desc);
    formData.append("size", data.size);
    formData.append("weight", data.weight);
    formData.append("price", data.price);
    formData.append("sale_price", data.sale_price);
    formData.append(
      "discount",
      ((data.price - data.sale_price) / data.price) * 100
    );
    formData.append(
      "category",
      category.length === 0
        ? JSON.stringify(catSelectedValues)
        : JSON.stringify(category)
    );
    formData.append("stock", data.stock === "No" ? false : true);
    formData.append("usage", usage);
    formData.append("slug", slugify(data.product_name));

    try {
      const result = await fetch(`${process.env.API_URL}/product`, {
        method: "POST",
        body: formData,
      });

      if (result.status >= 400 && result.status < 600) {
        console.log(result.status);
        throw new Error("Bad response from server");
      } else {
        setProcessingTo(false);
        setMessage("success");
        setProductImage(null);
      }
    } catch (error) {
      console.log(error);
      setProcessingTo(false);
      setMessage("failed");
    }
  };

  return (
    <Layout>
      <SEO
        title="New Product"
        canonical={`${process.env.PUBLIC_URL}/user/product/create`}
      />
      <div className="wrapper">
        <Header />
        <div className="user-account-area">
          <div className="container">
            {message && (
              <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
              />
            )}

            <div className="newblog-form">
              <Form>
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm="2">
                    Product Image
                  </Form.Label>
                  <Col sm="10">
                    <Form.Control
                      type="file"
                      accept=".jpg, .png, .jpeg"
                      onChange={(event) => {
                        setProductImage(event.target.files[0]);
                      }}
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm="2">
                    Product Name *
                  </Form.Label>
                  <Col sm="10">
                    <Form.Control
                      type="text"
                      placeholder=" Product Name"
                      {...register("product_name", {
                        required: " Product Name is required ! ",
                      })}
                    />
                    {errors.product_name && (
                      <Form.Label style={{ color: "red" }}>
                        {errors.product_name.message}
                      </Form.Label>
                    )}
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm="2">
                    Product Description *
                  </Form.Label>
                  <Col sm="10">
                    <Form.Control
                      type="text"
                      placeholder=" Product Description"
                      {...register("product_desc", {
                        required: " Product Description is required ! ",
                      })}
                    />
                    {errors.product_desc && (
                      <Form.Label style={{ color: "red" }}>
                        {errors.product_desc.message}
                      </Form.Label>
                    )}
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm="2">
                    Size ( L X B X H)
                  </Form.Label>
                  <Col sm="4">
                    <Form.Control
                      type="text"
                      placeholder=" Product Size"
                      {...register("size")}
                    />
                  </Col>
                  <Form.Label column sm="2">
                    Weight ( in grams )
                  </Form.Label>
                  <Col sm="4">
                    <Form.Control
                      type="text"
                      placeholder=" Product Weight (grams)"
                      {...register("weight", {
                        pattern: {
                          value: /^([\d]{0,6})(\.[\d]{1,2})?$/,
                          message: "Accept only decimal numbers",
                        },
                      })}
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm="2">
                    M.R.P
                  </Form.Label>
                  <Col sm="4">
                    <Form.Control
                      type="text"
                      placeholder="Maximum Retail Price"
                      {...register("price", {
                        required: "MRP is required !",
                        pattern: {
                          value: /^([\d]{0,6})(\.[\d]{1,2})?$/,
                          message: "Accept only decimal numbers",
                        },
                      })}
                    />
                    {errors.price && (
                      <Form.Label style={{ color: "red" }}>
                        {errors.price.message}
                      </Form.Label>
                    )}
                  </Col>
                  <Form.Label column sm="2">
                    Sale Price
                  </Form.Label>
                  <Col sm="4">
                    <Form.Control
                      type="text"
                      placeholder=" Sale Price"
                      {...register("sale_price", {
                        pattern: {
                          value: /^([\d]{0,6})(\.[\d]{1,2})?$/,
                          message: "Accept only decimal numbers",
                        },
                      })}
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm="2">
                    Stock Available
                  </Form.Label>
                  <Col sm="4">
                    <Form.Select className="me-sm-2" {...register("stock")}>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </Form.Select>
                  </Col>
                  <Form.Label column sm="2">
                    Product Category
                  </Form.Label>
                  <Col sm="4">
                    <Multiselect
                      options={productCategoryOptions}
                      selectedValues={catSelectedValues}
                      onSelect={onCatSelect}
                      onRemove={onCatRemove}
                      placeholder="+ Add Category"
                      id="catOption"
                      isObject={false}
                      className="catDrowpdown"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm="2">
                    Product Usage
                  </Form.Label>
                  <Col sm="10">
                    {editorLoaded ? (
                      <CKEditor
                        editor={ClassicEditor}
                        data={usage}
                        onReady={(editor) => {
                          console.log("Editor is ready to use!", editor);
                        }}
                        config={{ height: 400 }}
                        onChange={(event, editor) => {
                          editor.editing.view.change((writer) => {
                            writer.setStyle(
                              "height",
                              "320px",
                              editor.editing.view.document.getRoot()
                            );
                          });
                          const data = editor.getData();
                          setUsage(data);
                        }}
                      />
                    ) : (
                      <p>editor..</p>
                    )}
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3 text-center ">
                  <Col sm={{ span: 10, offset: 2 }}>
                    <Button
                      variant="primary"
                      onClick={handleSubmit(onSubmit)}
                      style={{ marginRight: 8 }}
                    >
                      {isProcessing ? "Saving ..." : `Save`}
                    </Button>
                  </Col>
                </Form.Group>
              </Form>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </Layout>
  );
};

export default ProductPage;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
