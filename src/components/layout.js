import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import Header from "../components/Header"
import Footer from "../components/Footer"
import "./main.css"
import styled, { ThemeProvider } from "styled-components"
import BrandsBar from "../components/Brands/Home"
import ContactButton from '../components/General/ContactButton'

const MainContainer = styled.div`
  background: #fff;
  max-width: 1240px;
  margin: 0 auto;
  position: relative;
`

const defaultTheme = {
  skyColor: "#37d8e6",
  grayMedium: "#777",
  grayDarkest: "#1d1919",
  grayLight: "#eee",
  mainColor: "#93c548",
  mainColorVariation: "#6a922e",
}

const TemplateWrapper = ({ children, locale, translation }) => (
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
      <Header locale={locale} translation={translation} />
      {children}
      <BrandsBar locale={locale} />
      <Footer translation={translation} locale={locale} />
      <ContactButton locale={locale} />
    </MainContainer>
  </ThemeProvider>
)

TemplateWrapper.propTypes = {
  children: PropTypes.array,
}

export default TemplateWrapper
