import React from "react"
import * as PropTypes from "prop-types"
import Helmet from 'react-helmet'
import Wrapper from '../components/Layout/Wrapper'

const propTypes = {
  data: PropTypes.object.isRequired,
}

class SimplePageTemplate extends React.Component {
  render() {
    const page = this.props.data.contentfulProductBrand
    const {
      title: { title },
      id,
      description,
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
        <Wrapper>
          <h1>{page.title}</h1>
          <p>{page.description.description}</p>
        </Wrapper>
      </div>
    )
  }
}

SimplePageTemplate.propTypes = propTypes

export default SimplePageTemplate

export const pageQuery = graphql`
  query brandQuery($id: String!) {
    contentfulProductBrand(id: { eq: $id }) {
      title
      description{
        description
      }
    }
  }
`
