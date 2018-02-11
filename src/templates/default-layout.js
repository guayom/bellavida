import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import Header from '../components/Header'
import '../layouts/index.css'

const TemplateWrapper = ({ data, children, layoutContext }) => (
  <div>
    <div
      style={{
        margin: '0 auto',
        maxWidth: 960,
        padding: '0px 1.0875rem 1.45rem',
        paddingTop: 0,
      }}
    >
      <Header products={data.allContentfulProduct} brands={data.allContentfulProductBrand} locale={layoutContext.locale}/>
      {children()}
    </div>
  </div>
)

TemplateWrapper.propTypes = {
  children: PropTypes.func,
}

export default TemplateWrapper

export const pageQuery = graphql`
  query menuQuery($locale: String!) {
    allContentfulProduct(filter: { node_locale: { eq: $locale } }) {
      edges {
        node {
          id
          title
          node_locale
        }
      }
    }
    allContentfulProductBrand {
      edges {
        node {
          id
          title
          slug
        }
      }
    }
  }
`
