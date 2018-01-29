import React from "react"
import * as PropTypes from "prop-types"
import Slider from '../components/Slider'
import Testimonial from '../components/Testimonials'
import Features from '../components/Features'
import Projects from '../components/Projects'

const propTypes = {
  data: PropTypes.object.isRequired,
}

class HomeTemplate extends React.Component {
  render() {
    const slides = this.props.data.allContentfulHomeSlide.edges
    const testimonials = this.props.data.allContentfulTestimonial.edges
    const homeFeatures = this.props.data.allContentfulHomeFeature.edges
    const projects = this.props.data.allContentfulProject.edges
    const description = this.props.data.allContentfulPage.edges[0].node.content.content

    return (
      <div>
        <h1>Home ({this.props.pathContext.locale})</h1>
        <Slider slides={slides} />
        <Testimonial items={testimonials} />
        <Features items={homeFeatures} />
        <h2>Description</h2>
        {description}
        <Projects items={projects} />
        Location
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
    allContentfulTestimonial(filter: { node_locale: { eq: $locale } }) {
      edges {
        node {
          id
          client
          location
          content {
            content
          }
          node_locale
        }
      }
    }
    allContentfulHomeFeature(filter: { node_locale: { eq: $locale } }) {
      edges {
        node {
          id
          title
          content {
            content
          }
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
          node_locale
        }
      }
    }
    allContentfulProject(filter: { node_locale: { eq: $locale } }) {
      edges {
        node {
          id
          title
          images {
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
          node_locale
        }
      }
    }
    allContentfulPage(filter:{contentful_id: {eq:"57hWtglQuseQIYGCSUmg40"} node_locale: {eq: $locale}}) {
      edges {
        node{
          content{
            content
          }
        }
      }
    }

  }
`
