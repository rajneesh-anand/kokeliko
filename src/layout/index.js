import React from "react";
import PropTypes from "prop-types";
import GoTop from "@/components/go-top";

const Layout = ({ children }) => {
  return (
    <>
      {children}
      <GoTop scrollStepInPx="100" delayInMs="10.50" />
    </>
  );
};
Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
export default Layout;
