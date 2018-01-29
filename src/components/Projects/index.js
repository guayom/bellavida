import React from "react"

class Projects extends React.Component {
  render() {
    const projects = this.props.items.map((project, index) =>
      <li key={project.node.id}>
        <h3>{project.node.title}</h3>
      </li>
    );
    return(
      <div>
        <h2>Projects</h2>
        <ul>{projects}</ul>
      </div>
    )
  }
}

export default Projects
