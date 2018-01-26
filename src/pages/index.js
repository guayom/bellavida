import React from 'react'
import Link from 'gatsby-link'

class IndexPage extends React.Component {
  render(){
    return(
      <div>
        <h1>Hola</h1>
        <Link to="/page-2/">Go to page 2</Link>
      </div>
    )
  }
}

export default IndexPage
