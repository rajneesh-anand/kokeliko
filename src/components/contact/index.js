import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";

const ContactForm = () => {
  const editorRef = useRef();
  const { CKEditor, ClassicEditor } = editorRef.current || {};
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [isProcessing, setProcessingTo] = useState(false);
  const [message, setMessage] = useState();
  const [content, setContent] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onBlur",
  });

  useEffect(() => {
    editorRef.current = {
      CKEditor: require("@ckeditor/ckeditor5-react").CKEditor,
      ClassicEditor: require("@ckeditor/ckeditor5-build-classic"),
    };
    setEditorLoaded(true);
    if (message) {
      if (message === "success") {
        toast.success(
          "Thank you for your email, We will contact you shortly !"
        );
      } else {
        toast.error("Oops, Something went wrong !");
      }
    }
  }, [message]);

  const onSubmit = async (data) => {
    setMessage(null);
    setProcessingTo(true);
    const userInfo = {
      name: data.name,
      email: data.email,
      subject: data.subject,
      message: content,
    };

    try {
      const result = await fetch("/api/contact", {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userInfo),
      });

      if (result.status >= 400 && result.status < 600) {
        throw new Error("Bad response from server");
      } else {
        setMessage("success");
        setContent("");
        setProcessingTo(false);
        reset("", {
          keepValues: false,
        });
      }
    } catch (error) {
      setMessage("failed");
      setProcessingTo(false);
    }
  };

  return (
    <div className="contact-area pb-50">
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

        <div className="contact-form">
          <div className="form-items">
            <h3>How Can We Help You ? </h3>
            <p>Fill in the form below</p>
            <form>
              <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-6">
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Your Full Name"
                    {...register("name", {
                      required: "Name is required !",
                    })}
                  />

                  {errors.name && <p>{errors.name.message}</p>}
                </div>

                <div className="col-lg-6 col-md-6 col-sm-6">
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="example@xyz.com"
                    {...register("email", {
                      required: "Email is required !",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                        message: "Invalid email address !",
                      },
                    })}
                  />
                  {errors.email && <p>{errors.email.message}</p>}
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12">
                  <input
                    type="text"
                    name="subject"
                    className="form-control"
                    placeholder="The subject of your message "
                    {...register("subject", {
                      required: "Kindly fill the subject  !",
                    })}
                  />
                  {errors.subject && <p>{errors.subject.message}</p>}
                </div>

                {/* <div className="col-lg-6 col-md-6 col-sm-6">
                  <select className="form-select mt-3" {...register("type")}>
                    <option value="Online Seller Courses">
                      Online Courses
                    </option>
                    <option value="Membership Gold Plan">
                      Membership Gold Plan
                    </option>
                    <option value="Products Suggestion Query">
                      Products Suggestion Query
                    </option>
                    <option value="Online Seller Services">
                      Online Seller Services
                    </option>
                    <option value="Others Query">Others Query</option>
                  </select>
                </div> */}

                <div className="col-lg-12 col-md-12 col-sm-12 form-editor">
                  {editorLoaded ? (
                    <CKEditor
                      editor={ClassicEditor}
                      data={content}
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
                        setContent(data);
                      }}
                    />
                  ) : (
                    <p>editor..</p>
                  )}
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12 text-center mt-3">
                  <button
                    type="submit"
                    className="default-btn"
                    onClick={handleSubmit(onSubmit)}
                  >
                    <i className="bx bx-paper-plane"></i>{" "}
                    {isProcessing ? "Sending ...." : " Send Message"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
