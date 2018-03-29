import React from "react"
import * as PropTypes from "prop-types"
import Helmet from 'react-helmet'
import Wrapper from '../components/Layout/Wrapper'
import SidebarSection from '../components/Sidebar/Section'
import PhoneNumber from '../components/General/PhoneNumber'
import LocationTabs from '../components/Location/Tabs'
import styled from 'styled-components'
import breakpoint from 'styled-components-breakpoint'
import FaFacebookOfficial from 'react-icons/lib/fa/facebook-official'

const propTypes = {
  data: PropTypes.object.isRequired,
}

const Grid = Wrapper.extend`
  display: grid;
  grid-template-columns: 1fr;
  grid-column-gap: 40px;
  grid-template-areas: 
    "title"
    "description"
    "main"
    "sidebar"
  ;

  ${breakpoint('tablet')`
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

class SinglePageTemplate extends React.Component {
  render() {
    const page = this.props.pathContext
    const locale = this.props.locale
    return (
      <div>
        <Helmet
          title={page.pageTitle}
        />
        <Grid>
          <Title>{page.pageTitle}</Title>
          <Description>
            {locale === "en" ? "Every field is mandatory" : "Todos los campos son requeridos"}
          </Description>
          <Sidebar>
            <SidebarSection title={locale === "en" ? "Contact information" : "Información de contacto"}>
              <h4>{locale === "en" ? "Phone numbers" : "Teléfonos"}:</h4>
              {this.props.data.allContentfulPhoneNumbers.edges.map((number, i) => (
                <p key={number.node.id}><PhoneNumber phoneNumber={number.node.number} /></p>
              ))}
              <h4>{locale === "en" ? "Social Networks" : "Redes Sociales"}:</h4>
              <a href="https://www.facebook.com/BellaVidaCostaRicaWindowsDoors" target="_blank" rel="noopener noreferrer">
                <FaFacebookOfficial /> Facebook
              </a>
            </SidebarSection>
            <SidebarSection title={locale === "en" ? "Visit our showrooms" : "Visítenos"}>
              {console.log(this.props.data.allContentfulShowRoom.edges)}
              <LocationTabs locations={this.props.data.allContentfulShowRoom.edges}/>
            </SidebarSection>
          </Sidebar>
          <Form name="contact" method="post" data-netlify="true" data-netlify-honeypot="bot-field" action={page.locale === "en" ? "/en/thank-you" : "/es/gracias"}>
            <p style={{display: `none`}}>
              <input type="hidden" name="form-name" value="contact" />
              <input name="bot-field" />
            </p>

            <div>
              <Label for="name">{page.locale === "en" ? "Name" : "Nombre"}</Label>
              <Input type="text" name="name" id="name" />
            </div>

            <div>
              <Label for="email">Email</Label>
              <Input type="email" name="email" id="email" />
            </div>

            <Full>
              <Label for="message">{page.locale === "en" ? "Message" : "Mensaje"}</Label>
              <Textarea id="message" name="message"></Textarea>
            </Full>

            <div>
              <button 
                style={{
                  display: `inline-block`,
                  padding: '8px 20px',
                  background: '#93c548',
                  fontSize: '14px',
                  lineHeight: '14px',
                  color: '#fff',
                  textDecoration: `none`,
                  borderRadius: `4px`,
                  border: 0,
                }}
                type="submit">
                  {page.locale === "en" ? "Send" : "Enviar"}
                </button>
            </div>
          </Form>
        </Grid>
      </div>
    )
  }
}

SinglePageTemplate.propTypes = propTypes

export default SinglePageTemplate

export const contactQuery = graphql`
  query contactQuery($locale: String!) {
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
    allContentfulShowRoom(filter: { node_locale: { eq: $locale } }) {
      edges {
        node {
          title
          address {
            childMarkdownRemark {
              html
            }
          }
          location {
            lon
            lat
          }
        }
      }
    }
  }
`
