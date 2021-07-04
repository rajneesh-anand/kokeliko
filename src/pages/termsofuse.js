import React from "react";
import SEO from "../components/seo";

const TermsOfUsePage = () => {
  return (
    <>
      <SEO
        title=" Terms &amp; Services | KokeLiko"
        canonical={`${process.env.PUBLIC_URL}/termsofuse`}
      />
      <div className="container">
        <div className="row">
          <h4>Pricay Page</h4>
        </div>
      </div>
    </>
  );
};

export default TermsOfUsePage;
