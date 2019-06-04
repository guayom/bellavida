import React from "react";
import * as PropTypes from "prop-types";
import Helmet from "react-helmet";
import Wrapper from "../components/Layout/Wrapper";
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from "react-image-gallery";
import Layout from "../components/layout";
import { graphql } from "gatsby";

const propTypes = {
  data: PropTypes.object.isRequired
};

function showDescription(description, html) {
  if (description === "Description" || description === "Descripción") {
    return null;
  } else {
    return <div dangerouslySetInnerHTML={{ __html: html }} />;
  }
}

class SinglePageTemplate extends React.Component {
  render() {
    const project = this.props.pageContext.pageContent;
    const images = project.images.map(i => ({
      original: i.fluid.src,
      thumbnail: i.fluid.src
    }));
    return (
      <Layout>
        <Helmet title={project.title} />
        <Wrapper>
          <h1>{project.title}</h1>
          <ImageGallery items={images} />
          {showDescription(
            project.content.content,
            project.content.childMarkdownRemark.html
          )}
        </Wrapper>
      </Layout>
    );
  }
}

SinglePageTemplate.propTypes = propTypes;

export default SinglePageTemplate;
