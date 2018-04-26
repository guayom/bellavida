import React from "react"
import * as PropTypes from "prop-types"
import Slider from '../components/Slider'
import Testimonials from '../components/Testimonials'
import Features from '../components/Features'
import Projects from '../components/Projects'
import HomeDescription from '../components/HomeDescription'
import Location from '../components/Location'
import Helmet from 'react-helmet'
import Wrapper from '../components/Layout/Wrapper'
import styled from 'styled-components'
import breakpoint from 'styled-components-breakpoint'

const propTypes = {
  data: PropTypes.object.isRequired,
}

const HomeGrid = styled.div`
  display: block;

  ${breakpoint('tablet')`
    display: flex;
  `}
`

class HomeTemplate extends React.Component {
  render() {
    const slides = this.props.data.allContentfulHomeSlide.edges
    const testimonials = this.props.data.allContentfulTestimonial.edges
    const homeFeatures = this.props.data.allContentfulHomeFeature.edges
    const projects = this.props.data.allContentfulProject.edges.sort((a,b) =>{ return new Date(b.node.createdAt) - new Date(a.node.createdAt)})
    const description = this.props.data.allContentfulPage.edges[0].node.content.childMarkdownRemark.html

    return (
      <div>
        <Helmet 
          title={this.props.pathContext.pageTitle}
        />
        <Slider slides={slides} />
        <Testimonials items={testimonials} />
        <Wrapper>
          <Features items={homeFeatures} />
          <HomeDescription description={description} />
          <HomeGrid>
            <Projects items={projects} />
            <Location items={projects} />
          </HomeGrid>
        </Wrapper>
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
            resolutions(width: 1240, height: 600) {
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
          buttonLink
          buttonText
          content {
            content
          }
          image {
            id
            sizes(maxWidth: 150) {
              base64
              aspectRatio
              src
              srcSet
              srcWebp
              srcSetWebp
              sizes
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
          createdAt
          title
          slug
          node_locale
          images {
            id
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
    }
    allContentfulPage(filter:{contentful_id: {eq:"57hWtglQuseQIYGCSUmg40"} node_locale: {eq: $locale}}) {
      edges {
        node{
          content{
            childMarkdownRemark {
              html
            }
          }
        }
      }
    }
  }
`
