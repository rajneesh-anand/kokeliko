import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import slugify from "slugify";
import SEO from "components/seo";
import Footer from "@/layout/footer";
import Header from "@/layout/header";
import Layout from "@/layout/";
import { useSession, getSession } from "next-auth/client";
import dynamic from "next/dynamic";
import { blogTagsOptions, blogCategoryOptions } from "constant/blogs";
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

const EditPostPage = ({ post }) => {
  const postData = JSON.parse(post);
  console.log(postData);
  const [session, loading] = useSession();
  const editorRef = useRef();
  const { CKEditor, ClassicEditor } = editorRef.current || {};
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [message, setMessage] = useState();
  const [blogContent, setBlogContent] = useState(postData.content);
  const [thumbImage, setThumbImage] = useState();
  const [tags, setTags] = useState([]);
  const [subCat, setSubCat] = useState([]);
  const [isProcessing, setProcessingTo] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });

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
      toast.success("Blog post updated !");
    }
    if (message === "failed") {
      toast.error("Oops something went wrong !");
    }
  }, [message]);

  const onUpdate = async (data) => {
    setProcessingTo(true);
    setMessage("");
    const formData = new FormData();
    formData.append("image", thumbImage);
    formData.append("title", data.blog_title);
    formData.append("category", data.blog_category);
    formData.append("subCategories", JSON.stringify(subCat));
    formData.append("tags", JSON.stringify(tags));
    formData.append("content", blogContent);
    formData.append("template", data.blog_template);
    formData.append(
      "slug",
      slugify(data.blog_title, {
        remove: /[*+~.()'"!:@,]/g,
        lower: true,
      })
    );
    formData.append("published", true);
    formData.append("author", session?.user?.email);

    try {
      const result = await fetch(
        `${process.env.API_URL}/publish/${postData.id}`,
        {
          method: "POST",
          body: formData,
        }
      );
      console.log(result.status);
      if (result.status >= 400 && result.status < 600) {
        throw new Error("Bad response from server");
      } else {
        setProcessingTo(false);
        setMessage("success");
        setThumbImage(null);
      }
    } catch (error) {
      setProcessingTo(false);
      setMessage("failed");
    }
  };

  return (
    <Layout>
      <SEO
        title="Edit Blog | KokeLiko "
        canonical={process.env.PUBLIC_URL + "/user/newpost"}
      />
      <div className="wrapper">
        <Header />
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

          <Form>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="2">
                Blog Post Thumb Image
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
                Blog Post Title
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="text"
                  defaultValue={postData.title}
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
                Blog Post Category
              </Form.Label>
              <Col sm="10">
                <Form.Select
                  className="me-sm-2"
                  defaultValue={postData.category}
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
                Blog Sub Categories
              </Form.Label>
              <Col sm="10">
                <Multiselect
                  options={blogCategoryOptions}
                  selectedValues={postData.subCategories}
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
                  selectedValues={postData.tags}
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
              <Col sm="10">
                <Form.Select
                  className="me-sm-2"
                  defaultValue={postData.template}
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
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="2">
                Blog Post Content
              </Form.Label>
              <Col sm="10">
                {editorLoaded ? (
                  <CKEditor
                    editor={ClassicEditor}
                    data={blogContent}
                    onReady={(editor) => {
                      console.log("Editor is ready to use!", editor);
                    }}
                    config={{ height: 400 }}
                    onChange={(event, editor) => {
                      editor.editing.view.change((writer) => {
                        writer.setStyle(
                          "height",
                          "500px",
                          editor.editing.view.document.getRoot()
                        );
                      });
                      const data = editor.getData();
                      setBlogContent(data);
                    }}
                  />
                ) : (
                  <p>editor..</p>
                )}
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Col sm={{ span: 10, offset: 2 }}>
                <Button variant="primary" onClick={handleSubmit(onUpdate)}>
                  {isProcessing ? "Updating ..." : `Update`}
                </Button>
              </Col>
            </Form.Group>
          </Form>
        </div>
        <Footer />
      </div>
    </Layout>
  );
};

export default EditPostPage;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const postId = context.params.id;

  if (!session) {
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false,
      },
    };
  }

  try {
    const post = await prisma.post.findFirst({
      where: {
        id: Number(postId),
      },
    });

    return {
      props: { post: JSON.stringify(post) },
    };
  } catch {
    res.statusCode = 404;
  } finally {
    async () => {
      await prisma.$disconnect();
    };
  }
}
