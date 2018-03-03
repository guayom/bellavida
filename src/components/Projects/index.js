import React from "react"
import styled from 'styled-components'
import TitleBar from  '../../components/General/TitleBar'

const Container = styled.div`
  flex: 2 0;
  margin-right: 40px;
`

class Projects extends React.Component {
  render() {
    const projects = this.props.items.map((project, index) =>
      <li key={project.node.id}>
        <h3>{project.node.title}</h3>
      </li>
    );
    return(
      <Container>
        <TitleBar title="Recent projects" />
        <ul>{projects}</ul>
      </Container>
    )
  }
}

export default Projects
