import React from 'react'
import styled from 'styled-components'
import Wrapper from '../../components/Layout/Wrapper'
import Img from 'gatsby-image'

const Container =  styled.div`
  background: ${props => props.theme.mainColor};
  color: #fff;
  margin: 2rem 0 0;
  padding: 2rem 0;
`

const GridWrapper = Wrapper.extend`
  display: grid;
  grid-template-columns: 1fr 1fr 2fr 2fr .5fr;
  grid-column-gap: 60px;
  align-content: center;
  align-items: center;
  justify-content: center;
  text-align: center;
`

export default ({brands}) => (
  <Container>
    <GridWrapper quantity={brands.length}>
      {brands.map(brand => (
        <div key={brand.node.id}>
          <a href={brand.node.website} target="_blank" rel="noopener noreferrer">
            <Img sizes={brand.node.logo.sizes} alt={brand.node.title} />
          </a>
        </div>
      ))}
    </GridWrapper>
  </Container>
)