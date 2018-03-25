import React from "react"
import * as PropTypes from "prop-types"
import Helmet from 'react-helmet'
import Wrapper from '../components/Layout/Wrapper'
import InternalHero from '../components/General/InternalHero'

const propTypes = {
  data: PropTypes.object.isRequired,
}

class SimplePageTemplate extends React.Component {
  render() {
    const page = this.props.data.contentfulProductBrand
    const {
      title: { title },
      id,
      description,
    } = page
    return (
      <div>
        <Helmet
          title={this.props.pathContext.pageTitle}
          meta={[
            { name: 'description', content: 'Sample' },
            { name: 'keywords', content: 'sample, something' },
          ]}
        />
        <InternalHero title={page.title} image={page.image} brand/>
        <Wrapper>
          <div dangerouslySetInnerHTML={{ __html: page.description.childMarkdownRemark.html }} />
        </Wrapper>
      </div>
    )
  }
}

SimplePageTemplate.propTypes = propTypes

export default SimplePageTemplate

export const pageQuery = graphql`
  query brandQuery($id: String!) {
    contentfulProductBrand(id: { eq: $id }) {
      title
      image {
        responsiveResolution(width: 1300) {
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
      description{
        childMarkdownRemark {
          html
        }
      }
    }
  }
`
