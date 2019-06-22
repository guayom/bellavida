import React from "react"
import Helmet from "react-helmet"
import Wrapper from "../components/Layout/Wrapper"
import SidebarSection from "../components/Sidebar/Section"
import PhoneNumbers from "../components/General/PhoneNumbers"
import LocationTabs from "../components/Location/Tabs"
import styled from "styled-components"
import breakpoint from "styled-components-breakpoint"
import { FaFacebookF } from "react-icons/fa"
import Layout from "../components/layout"
import ContactForm from "../components/General/ContactForm"

const Grid = styled(Wrapper)`
  display: grid;
  grid-template-columns: 1fr;
  grid-column-gap: 40px;
  grid-template-areas:
    "title"
    "description"
    "main"
    "sidebar";

  ${breakpoint("tablet")`
    grid-template-columns: 1fr 4fr;
    grid-template-areas: 
      "sidebar title"
      "sidebar description"
      "sidebar main"
    ;
  `}
`

const Title = styled.h1`
  grid-area: title;
`

const Description = styled.p`
  grid-area: description;
`

const Sidebar = styled.div`
  grid-area: sidebar;
  ${breakpoint("tablet")`
    grid-row: 1 / span 6;
  `}
`

const SinglePageTemplate = ({ pageContext }) => {
  const locale = pageContext.locale
  const title = locale === "en" ? "Contact us" : "Contáctenos"
  return (
    <Layout {...pageContext}>
      <Helmet title={title} />
      <Grid>
        <Title>{title}</Title>
        <Description>
          {pageContext.locale === "en"
            ? "Every field is mandatory"
            : "Todos los campos son requeridos"}
        </Description>
        <Sidebar>
          <SidebarSection
            title={
              locale === "en"
                ? "Contact information"
                : "Información de contacto"
            }
          >
            <h4>{locale === "en" ? "Phone numbers" : "Teléfonos"}:</h4>
            <PhoneNumbers />
            <h4>{locale === "en" ? "Social Networks" : "Redes Sociales"}:</h4>
            <a
              href="https://www.facebook.com/BellaVidaCostaRicaWindowsDoors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookF /> Facebook
            </a>
          </SidebarSection>
          <SidebarSection
            title={locale === "en" ? "Visit our showrooms" : "Visítenos"}
          >
            <LocationTabs locale={locale}/>
          </SidebarSection>
        </Sidebar>
        <ContactForm />
      </Grid>
    </Layout>
  )
}

export default SinglePageTemplate
