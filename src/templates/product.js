import React from "react";
import * as PropTypes from "prop-types";
import Helmet from "react-helmet";
import Wrapper from "../components/Layout/Wrapper";
import InternalHero from "../components/General/InternalHero";
import Layout from "../components/layout";
import { graphql } from "gatsby";
import { FaDownload } from 'react-icons/fa'

const propTypes = {
  data: PropTypes.object.isRequired
};

const ProductTemplate = ({ data, pageContext }) => {
  const product = data.contentfulProduct

  return (
    <Layout {...pageContext}>
      <Helmet title={product.title} />
      <InternalHero title={product.title} image={product.image} />
      <Wrapper>
        <div
          dangerouslySetInnerHTML={{
            __html: product.description.childMarkdownRemark.html,
          }}
        />
        {product.pdf && (
          <a
            style={{
              display: `inline-block`,
              padding: "8px 20px",
              background: "#93c548",
              fontSize: "14px",
              lineHeight: "14px",
              color: "#fff",
              textDecoration: `none`,
              borderRadius: `4px`,
              border: 0,
            }}
            href={product.pdf.file.url}
            target="_blank"
            download={product.pdf.title}
          >
            {product.pdf.title} <FaDownload />
          </a>
        )}
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
      pdf {
        title
        file {
          url
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
