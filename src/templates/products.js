import React from "react"
import Helmet from "react-helmet"
import Wrapper from "../components/Layout/Wrapper"
import styled from "styled-components"
import breakpoint from "styled-components-breakpoint"
import ItemImage from "../components/General/ItemImage"
import Layout from "../components/layout"
import { graphql } from "gatsby"
import DownloadFileButton from "../components/General/DownloadFileButton"

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

const AllProductsPageTemplate = ({ data: {products, brochure}, pageContext }) => {
  const localizedData = {
    en: {path: "/en/products/", title: "Products"},
    es: {path: "/es/productos/", title: "Productos"}
  }
  const title = localizedData[pageContext.locale].title

  return (
    <Layout {...pageContext}>
      <Helmet title={title} />
      <Wrapper>
        <h1>{title}</h1>
        <Grid>
          {products.edges.map(({ node: page }) => (
            <ItemImage
              key={page.id}
              title={page.title}
              slug={page.slug}
              image={page.image.fluid}
              path={localizedData[pageContext.locale].path}
            />
          ))}
        </Grid>
        <DownloadFileButton title={brochure.title} url={brochure.file.url} />
      </Wrapper>
    </Layout>
  )
}

export default AllProductsPageTemplate

export const productsQuery = graphql`
  query productsQuery($locale: String!) {
    products: allContentfulProduct(filter: { node_locale: { eq: $locale } }) {
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
    brochure: contentfulAsset(contentful_id: {eq: "qJhVbONXYV0Tlj2fEiTyv"}, node_locale: {eq: $locale}) {
      file {
        url
      }
      title
      description
    }
  }
`
