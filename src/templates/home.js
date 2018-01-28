import React from "react"
import * as PropTypes from "prop-types"

const propTypes = {
  data: PropTypes.object.isRequired,
}

class HomeTemplate extends React.Component {
  render() {
    const slides = this.props.data.allContentfulHomeSlide.edges
    const slideItems = slides.map((slide, index) =>
      <li key={slide.node.id}>{slide.node.title}</li>
    );
    return (
      <div>
        <h1>Home ({this.props.pathContext.locale})</h1>
        <ul>{slideItems}</ul>
      </div>
    )
  }
}

HomeTemplate.propTypes = propTypes

export default HomeTemplate

export const pageQuery = graphql`
  query homeQuery($locale: String!) {
    allContentfulHomeSlide(filter: { node_locale: { eq: $locale } }) {
      edges {
        node {
          id
          title
          node_locale
          image {
            id
            resolutions {
              base64
              aspectRatio
              width
              height
              src
              srcSet
            }
          }
        }
      }
    }
  }
`
