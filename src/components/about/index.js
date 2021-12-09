import React from "react";
import Link from "next/link";
import AboutData from "@/data/about.json";
import PageTitle from "@/components/page-title";

const AboutPageDetails = () => {
  return (
    <React.Fragment>
      <div className="page-title-area">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <PageTitle
                classOption="page-title-content"
                subTitle="About"
                title="We Are KokeLiko"
              />
              <div className="page-title-content">
                <ul className="bread-crumbs">
                  <li>
                    <Link href="/">
                      <a>Home </a>
                    </Link>
                  </li>
                  <li>{">"}</li>
                  <li> About</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="service-area">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-xl-8 ">
              <h2 className="title">{AboutData[0].title}</h2>
              <p
                dangerouslySetInnerHTML={{
                  __html: AboutData[0].excerpt,
                }}
              />
            </div>
            <div className="col-lg-4 col-xl-3 offset-xl-1">
              <h2 className="title">{AboutData[1].title}</h2>
              <ul>
                {AboutData[1].pagelinkText &&
                  AboutData[1].pagelinkText.map((single, key) => (
                    <li key={key}>
                      <Link href={process.env.PUBLIC_URL + "/"}>
                        <a>{single.text}</a>
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AboutPageDetails;
