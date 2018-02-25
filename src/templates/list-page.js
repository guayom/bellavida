import React from "react"
import * as PropTypes from "prop-types"
import Helmet from 'react-helmet'
import Wrapper from '../components/Layout/Wrapper'

const propTypes = {
  data: PropTypes.object.isRequired,
}

class AllProductsPageTemplate extends React.Component {
  render() {
    console.log(this.props)
    const items = this.props.pathContext.items
    const path = this.props.location.pathname

    return (
      <div>
        <Helmet
          title={this.props.pathContext.pageTitle}
          meta={[
            { name: 'description', content: 'Sample' },
            { name: 'keywords', content: 'sample, something' },
          ]}
        />
        <Wrapper>
          <h1>All Products</h1>
          <ul>
            {items.map(page =>
              <li><a href={path+"/"+page.node.slug}>{page.node.title}</a></li>
            )}
          </ul>
        </Wrapper>
      </div>
    )
  }
}

AllProductsPageTemplate.propTypes = propTypes

export default AllProductsPageTemplate
