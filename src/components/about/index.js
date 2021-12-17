import React from "react";
import AboutData from "@/data/about.json";
import PageTitle from "@/components/page-title";

const AboutPageDetails = () => {
  return (
    <React.Fragment>
      <div className="service-area">
        <div className="page-title-area">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <PageTitle
                  classOption="page-title-content"
                  subTitle="About"
                  title="We Are KokeLiko"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-xl-12 ">
              <h2 className="title">{AboutData[0].title}</h2>
              <p
                dangerouslySetInnerHTML={{
                  __html: AboutData[0].excerpt,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AboutPageDetails;
