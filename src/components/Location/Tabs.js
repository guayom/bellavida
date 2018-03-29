import React from 'react'

class Tabs extends React.Component {
  render(){
    const locations = this.props.locations
    return(
      <div>
        {locations.map(location => (
          <div>
            <strong>{location.node.title}</strong>
            <div dangerouslySetInnerHTML={{__html: location.node.address.childMarkdownRemark.html}} />
          </div>
        ))}
      </div>
    )
  }
}

export default Tabs