import React from "react"
import * as PropTypes from "prop-types"
import Helmet from 'react-helmet'

const propTypes = {
  data: PropTypes.object.isRequired,
}

class SinglePageTemplate extends React.Component {
  render() {
    const page = this.props.pathContext.pageContent
    return (
      <div>
        <Helmet
          title={page.title}
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

SinglePageTemplate.propTypes = propTypes

export default SinglePageTemplate
