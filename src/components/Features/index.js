import React from "react"
import styled from 'styled-components'
import breakpoint from 'styled-components-breakpoint'
import Img from 'gatsby-image'
import Cta from '../../components/General/CtaLink'

const FeaturesList = styled.ul`
  display: block;
  padding: 0 0 60px;
  margin: 0;

  ${breakpoint('tablet')`
    display: flex;
    margin-top: 0;
    margin-right: -40px;
    marin-bottom: 40px;
    margin-left: -40px;
  `}
`

const FeatureItem = styled.li`
  display: block;
  flex: 1 0;
  text-align: center;
  margin: 0 0 60px;

  &:last-of-type {
    margin-bottom: 0;
  }

  ${breakpoint('tablet') `
    margin: 0 40px;
  `}
`

const ImageContainer = styled.div`
  max-width: 150px;
  margin: 0 auto 20px;
`

class Features extends React.Component {
  render() {
    const featureItems = this.props.items.map((feature, index) =>
      <FeatureItem key={feature.node.id}>
        <ImageContainer>
          <Img fluid={feature.node.image.fluid} alt={feature.node.title}/>
        </ImageContainer>
        <h3>{feature.node.title}</h3>
        <p>{feature.node.content.content}</p>
        <Cta to={feature.node.buttonLink.replace(/https:\/\/www\.bellavidacostarica\.com/i, '')} text={feature.node.buttonText}/>
      </FeatureItem>
    );
    return(
      <div>
        <FeaturesList>{featureItems}</FeaturesList>
      </div>
    )
  }
}

export default Features
