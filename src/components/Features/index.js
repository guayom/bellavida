import React from "react"

class Features extends React.Component {
  render() {
    const featureItems = this.props.items.map((feature, index) =>
      <li key={feature.node.id}>
        <img src={feature.node.image.resolutions.src} alt={feature.node.title}/>
        {feature.node.title}
        {feature.node.content.content}
      </li>
    );
    return(
      <div>
        <h2>Features</h2>
        <ul>{featureItems}</ul>
      </div>
    )
  }
}

export default Features
