import React from "react";
import SEO from "../components/seo";

const PrivacyPolicyPage = () => {
  return (
    <>
      <SEO
        title="Privacy Policy | KokeLiko"
        canonical={`${process.env.PUBLIC_URL}/privacypolicy`}
      />
      <div className="container">
        <div className="row">
          <h4>Privacy Policy</h4>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicyPage;
