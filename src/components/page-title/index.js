import PropTypes from "prop-types";
import Link from "next/link";

const PageTitle = ({ subTitle, title, classOption }) => {
  return (
    <div className={`${classOption}`}>
      <h4 className="sub-title">{subTitle}</h4>
      <h1 className="title">{title}</h1>
    </div>
  );
};

PageTitle.propTypes = {
  subTitle: PropTypes.string,
  title: PropTypes.string,
  classOption: PropTypes.string,
};

export default PageTitle;
