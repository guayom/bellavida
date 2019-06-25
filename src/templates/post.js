import React from "react"
import * as PropTypes from "prop-types"
import Helmet from "react-helmet"
import Wrapper from "../components/Layout/Wrapper"
import Layout from "../components/layout"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import { BLOCKS, MARKS } from "@contentful/rich-text-types"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

const Bold = ({ children }) => <span className="bold">{children}</span>
const Text = ({ children }) => <p className="align-center">{children}</p>

const options = {
  renderMark: {
    [MARKS.BOLD]: text => <Bold>{text}</Bold>,
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => <Text>{children}</Text>,
  },
}

const propTypes = {
  data: PropTypes.object.isRequired,
}

const ProyectTemplate = ({ data: { post }, pageContext }) => {
  return (
    <Layout {...pageContext}>
      <Helmet title={post.title} />
      <Wrapper>
        <h1>{post.title}</h1>
        <p>
          <small>{post.createdAt}</small>
        </p>
        <div style={{ marginBottom: `2em` }}>
          <Img fluid={post.image.fluid} />
        </div>
        {documentToReactComponents(post.body.json, options)}
      </Wrapper>
    </Layout>
  )
}

ProyectTemplate.propTypes = propTypes

export default ProyectTemplate

export const postQuery = graphql`
  query PostQuery($id: String!) {
    post: contentfulBlogPost(id: { eq: $id }) {
      body {
        json
      }
      title
      createdAt(formatString: "MMMM Do, YYYY")
      node_locale
      id
      image {
        fluid {
          ...GatsbyContentfulFluid
        }
      }
    }
  }
`
