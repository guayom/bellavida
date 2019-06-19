import React from "react"
import * as PropTypes from "prop-types"
import Helmet from "react-helmet"
import Wrapper from "../components/Layout/Wrapper"
import InternalHero from "../components/General/InternalHero"
import Layout from "../components/layout"
import { graphql } from "gatsby"

const propTypes = {
  data: PropTypes.object.isRequired,
}

const SimplePageTemplate = ({ data: { contentfulPage: page }, pageContext }) => {
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
      </Wrapper>
    </Layout>
  )
}

SimplePageTemplate.propTypes = propTypes

export default SimplePageTemplate

export const pageQuery = graphql`
  query pageQuery($id: String!) {
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
    }
  }
`
