import React from 'react'

class Slider extends React.Component {
  render() {
    const slideItems = this.props.slides.map((slide, index) =>
      <li key={slide.node.id}>{slide.node.title}</li>
    );
    return(
      <div>
        <h2>Slides</h2>
        <ul>{slideItems}</ul>
      </div>
    )
  }
}

export default Slider
