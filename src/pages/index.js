import React from 'react'
import Link from 'gatsby-link'

class IndexPage extends React.Component {
  render(){

    const usProductEdges = this.props.data.us.edges
    const esProductEdges = this.props.data.es.edges

    return(
      <div>
        <h1>US</h1>
        <ul>
          {usProductEdges.map(({ node }, i) => (
            <li key={node.id}>{node.title} - {node.slug}</li>
          ))}
        </ul>

        <h1>ES</h1>
        <ul>
          {esProductEdges.map(({ node }, i) => (
            <li key={node.id}>{node.title} - {node.slug}</li>
          ))}
        </ul>
        <Link to="/page-2/">Go to page 2</Link>
      </div>
    )
  }
}

export default IndexPage

export const pageQuery = graphql`
  query PageQuery {
    us: allContentfulProduct(filter: {node_locale: {eq: "en-US"}}) {
      edges {
        node {
          title
          id
          slug
        }
      }
    }
    es: allContentfulProduct(filter: {node_locale: {eq: "es"}}) {
      edges {
        node {
          title
          id
          slug
        }
      }
    }
  }
`
