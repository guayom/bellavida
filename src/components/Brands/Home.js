import React from "react"
import { StaticQuery, graphql } from "gatsby"
import styled from "styled-components"
import breakpoint from "styled-components-breakpoint"
import Wrapper from "../../components/Layout/Wrapper"
import Img from "gatsby-image"

const Title = styled.div`
  text-align: center;
  font-size: 2em;
  background: ${props => props.theme.mainColor};
  padding: 40px 20px;
  margin: 2rem 0 0;
  color: #fff;
`

const Container = styled.div`
  padding: 2rem 0;

  ${breakpoint("tablet")`
    padding: 2rem;
  `}
`

const GridWrapper = styled(Wrapper)`
  display: grid;
  grid-template-columns: repeat(${props => props.quantity + 1}, 1fr);
  grid-column-gap: 30px;
  align-content: center;
  align-items: center;
  justify-content: center;
  text-align: center;

  ${breakpoint("tablet")`
    grid-column-gap: 60px;
  `}
`

const Link = styled.a`
  display: block;
  padding: 10px;
  border-radius: 5px;
  transition: transform .5s ease;

  &:hover {
    transform: translateY(-2px);
  }
`

const Brand = styled.div`
  grid-column: span ${props => props.size};
`

export default ({ locale }) => (
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
        <>
          <Title>{locale === "en" ? "Our brands" : "Nuestras marcas"}</Title>
          <Container>
            <GridWrapper quantity={brands.length}>
              {brands.map(brand => (
                <Brand
                  key={brand.node.id}
                  size={brand.node.size}
                  className="brandLink"
                >
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
        </>
      )
    }}
  />
)
