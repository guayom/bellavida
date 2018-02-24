import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import Header from '../components/Header'
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
  grisMedio: '#777',
};

const TemplateWrapper = ({ data, children, layoutContext }) => (
  <ThemeProvider theme={defaultTheme}>
    <MainContainer>
      <Header products={data.allContentfulProduct} brands={data.allContentfulProductBrand} locale={layoutContext.locale}/>
      {children()}
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
  }
`
