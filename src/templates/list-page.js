import React from "react"
import Helmet from 'react-helmet'
import Wrapper from '../components/Layout/Wrapper'

class AllProductsPageTemplate extends React.Component {
  render() {
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
              <li key={page.node.id}><a href={path+"/"+page.node.slug}>{page.node.title}</a></li>
            )}
          </ul>
        </Wrapper>
      </div>
    )
  }
}

export default AllProductsPageTemplate
