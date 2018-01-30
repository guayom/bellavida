import React from "react"
import * as PropTypes from "prop-types"

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
        <h1>{page.title}</h1>
        <p>{page.content.content}</p>
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
      content{
        content
      }
    }
  }
`
