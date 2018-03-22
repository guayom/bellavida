import React from "react"
import styled from 'styled-components'
import breakpoint from 'styled-components-breakpoint'
import TitleBar from  '../../components/General/TitleBar'
import Img from 'gatsby-image'
import CtaLink from '../../components/General/CtaLink'
import Link from 'gatsby-link'

const Container = styled.div`
  flex: 1 0;

  ${breakpoint('tablet')`
    flex: 2 0;
    margin-right: 40px;
  `}
`

const ProjectContainer = styled.li`
  display: flex;
  margin-bottom: 20px;
`

const ImageContainer = styled.div`
  flex: 1 0;
`

const ContentContainer = styled.div`
  flex: 2 0;
  margin-left: 20px;
`

class Projects extends React.Component {
  render() {
    const projects = this.props.items.map((project, index) =>
      <ProjectContainer key={project.node.id}>
        <ImageContainer>
          <Link to={`/en/projects/${project.node.slug}`}>
            <Img sizes={project.node.images[0].sizes} />
          </Link>
        </ImageContainer>
        <ContentContainer>
          <h3>{project.node.title}</h3>
          <CtaLink to={`/en/projects/${project.node.slug}`} text="More info" size="small"/>
        </ContentContainer>
      </ProjectContainer>
    );
    return(
      <Container>
        <TitleBar title="Recent projects" />
        <ul
          style={{margin: 0, padding: 0, listStyle: `none`}}
        >
          {projects}
        </ul>
      </Container>
    )
  }
}

export default Projects
