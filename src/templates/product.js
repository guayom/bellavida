import React from "react"
import Link from "gatsby-link"
import * as PropTypes from "prop-types"
import Img from "gatsby-image"
import Helmet from 'react-helmet'
import Wrapper from '../components/Layout/Wrapper'
import InternalHero from '../components/General/InternalHero'

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
        <InternalHero title={product.title} image={product.image} />
        <Wrapper>
          <div dangerouslySetInnerHTML={{ __html: product.description.childMarkdownRemark.html }} />
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
        childMarkdownRemark {
          html
        }
      }
      image {
        responsiveResolution(width: 1240, height:300) {
          base64
          aspectRatio
          width
          height
          src
          srcSet
        }
        sizes {
          base64
          aspectRatio
          src
          srcSet
          srcWebp
          srcSetWebp
          sizes
        }
      }
    }
  }
`
