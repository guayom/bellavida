import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import Header from '../components/Header'
import Footer from '../components/Footer'
import '../layouts/index.css'
import styled from "styled-components"
import { ThemeProvider } from 'styled-components';

const MainContainer = styled.div`
  background: #fff;
  max-width: 90%;
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

const TemplateWrapper = ({ data, children, layoutContext }) => (
  <ThemeProvider theme={defaultTheme}>
    <MainContainer>
      <Header
        products={data.allContentfulProduct}
        brands={data.allContentfulProductBrand}
        locale={layoutContext.locale}
        phoneNumbers={data.allContentfulPhoneNumbers}
        socialNetworks={data.allContentfulSocialNetwork}
      />
      {children()}
      <Footer
        phoneNumbers={data.allContentfulPhoneNumbers}
        socialNetworks={data.allContentfulSocialNetwork}
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
    allContentfulProductBrand(filter: { node_locale: { eq: $locale } }){
      edges {
        node {
          id
          title
          slug
          node_locale
        }
      }
    }
    allContentfulPhoneNumbers(filter: { node_locale: { eq: $locale } }) {
      edges {
        node {
          number
        }
      }
    }
    allContentfulSocialNetwork(filter: { node_locale: { eq: $locale } }) {
      edges {
        node {
          title
          url
        }
      }
    }
  }
`
