import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import "./main.css";

const TemplateWrapper = ({ children }) => (
  <div>
    <Helmet
      title="Bella Vida Costa Rica"
      meta={[
        {
          name: "description",
          content:
            "Bella Vida Costa Rica provides a variety of world class products and services to architects, developers, builders, designers and home owners."
        },
        {
          name: "keywords",
          content:
            "Pella, Toto, Fleetwood, Amarr, La cantina doors, Doors, Windows, Folding Doors, Sliding Doors"
        }
      ]}
    />
    <div>
      This page is using the default layout. It should use either es or en
      {children}
    </div>
  </div>
);

TemplateWrapper.propTypes = {
  children: PropTypes.func
};

export default TemplateWrapper;
