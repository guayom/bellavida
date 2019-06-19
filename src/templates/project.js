import React from "react"
import * as PropTypes from "prop-types"
import Helmet from "react-helmet"
import Wrapper from "../components/Layout/Wrapper"
import Layout from "../components/layout"
import { graphql } from "gatsby"
import ImageGallery from "react-image-gallery"
import "react-image-gallery/styles/css/image-gallery.css"

const propTypes = {
  data: PropTypes.object.isRequired,
}

function showDescription(description, html) {
  if (description === "Description" || description === "Descripción") {
    return null
  } else {
    return <div dangerouslySetInnerHTML={{ __html: html }} />
  }
}

const ProyectTemplate = ({
  data: { contentfulProject: project },
  pageContext,
}) => {
  const images = project.images.map(i => ({
    original: i.fluid.src,
    thumbnail: i.fluid.src,
  }))

  return (
    <Layout {...pageContext}>
      <Helmet title={project.title} />
      <Wrapper>
        <h1>{project.title}</h1>
        <ImageGallery items={images} />
        {showDescription(
          project.content.content,
          project.content.childMarkdownRemark.html
        )}
      </Wrapper>
    </Layout>
  )
}

ProyectTemplate.propTypes = propTypes

export default ProyectTemplate

export const pageQuery = graphql`
  query ProjectQuery($id: String!) {
    contentfulProject(id: { eq: $id }) {
      content {
        content
        childMarkdownRemark {
          html
        }
      }
      title
      slug
      node_locale
      id
      images {
        fluid {
          src
        }
      }
    }
  }
`
