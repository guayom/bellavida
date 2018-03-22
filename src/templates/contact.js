import React from "react"
import * as PropTypes from "prop-types"
import Helmet from 'react-helmet'
import Wrapper from '../components/Layout/Wrapper'
import styled from 'styled-components'

const propTypes = {
  data: PropTypes.object.isRequired,
}

const Label = styled.label`
  display: block;
`

const Input = styled.input`
  border: solid 1px #ddd;
  padding: 5px;
  margin-bottom: 20px;
  display: block;
`

const Textarea = styled.textarea`
  border: solid 1px #ddd;
  padding: 5px;
  margin-bottom: 20px;
  display: block;
`
class SinglePageTemplate extends React.Component {
  render() {
    const page = this.props.pathContext
    return (
      <div>
        <Helmet
          title={page.pageTitle}
          meta={[
            { name: 'description', content: 'Sample' },
            { name: 'keywords', content: 'sample, something' },
          ]}
        />
        <Wrapper>
          <h1>{page.pageTitle}</h1>
          <form name="contact" method="post" data-netlify="true" data-netlify-honeypot="bot-field" action={page.locale === "en" ? "/en/thank-you" : "/es/gracias"}>
            <p style={{display: `none`}}>
              <input type="hidden" name="form-name" value="contact" />
              <input name="bot-field" />
            </p>

            <Label for="name">{page.locale === "en" ? "Name" : "Nombre"}</Label>
            <Input type="text" name="name" id="name" />

            <Label for="email">Email</Label>
            <Input type="email" name="email" id="email" />

            <Label for="message">{page.locale === "en" ? "Message" : "Mensaje"}</Label>
            <Textarea id="message" name="message"></Textarea>

            <button type="submit">{page.locale === "en" ? "Send" : "Enviar"}</button>
          </form>
        </Wrapper>
      </div>
    )
  }
}

SinglePageTemplate.propTypes = propTypes

export default SinglePageTemplate
