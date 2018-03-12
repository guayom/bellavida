import React from "react"
import Link from "gatsby-link"
import * as PropTypes from "prop-types"
import Img from "gatsby-image"
import Helmet from 'react-helmet'
import Wrapper from '../components/Layout/Wrapper'

const propTypes = {
  data: PropTypes.object.isRequired,
}

class ProductTemplate extends React.Component {
  render() {
    const product = this.props.data.contentfulProduct
    const {
      title: { title },
      id,
      description,
    } = product
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
          {this.props.pathContext.translation}
          <h1>{product.title}</h1>
          <p>{product.description.description}</p>
        </Wrapper>
      </div>
    )
  }
}

ProductTemplate.propTypes = propTypes

export default ProductTemplate

export const pageQuery = graphql`
  query productQuery($id: String!) {
    contentfulProduct(id: { eq: $id }) {
      title
      description{
        description
      }
    }
  }
`
