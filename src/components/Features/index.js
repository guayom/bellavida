import React from "react"
import styled from 'styled-components'
import Img from 'gatsby-image'

const FeaturesList = styled.ul`
  display: block;
  padding: 0 0 60px;
  margin: 0;
  display: flex;
`

const FeatureItem = styled.li`
  display: block;
  flex: 1 0;
  text-align: center;
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
          <Img sizes={feature.node.image.sizes} alt={feature.node.title}/>
        </ImageContainer>
        <h3>{feature.node.title}</h3>
        <p>{feature.node.content.content}</p>
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
