import React from "react"
import * as PropTypes from "prop-types"
import Helmet from "react-helmet"
import Wrapper from "../components/Layout/Wrapper"
import InternalHero from "../components/General/InternalHero"
import Layout from "../components/layout"
import { graphql } from "gatsby"
import DownloadFileButton from "../components/General/DownloadFileButton"

const propTypes = {
  data: PropTypes.object.isRequired,
}

const SimplePageTemplate = ({
  data: { contentfulPage: page, brochure },
  pageContext,
}) => {
  return (
    <Layout {...pageContext}>
      <Helmet title={page.title} />
      <InternalHero title={page.title} image={page.image} />
      <Wrapper>
        <div
          dangerouslySetInnerHTML={{
            __html: page.content.childMarkdownRemark.html,
          }}
        />
        {page.showBrochure && (
          <DownloadFileButton title={brochure.title} url={brochure.file.url} />
        )}
      </Wrapper>
    </Layout>
  )
}

SimplePageTemplate.propTypes = propTypes

export default SimplePageTemplate

export const pageQuery = graphql`
  query pageQuery($id: String!, $locale: String!) {
    brochure: contentfulAsset(contentful_id: {eq: "qJhVbONXYV0Tlj2fEiTyv"}, node_locale: {eq: $locale}) {
        file {
          url
        }
        title
        description
      }
    contentfulPage(id: { eq: $id }) {
      title
      content {
        childMarkdownRemark {
          html
        }
      }
      image {
        fluid {
          ...GatsbyContentfulFluid
        }
      }
      showBrochure
    }
  }
`
