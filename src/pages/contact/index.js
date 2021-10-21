import React from "react";
import SEO from "../../components/seo";
import ContactContainer from "../../containers/contact";
// import MapContainer from "../../containers/global/map";
import Footer from "../../layout/footer";
import Header from "../../layout/header";
import Layout from "../../layout";

const Contact = () => {
  return (
    <React.Fragment>
      <Layout>
        <SEO
          title="Contact | KokeLiko "
          canonical={process.env.PUBLIC_URL + "/contact"}
        />
        <div className="wrapper home-default-wrapper">
          <Header classOption="hb-border" />
          <div className="main-content">
            <ContactContainer />
          </div>
          <Footer />
        </div>
      </Layout>
    </React.Fragment>
  );
};

export default Contact;
