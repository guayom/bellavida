import React from 'react'
import styled from 'styled-components'
import breakpoint from 'styled-components-breakpoint'
import Wrapper from '../../components/Layout/Wrapper'
import Img from 'gatsby-image'

const Container =  styled.div`
  background: ${props => props.theme.mainColor};
  color: #fff;
  margin: 2rem 0 0;
  padding: 2rem 0;

  ${breakpoint('tablet') `
    padding: 2rem;
  `}
`

const GridWrapper = Wrapper.extend`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-column-gap: 30px;
  align-content: center;
  align-items: center;
  justify-content: center;
  text-align: center;

  ${breakpoint('tablet')`
    grid-template-columns: repeat(16, 1fr);
    grid-column-gap: 60px;
  `}
`

const Link = styled.a`
  display: block;
  padding: 10px;
  border-radius: 5px;
  &:hover {
    background: ${props => props.theme.mainColorVariation};
  }
`

const Brand = styled.div`
  grid-column: span ${props => props.size};
`

export default ({brands}) => (
  <Container>
    <GridWrapper quantity={brands.length}>
      {brands.map(brand => (
        <Brand key={brand.node.id} size={brand.node.size}>
          <Link href={brand.node.website} target="_blank" rel="noopener noreferrer">
            <Img fluid={brand.node.logo.fluid} alt={brand.node.title} />
          </Link>
        </Brand>
      ))}
    </GridWrapper>
  </Container>
)