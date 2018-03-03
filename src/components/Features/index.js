import React from "react"
import styled from 'styled-components'

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
  margin: 0 0 20px;
`

class Features extends React.Component {
  render() {
    const featureItems = this.props.items.map((feature, index) =>
      <FeatureItem key={feature.node.id}>
        <ImageContainer>
          <img src={feature.node.image.resolutions.src} alt={feature.node.title}/>
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
