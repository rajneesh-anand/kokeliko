import Link from "next/link";
import Router from "next/router";
import htmr from "htmr";
import Image from "next/image";
import { height } from "styled-system";

const BlogListTwo = ({ data }) => {
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  const truncate = (str, no_words) => {
    return htmr(str.split(" ").splice(0, no_words).join(" ") + "  ... ... ...");
  };

  const unpublishBlog = async (id) => {
    await fetch(`/api/unpublish/${id}`, {
      method: "PUT",
    });
    await Router.push("/user/account");
  };

  return data.map((blog) => (
    <div key={blog.id} className="card mb-3">
      <div className="row no-gutters">
        <div className="col-md-3" style={{ paddingLeft: 0 }}>
          <div style={{ position: "relative", height: "100%" }}>
            {blog.image && (
              <Image
                src={blog.image}
                alt={blog.title}
                layout="fill"
                objectFit="cover"
              />
            )}
          </div>
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">{blog.title}</h5>
            <div className="card-text">{truncate(blog.content, 35)}</div>
            <div style={{ display: "flex", width: "100%" }}>
              <p className="card-text">
                <small className="text-muted">
                  {formatDate(blog.createdAt)}
                </small>
              </p>
              <div style={{ marginLeft: "auto" }}>
                <button
                  className="blue-button"
                  onClick={() => unpublishBlog(blog.id)}
                >
                  Un-Publish
                </button>
                <Link href={`/user/post/edit/${blog.id}`}>
                  <a className="blue-button">Edit Blog</a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ));
};

export default BlogListTwo;
