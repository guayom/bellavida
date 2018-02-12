import React from "react"
import * as PropTypes from "prop-types"
import Helmet from 'react-helmet'

const propTypes = {
  data: PropTypes.object.isRequired,
}

class AllProductsPageTemplate extends React.Component {
  render() {
    console.log(this.props)
    const items = this.props.pathContext.items

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
          {items.map(product =>
            <li>{product.node.title}</li>
          )}
        </ul>
      </div>
    )
  }
}

AllProductsPageTemplate.propTypes = propTypes

export default AllProductsPageTemplate
