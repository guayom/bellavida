import React from 'react'
import styled from 'styled-components'
import Link from 'gatsby-link'
import Img from 'gatsby-image'

const Container = styled.div`
  a:hover {
    text-decoration: none;
  }
  a:hover > h3 {
    color: ${props => props.theme.mainColor};
    text-decortion: none;
  }
`

const Title = styled.h3`
  font-size: 20px;
  color: ${props => props.theme.grayMedium};
`

const ImageContainer = styled.div`
  margin-bottom: 10px;
`

const ItemImage = ({ title, slug, image, path }) => (
  <Container>
    <Link to={path + "/" + slug}>
      <ImageContainer>
        <Img
          fluid={image}
          alt={title}
          style={{ width: "auto", height: "150px" }}
        />
      </ImageContainer>
      <Title>{title}</Title>
    </Link>
  </Container>
)

export default ItemImage