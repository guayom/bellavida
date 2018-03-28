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
    const page = this.props.data.contentfulPage
    const {
      title: { title },
      id,
      content,
    } = page
    return (
      <div>
        <Helmet
          title={page.title}
        />
        <InternalHero title={page.title} image={page.image} />
        <Wrapper>
          <div dangerouslySetInnerHTML={{ __html: page.content.childMarkdownRemark.html }} />
        </Wrapper>
      </div>
    )
  }
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
