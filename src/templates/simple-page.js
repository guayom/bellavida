import React from "react"
import * as PropTypes from "prop-types"
import Helmet from 'react-helmet'

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
          title={this.props.pathContext.pageTitle}
          meta={[
            { name: 'description', content: 'Sample' },
            { name: 'keywords', content: 'sample, something' },
          ]}
        />
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
