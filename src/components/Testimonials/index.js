import React from "react"

class Testimonials extends React.Component {
  render() {
    const testimonialItems = this.props.items.map((slide, index) =>
      <li key={slide.node.id}>
        "{slide.node.content.content}"
        {slide.node.client} -
        {slide.node.location}
      </li>
    );
    return(
      <div>
        <h2>Testimonials</h2>
        <ul>{testimonialItems}</ul>
      </div>
    )
  }
}

export default Testimonials
