import React from "react";
import * as PropTypes from "prop-types";
import Helmet from "react-helmet";
import Wrapper from "../components/Layout/Wrapper";
import InternalHero from "../components/General/InternalHero";
import Layout from "../components/layout";
import { graphql } from "gatsby";

const propTypes = {
  data: PropTypes.object.isRequired
};

const SimplePageTemplate = ({
  data: { contentfulProductBrand: {
    title, image, description
  } },
  pageContext,
}) => {
  return (
    <Layout {...pageContext}>
      <Helmet title={title} />
      <InternalHero title={title} image={image} brand />
      <Wrapper>
        <div
          dangerouslySetInnerHTML={{
            __html: description.childMarkdownRemark.html,
          }}
        />
      </Wrapper>
    </Layout>
  )
}

SimplePageTemplate.propTypes = propTypes;

export default SimplePageTemplate;

export const pageQuery = graphql`
  query brandQuery($id: String!) {
    contentfulProductBrand(id: { eq: $id }) {
      title
      image {
        fluid {
          ...GatsbyContentfulFluid
        }
        fixed {
          ...GatsbyContentfulFixed
        }
      }
      description {
        childMarkdownRemark {
          html
        }
      }
    }
  }
`;
