import React from 'react'
import { StaticQuery, graphql } from "gatsby"
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

const GridWrapper = styled(Wrapper)`
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

export default ({locale}) => (
  <StaticQuery
    query={graphql`
      query BrandsQuery {
        brands: allContentfulProductBrand {
          edges {
            node {
              id
              title
              slug
              order
              node_locale
              size
              website
              logo {
                fluid {
                  ...GatsbyContentfulFluid
                }
              }
            }
          }
        }
      }
    `}
    render={data => {
      const brands = data.brands.edges.filter(
        brand => brand.node.node_locale === locale
      )
      return (
        <Container>
          <GridWrapper quantity={brands.length}>
            {brands
              .map(brand => (
                <Brand key={brand.node.id} size={brand.node.size}>
                  <Link
                    href={brand.node.website}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Img fluid={brand.node.logo.fluid} alt={brand.node.title} />
                  </Link>
                </Brand>
              ))}
          </GridWrapper>
        </Container>
      )}}
  />
)