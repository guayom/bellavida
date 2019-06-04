import React from 'react'
import styled from 'styled-components'
import breakpoint from 'styled-components-breakpoint'
import Img from 'gatsby-image'

const Container = styled.div`
  position: relative;
  margin-bottom: 40px;
  z-index: 1;
  position: relative;

  &:after {
    display: ${props => props.brand ? "none" : "block"};
    content: "";
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.6);
    z-index: 2;
    position: absolute;
    top: 0;
    left: 0;
  }
`

const TitleContainer = styled.h1`
  position: absolute;
  display: block;
  width: 100%;
  text-align: center;
  color: #fff;
  z-index: 3;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;

  h1 {
    font-size: 20px;
    ${breakpoint('tablet') `
      font-size: 35px;
    `}
  }
`

function ShowHero(image, title, brand) {
  if (image) {
    return <Img fluid={image.fluid} alt="title" title="title" />
  } else {
    return null
  }
}

function ShowTitle(title, brand) {
  if (!brand) {
    return (
      <TitleContainer>
        {title}
      </TitleContainer>
    )
  } else {
    return null
  }
}

export default ({title, image, brand}) => (
  <Container brand={brand}>
    {ShowHero(image, title)}
    {ShowTitle(title, brand)}
  </Container>
)