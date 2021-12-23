import React, { useState, useEffect, useRef, useCallback } from "react";
import { slugify } from "@/utils/index";
import SEO from "@/components/seo";
import Footer from "@/layout/footer";
import Header from "@/layout/header";
import Layout from "@/layout/index";
import { useSession, getSession } from "next-auth/client";
import dynamic from "next/dynamic";
import { blogTagsOptions, blogCategoryOptions } from "@/constant/blogs";
import { ToastContainer, toast } from "react-toastify";
import { useForm } from "react-hook-form";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Multiselect = dynamic(
  () =>
    import("multiselect-react-dropdown").then((module) => module.Multiselect),
  {
    ssr: false,
  }
);

const NewpostPage = () => {
  const [session, loading] = useSession();
  const editorRef = useRef();
  const { CKEditor, ClassicEditor } = editorRef.current || {};
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [message, setMessage] = useState();
  const [blogContent, setBlogContent] = useState("");
  const [thumbImage, setThumbImage] = useState();
  const [tags, setTags] = useState([]);
  const [subCat, setSubCat] = useState([]);
  const [isPublishing, setPublishing] = useState(false);
  const [isDrafting, setDrafting] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });

  const tagSelectedValues = ["Yoga"];
  const catSelectedValues = ["Yoga"];

  const onTagSelect = (event) => {
    setTags(event);
  };
  const onCatSelect = (event) => {
    setSubCat(event);
  };

  const onTagRemove = (event) => {
    setTags(event);
  };
  const onCatRemove = (event) => {
    setSubCat(event);
  };

  useEffect(() => {
    editorRef.current = {
      CKEditor: require("@ckeditor/ckeditor5-react").CKEditor,
      ClassicEditor: require("@ckeditor/ckeditor5-build-classic"),
    };
    setEditorLoaded(true);
    if (message === "success") {
      toast.success("Blog published successfully !");
    }
    if (message === "failed") {
      toast.error("Oops something went wrong !");
    }
  }, [message]);

  const onPublish = async (data) => {
    setPublishing(true);
    setMessage("");
    const formData = new FormData();
    formData.append("image", thumbImage);
    formData.append("title", data.blog_title);
    formData.append("category", data.blog_category);
    formData.append(
      "subCategories",
      subCat.length === 0
        ? JSON.stringify(catSelectedValues)
        : JSON.stringify(subCat)
    );
    formData.append(
      "tags",
      tags.length === 0
        ? JSON.stringify(tagSelectedValues)
        : JSON.stringify(tags)
    );
    formData.append("content", blogContent);
    formData.append("template", data.blog_template);
    formData.append("slug", slugify(data.blog_title));
    formData.append("readingTime", data.reading_time);
    formData.append("published", true);
    formData.append("author", session?.user?.email);

    try {
      const result = await fetch(`${process.env.API_URL}/blog`, {
        method: "POST",
        body: formData,
      });

      if (result.status >= 400 && result.status < 600) {
        throw new Error("Bad response from server");
      } else {
        setPublishing(false);
        setMessage("success");
        setThumbImage(null);
        setBlogContent("");
        reset("", {
          keepValues: false,
        });
      }
    } catch (error) {
      setPublishing(false);
      setMessage("failed");
    }
  };

  const onDraft = async (data) => {
    setDrafting(true);
    setMessage("");
    const formData = new FormData();
    formData.append("image", thumbImage);
    formData.append("title", data.blog_title);
    formData.append("category", data.blog_category);
    formData.append(
      "subCategories",
      subCat.length === 0
        ? JSON.stringify(catSelectedValues)
        : JSON.stringify(subCat)
    );
    formData.append(
      "tags",
      tags.length === 0
        ? JSON.stringify(tagSelectedValues)
        : JSON.stringify(tags)
    );
    formData.append("content", blogContent);
    formData.append("template", data.blog_template);
    formData.append("slug", slugify(data.blog_title));
    formData.append("readingTime", data.reading_time);
    formData.append("published", false);
    formData.append("author", session?.user?.email);

    try {
      const result = await fetch(`${process.env.API_URL}/blog`, {
        method: "POST",
        body: formData,
      });

      if (result.status >= 400 && result.status < 600) {
        throw new Error("Bad response from server");
      } else {
        setDrafting(false);
        setMessage("success");
        setThumbImage(null);
        setBlogContent("");
        reset("", {
          keepValues: false,
        });
      }
    } catch (error) {
      setDrafting(false);
      setMessage("failed");
    }
  };

  return (
    <Layout>
      <SEO
        title="New Blog | KokeLiko "
        description="Post your Blog"
        canonical={`${process.env.PUBLIC_URL}/user/post/create`}
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
                    Blog Thumbnail Image
                  </Form.Label>
                  <Col sm="10">
                    <Form.Control
                      type="file"
                      accept=".jpg, .png, .jpeg"
                      onChange={(event) => {
                        setThumbImage(event.target.files[0]);
                      }}
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm="2">
                    Blog Title *
                  </Form.Label>
                  <Col sm="10">
                    <Form.Control
                      type="text"
                      placeholder=" Blog Title "
                      {...register("blog_title", {
                        required: " Blog title is required ! ",
                      })}
                    />
                    {errors.blog_title && (
                      <Form.Label style={{ color: "red" }}>
                        {errors.blog_title.message}
                      </Form.Label>
                    )}
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm="2">
                    Blog Category
                  </Form.Label>
                  <Col sm="10">
                    <Form.Select
                      className="me-sm-2"
                      {...register("blog_category")}
                    >
                      {blogCategoryOptions.map((option, index) => (
                        <option key={index} value={option}>
                          {option}
                        </option>
                      ))}
                    </Form.Select>
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm="2">
                    Blog Sub-Categories
                  </Form.Label>
                  <Col sm="10">
                    <Multiselect
                      options={blogCategoryOptions}
                      selectedValues={catSelectedValues}
                      onSelect={onCatSelect}
                      onRemove={onCatRemove}
                      placeholder="+ Add Sub Categories"
                      id="catOption"
                      isObject={false}
                      className="catDrowpdown"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm="2">
                    Blog Tags
                  </Form.Label>
                  <Col sm="10">
                    <Multiselect
                      options={blogTagsOptions}
                      selectedValues={tagSelectedValues}
                      onSelect={onTagSelect}
                      onRemove={onTagRemove}
                      placeholder="+ Add Tags"
                      id="tagOption"
                      isObject={false}
                      className="tagDrowpdown"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm="2">
                    Blog Template
                  </Form.Label>
                  <Col sm="4">
                    <Form.Select
                      className="me-sm-2"
                      {...register("blog_template")}
                    >
                      <option value="blogpost_with_thumbImage">
                        Blog with Thumb Image
                      </option>
                      <option value="blogpost_without_thumbImage">
                        Blog without Thumb Image
                      </option>
                    </Form.Select>
                  </Col>
                  <Form.Label column sm="2">
                    Reading Time
                  </Form.Label>
                  <Col sm="4">
                    <Form.Control
                      type="text"
                      placeholder="5 Min"
                      {...register("reading_time")}
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm="2">
                    Blog Content *
                  </Form.Label>
                  <Col sm="10">
                    {editorLoaded ? (
                      <CKEditor
                        editor={ClassicEditor}
                        data={blogContent}
                        config={{
                          link: {
                            decorators: {
                              addTargetToExternalLinks: {
                                mode: "automatic",
                                callback: (url) => /^(https?:)?\/\//.test(url),
                                attributes: {
                                  target: "_blank",
                                  rel: "noopener noreferrer",
                                },
                              },
                            },
                          },
                        }}
                        onReady={(editor) => {
                          editor.editing.view.change((writer) => {
                            writer.setStyle(
                              "height",
                              "172px",
                              editor.editing.view.document.getRoot()
                            );
                          });
                        }}
                        onChange={(event, editor) => {
                          const data = editor.getData();
                          setBlogContent(data);
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
                      onClick={handleSubmit(onPublish)}
                      style={{ marginRight: 8 }}
                    >
                      {isPublishing ? "Publishing ..." : `Publish`}
                    </Button>

                    <Button variant="primary" onClick={handleSubmit(onDraft)}>
                      {isDrafting ? "Drafting ..." : `Draft`}
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

export default NewpostPage;

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
