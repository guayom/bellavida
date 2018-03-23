import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import Header from '../components/Header'
import Footer from '../components/Footer'
import '../layouts/index.css'
import styled from "styled-components"
import { ThemeProvider } from 'styled-components';
import Wrapper from '../components/Layout/Wrapper'
import BrandsBar from '../components/Brands/Home'

const MainContainer = styled.div`
  background: #fff;
  max-width: 1240px;
  margin: 0 auto;
`

const defaultTheme = {
  skyColor: '#37d8e6',
  grayMedium: '#777',
  grayDarkest: '#1d1919',
  grayLight: '#eee',
  mainColor: '#93c548',
  mainColorVariation: '#6a922e',
};

const TemplateWrapper = ({ data, children, layoutContext, location }) => (
  <ThemeProvider theme={defaultTheme}>
    <MainContainer>
      <Header
        products={data.allContentfulProduct}
        brands={data.allContentfulProductBrand}
        locale={layoutContext.locale}
        phoneNumbers={data.allContentfulPhoneNumbers}
        socialNetworks={data.allContentfulSocialNetwork}
        translation={data.allSitePage.edges.filter(p => p.node.path === location.pathname).length > 0 ? data.allSitePage.edges.filter(p => p.node.path === location.pathname)[0].node.context.translation : "/"}
      />
      {children()}
      <BrandsBar brands={data.allContentfulProductBrand.edges} />
      <Footer
        phoneNumbers={data.allContentfulPhoneNumbers}
        socialNetworks={data.allContentfulSocialNetwork}
        translation={data.allSitePage.edges.filter(p => p.node.path === location.pathname).length > 0 ? data.allSitePage.edges.filter(p => p.node.path === location.pathname)[0].node.context.translation : "/"}
        locale={layoutContext.locale}
        brands={data.allContentfulProductBrand.edges.sort((a, b) => a.node.order - b.node.order)}
        products={data.allContentfulProduct.edges}
      />
    </MainContainer>
  </ThemeProvider>
)

TemplateWrapper.propTypes = {
  children: PropTypes.func,
}

export default TemplateWrapper

export const pageQuery = graphql`
  query menuQuery($locale: String!) {
    allContentfulProduct(filter: { node_locale: { eq: $locale } }) {
      edges {
        node {
          id
          title
          slug
          node_locale
        }
      }
    }
    allContentfulProductBrand(filter: { node_locale: { eq: $locale } }) {
      edges {
        node {
          id
          title
          website
          slug
          size
          order
          logo {
            sizes {
              base64
              aspectRatio
              src
              srcSet
              srcWebp
              srcSetWebp
              sizes
            }
          }
        }
      }
    }
    allContentfulPhoneNumbers(filter: { node_locale: { eq: $locale } }) {
      edges {
        node {
          number
          id
        }
      }
    }
    allContentfulSocialNetwork(filter: { node_locale: { eq: $locale } }) {
      edges {
        node {
          title
          url
          id
        }
      }
    }
    allSitePage {
      edges {
        node {
          id
          path
          context {
            id
            translation
          }
        }
      }
    }
  }
`
