import React from "react"
import * as PropTypes from "prop-types"
import Helmet from 'react-helmet'
import Wrapper from '../components/Layout/Wrapper'
import styled from 'styled-components'

const propTypes = {
  data: PropTypes.object.isRequired,
}

const Form = styled.form`
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
        <Wrapper>
          <h1>{page.pageTitle}</h1>
          <p>
            {locale === "en" ? "Every field is mandatory" : "Todos los campos son requeridos"}
          </p>
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
        </Wrapper>
      </div>
    )
  }
}

SinglePageTemplate.propTypes = propTypes

export default SinglePageTemplate
