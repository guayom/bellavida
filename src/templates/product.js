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

const ProductTemplate = ({ data, pageContext }) => {
  const product = data.contentfulProduct

  return (
    <Layout
      {...pageContext}
    >
      <Helmet title={product.title} />
      <InternalHero title={product.title} image={product.image} />
      <Wrapper>
        <div
          dangerouslySetInnerHTML={{
            __html: product.description.childMarkdownRemark.html,
          }}
        />
      </Wrapper>
    </Layout>
  )
}

ProductTemplate.propTypes = propTypes;

export default ProductTemplate;

export const pageQuery = graphql`
  query productQuery($id: String!, $locale: String!) {
    contentfulProduct(id: { eq: $id }) {
      title
      description {
        childMarkdownRemark {
          html
        }
      }
      image {
        fluid {
          ...GatsbyContentfulFluid
        }
      }
    }

    allContentfulProduct(filter: { node_locale: { eq: $locale } }) {
      edges {
        node {
          id
          title
          slug
          node_locale
        }
      }
    }
    allContentfulProductBrand(filter: { node_locale: { eq: $locale } }) {
      edges {
        node {
          id
          title
          website
          slug
          size
          order
          logo {
            fluid {
              ...GatsbyContentfulFluid
            }
          }
        }
      }
    }
    allContentfulPhoneNumbers(filter: { node_locale: { eq: $locale } }) {
      edges {
        node {
          number
          id
        }
      }
    }
    allContentfulSocialNetwork(filter: { node_locale: { eq: $locale } }) {
      edges {
        node {
          title
          url
          id
        }
      }
    }
    allSitePage {
      edges {
        node {
          id
          path
        }
      }
    }
  }
`
