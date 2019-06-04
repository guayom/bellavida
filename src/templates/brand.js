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

class SimplePageTemplate extends React.Component {
  render() {
    const page = this.props.data.contentfulProductBrand;
    const {
      title: { title },
      id,
      description
    } = page;
    return (
      <Layout>
        <Helmet title={page.title} />
        <InternalHero title={page.title} image={page.image} brand />
        <Wrapper>
          <div
            dangerouslySetInnerHTML={{
              __html: page.description.childMarkdownRemark.html
            }}
          />
        </Wrapper>
      </Layout>
    );
  }
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
      }
      description {
        childMarkdownRemark {
          html
        }
      }
    }
  }
`;
