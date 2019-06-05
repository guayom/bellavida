import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import Header from "../components/Header"
import Footer from "../components/Footer"
import "./main.css"
import styled, { ThemeProvider } from "styled-components"
import BrandsBar from "../components/Brands/Home"

const MainContainer = styled.div`
  background: #fff;
  max-width: 1240px;
  margin: 0 auto;
`

const defaultTheme = {
  skyColor: "#37d8e6",
  grayMedium: "#777",
  grayDarkest: "#1d1919",
  grayLight: "#eee",
  mainColor: "#93c548",
  mainColorVariation: "#6a922e",
}

const TemplateWrapper = ({ children, data, locale, translation }) => (
  <ThemeProvider theme={defaultTheme}>
    <MainContainer>
      <Helmet
        title="Bella Vida Costa Rica"
        meta={[
          {
            name: "description",
            content:
              "Bella Vida Costa Rica provides a variety of world class products and services to architects, developers, builders, designers and home owners.",
          },
          {
            name: "keywords",
            content:
              "Pella, Toto, Fleetwood, Amarr, La cantina doors, Doors, Windows, Folding Doors, Sliding Doors",
          },
        ]}
      />
      <Header
        products={data.allContentfulProduct}
        brands={data.allContentfulProductBrand}
        locale={locale}
        phoneNumbers={data.allContentfulPhoneNumbers}
        socialNetworks={data.allContentfulSocialNetwork}
        translation={translation}
      />
      {children}
      <BrandsBar brands={data.allContentfulProductBrand.edges} />
      <Footer
        phoneNumbers={data.allContentfulPhoneNumbers}
        socialNetworks={data.allContentfulSocialNetwork}
        translation={translation}
        locale={locale}
        brands={data.allContentfulProductBrand.edges.sort(
          (a, b) => a.node.order - b.node.order
        )}
        products={data.allContentfulProduct.edges}
      />
    </MainContainer>
  </ThemeProvider>
)

TemplateWrapper.propTypes = {
  children: PropTypes.array,
}

export default TemplateWrapper
