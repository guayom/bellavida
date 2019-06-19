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

const Form = styled.form`
  grid-area: main;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 30px;
`

const Label = styled.label`
  display: block;
`

const Input = styled.input`
  border: solid 1px #ddd;
  padding: 5px;
  margin-bottom: 20px;
  display: block;
  width: 100%;
`

const Textarea = styled.textarea`
  border: solid 1px #ddd;
  padding: 5px;
  margin-bottom: 20px;
  display: block;
  width: 100%;
`

const Full = styled.div`
  grid-column: span 2;
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
        <Form
          name="contact"
          method="post"
          data-netlify="true"
          data-netlify-honeypot="subject"
          action={locale === "en" ? "/en/thank-you" : "/es/gracias"}
        >
          <p style={{ display: `none` }}>
            <input type="hidden" name="form-name" value="contact" />
            <input name="subject" />
          </p>

          <div>
            <Label htmlFor="name">{locale === "en" ? "Name" : "Nombre"}</Label>
            <Input type="text" name="name" id="name" />
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input type="email" name="email" id="email" />
          </div>

          <Full>
            <Label htmlFor="message">
              {locale === "en" ? "Message" : "Mensaje"}
            </Label>
            <Textarea id="message" name="message" />
          </Full>

          <div>
            <button
              style={{
                display: `inline-block`,
                padding: "8px 20px",
                background: "#93c548",
                fontSize: "14px",
                lineHeight: "14px",
                color: "#fff",
                textDecoration: `none`,
                borderRadius: `4px`,
                border: 0,
              }}
              type="submit"
            >
              {locale === "en" ? "Send" : "Enviar"}
            </button>
          </div>
        </Form>
      </Grid>
    </Layout>
  )
}

export default SinglePageTemplate
