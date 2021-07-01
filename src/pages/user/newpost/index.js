import React, { useState, useEffect } from "react";
import Link from "next/link";
import slugify from "slugify";
import SEO from "../../../components/seo";
import Footer from "../../../layouts/footer";
import Header from "../../../layouts/header";
import Layout from "../../../layouts";
import ScrollToTop from "../../../components/scroll-to-top";
import { useSession } from "next-auth/client";
import dynamic from "next/dynamic";
import SunEditor, { buttonList } from "suneditor-react";
import { blogTagsOptions } from "../../../constant/blogs";
import { blogCategoryOptions } from "../../../constant/blogs";
// const SunEditor = dynamic(() => import("suneditor-react"), {
//   ssr: false,
// });

const Multiselect = dynamic(
  () =>
    import("multiselect-react-dropdown").then((module) => module.Multiselect),
  {
    ssr: false,
  }
);

const Newpost = () => {
  const [selectedImage, setSelectedImage] = useState();
  const [html, setHtml] = useState("");
  const [message, setMessage] = useState("");
  const [session, loading] = useSession();
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isProcessing, setProcessingTo] = useState(false);
  const [isDrafting, setDraftingTo] = useState(false);
  const [template, setTemplate] = useState("template_with_headerimage");

  const tagSelectedValues = ["Nature", "People"];
  const catSelectedValues = ["New Added", "People"];

  const onTagSelect = (event) => {
    setTags(event);
  };
  const onCatSelect = (event) => {
    setCategories(event);
  };

  const onTagRemove = (event) => {
    setTags(event);
  };
  const onCatRemove = (event) => {
    setCategories(event);
  };

  const handleEditorChange = (content) => {
    setHtml(content);
  };

  const handleChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  const draftPost = async (e) => {
    e.preventDefault();

    if (title === "" || html === "") {
      return;
    }
    setDraftingTo(true);

    try {
      const formData = new FormData();
      formData.append("image", selectedImage);
      formData.append("title", title);
      formData.append(
        "categories",
        categories.length === 0
          ? JSON.stringify(catSelectedValues)
          : JSON.stringify(categories)
      );
      formData.append(
        "tags",
        tags.length === 0
          ? JSON.stringify(tagSelectedValues)
          : JSON.stringify(tags)
      );
      formData.append("content", html);
      formData.append("template", template);
      formData.append(
        "slug",
        slugify(title, {
          remove: /[*+~.()'"!:@,]/g,
          lower: true,
        })
      );
      formData.append("published", false);
      formData.append("author", session?.user?.email);

      const result = await fetch(
        "https://nodappserver.herokuapp.com/api/publish",
        {
          method: "POST",
          body: formData,
        }
      );
      const resultJson = await result.json();
      // console.log(resultJson);
      if (resultJson.msg === "success") {
        setDraftingTo(false);
        setMessage("Your Blog is drafted successfully");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const publishPost = async (e) => {
    e.preventDefault();
    if (title === "" || html === "") {
      return;
    }
    setProcessingTo(true);

    try {
      const formData = new FormData();
      formData.append("image", selectedImage);
      formData.append("title", title);
      formData.append(
        "categories",
        categories.length === 0
          ? JSON.stringify(catSelectedValues)
          : JSON.stringify(categories)
      );
      formData.append(
        "tags",
        tags.length === 0
          ? JSON.stringify(tagSelectedValues)
          : JSON.stringify(tags)
      );
      formData.append("content", html);
      formData.append("template", template);
      formData.append(
        "slug",
        slugify(title, {
          remove: /[*+~.()'"!:@,]/g,
          lower: true,
        })
      );
      formData.append("published", true);
      formData.append("author", session?.user?.email);

      const result = await fetch(
        "https://nodappserver.herokuapp.com/api/publish",
        {
          method: "POST",
          body: formData,
        }
      );
      const resultJson = await result.json();
      // console.log(resultJson);
      if (resultJson.msg === "success") {
        setProcessingTo(false);
        setMessage("Your Blog is published successfully");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return loading ? (
    <div className="hv-center">
      <div className="spinner-border text-primary" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  ) : !session ? (
    <React.Fragment>
      <Layout>
        <SEO
          title="New Blog | Victoria Studio "
          canonical={process.env.PUBLIC_URL + "/user/newpost"}
        />
        <div className="wrapper home-default-wrapper">
          <Header classOption="hb-border" />
          <div className="main-content">
            <div className="hv-center">
              <div className="text-center-black">
                <p>Please Sign In to Post Your Blogs </p>
                <Link href="/auth/signin">
                  <a>Sign In</a>
                </Link>
              </div>
            </div>
          </div>
          <Footer />
          <ScrollToTop />
        </div>
      </Layout>
    </React.Fragment>
  ) : (
    <React.Fragment>
      <Layout>
        <SEO
          title="New Blog | Victoria Studio "
          canonical={process.env.PUBLIC_URL + "/user/newpost"}
        />
        <div className="wrapper home-default-wrapper">
          <Header classOption="hb-border" />
          <div className="main-content">
            <div className="container">
              {message === "" ? (
                <form>
                  <div className="row">
                    <div className="col-sm-6 col-md-6 col-lg-4">
                      <div className="text-center-black">
                        <p>SELECT BLOG THUMBNAIL IMAGE</p>
                      </div>
                      <div className="img-style">
                        <img
                          src={
                            selectedImage
                              ? URL.createObjectURL(selectedImage)
                              : null
                          }
                          alt={selectedImage ? selectedImage.name : null}
                          height={280}
                        />

                        <input
                          accept=".jpg, .png, .jpeg"
                          onChange={handleChange}
                          type="file"
                          required
                        />
                        <select
                          onChange={(event) => setTemplate(event.target.value)}
                          value={template}
                        >
                          <option value="template_with_headerimage">
                            Blog with Header Image
                          </option>
                          <option value="template_without_headerimage">
                            Blog without Header Image
                          </option>
                        </select>
                      </div>
                      <div className="text-center-black">
                        <p>SELECT BLOG CATEGORY</p>
                      </div>
                      <Multiselect
                        options={blogCategoryOptions}
                        selectedValues={catSelectedValues}
                        onSelect={onCatSelect}
                        onRemove={onCatRemove}
                        placeholder="+ Add Categories"
                        id="catOption"
                        isObject={false}
                        className="catDrowpdown"
                      />
                      <div className="text-center-black">
                        <p>SELECT BLOG TAGS</p>
                      </div>
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
                    </div>
                    <div className="col-sm-6 col-md-6 col-lg-8">
                      <div className="img-style">
                        <input
                          type="text"
                          name="title"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          placeholder="Blog Title ..."
                          required
                        />
                      </div>
                      <SunEditor
                        height="60vh"
                        setDefaultStyle="font-family: Arial; font-size: 16px;"
                        placeholder="Write your content here ...."
                        onChange={handleEditorChange}
                        setOptions={{
                          buttonList: buttonList.complex,
                        }}
                      />
                      <div style={{ justifyContent: "flex-end" }}>
                        <button
                          className="blue-button"
                          type="submit"
                          onClick={draftPost}
                        >
                          {isDrafting ? "Drafting ..." : `Draft`}
                        </button>
                        <button
                          type="submit"
                          className="blue-button"
                          onClick={publishPost}
                        >
                          {isProcessing ? "Publishing ..." : `Publish`}
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              ) : (
                <div className="text-center-black">
                  <p>{message}</p>
                  <Link href="/user/newpost">
                    <a className="blue-button">New Blog</a>
                  </Link>
                  <Link href="/blogs">
                    <a className="blue-button">Goto Blogs Page</a>
                  </Link>
                </div>
              )}
            </div>
          </div>
          <Footer />
          <ScrollToTop />
        </div>
      </Layout>
    </React.Fragment>
  );
};

export default Newpost;
