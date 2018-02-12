import React from "react"
import * as PropTypes from "prop-types"
import Helmet from 'react-helmet'

const propTypes = {
  data: PropTypes.object.isRequired,
}

class AllProductsPageTemplate extends React.Component {
  render() {
    const products = this.props.data.allContentfulProduct.edges
    const brands = this.props.data.allContentfulProductBrand.edges

    return (
      <div>
        <Helmet
          title={this.props.pathContext.pageTitle}
          meta={[
            { name: 'description', content: 'Sample' },
            { name: 'keywords', content: 'sample, something' },
          ]}
        />
        <h1>All Products</h1>
        <ul>
          {products.map(product =>
            <li>{product.node.title}</li>
          )}
        </ul>
      </div>
    )
  }
}

AllProductsPageTemplate.propTypes = propTypes

export default AllProductsPageTemplate

export const pageQuery = graphql`
  query allProductsQuery($locale: String!) {
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
    allContentfulProductBrand(filter: { node_locale: { eq: $locale } }){
      edges {
        node {
          id
          title
          slug
          node_locale
        }
      }
    }
  }
`
