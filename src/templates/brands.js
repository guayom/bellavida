import React from "react"
import Helmet from "react-helmet"
import Wrapper from "../components/Layout/Wrapper"
import styled from "styled-components"
import breakpoint from "styled-components-breakpoint"
import ItemImage from "../components/General/ItemImage"
import Layout from "../components/layout"
import { graphql } from "gatsby"

const Grid = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 20px;
  grid-row-gap: 20px;
  list-style: none;
  margin: 0;
  padding: 0;

  ${breakpoint("tablet")`
    grid-template-columns: repeat(3, 1fr);
  `}
`

const AllBrandsPageTemplate = ({ data: { brands }, pageContext }) => {
  const localizedData = {
    en: { path: "/en/brands/", title: "Brands" },
    es: { path: "/es/marcas/", title: "Marcas" },
  }
  const title = localizedData[pageContext.locale].title

  return (
    <Layout {...pageContext}>
      <Helmet title={title} />
      <Wrapper>
        <h1>{title}</h1>
        <Grid>
          {brands.edges.map(({ node: page }) => (
            <ItemImage
              key={page.id}
              title={page.title}
              slug={page.slug}
              image={page.image.fluid}
              path={localizedData[pageContext.locale].path}
            />
          ))}
        </Grid>
      </Wrapper>
    </Layout>
  )
}

export default AllBrandsPageTemplate

export const brandsQuery = graphql`
  query brandsQuery($locale: String!) {
    brands: allContentfulProductBrand(filter: { node_locale: { eq: $locale } }) {
      edges {
        node {
          id
          slug
          title
          node_locale
          description {
            childMarkdownRemark {
              html
            }
          }
          image {
            fluid {
              ...GatsbyContentfulFluid
            }
          }
        }
      }
    }
  }
`
