import React from "react"
import * as PropTypes from "prop-types"
import Helmet from 'react-helmet'
import Wrapper from '../components/Layout/Wrapper'
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from 'react-image-gallery';

const propTypes = {
  data: PropTypes.object.isRequired,
}

function showDescription(description, html){
  if (description === "Description" || description === "Descripción") {
    return null
  } else {
    return(
      <div dangerouslySetInnerHTML={{ __html: html }} />
    )
  }
}

class SinglePageTemplate extends React.Component {
  render() {
    const project = this.props.data.contentfulProject
    const images = project.images.map(i => ({ original: i.sizes.src, thumbnail: i.sizes.src }))
    return (
      <div>
        <Helmet
          title={project.title}
          meta={[
            { name: 'description', content: 'Sample' },
            { name: 'keywords', content: 'sample, something' },
          ]}
        />
        <Wrapper>
          <h1>{project.title}</h1>
          <ImageGallery items={images} />
          {console.log(project.content.content)}
          {showDescription(project.content.content, project.content.childMarkdownRemark.html)}
        </Wrapper>
      </div>
    )
  }
}

SinglePageTemplate.propTypes = propTypes

export default SinglePageTemplate

export const projectQuery = graphql`
  query projectQuery($id: String!) {
    contentfulProject(id: { eq: $id }) {
      id
      title
      slug
      node_locale
      images {
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
      content {
        content
        childMarkdownRemark {
          html
        }
      }
    }
  }
`
