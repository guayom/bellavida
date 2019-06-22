import React from 'react';
import styled from "styled-components"

const Form = styled.form`
  grid-area: main;
  display: ${props => props.full ? 'block': 'grid' };
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 30px;
  width: 100%;
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

export default ({locale, full = false}) => {
  return (
    <Form
      name="contact"
      method="post"
      data-netlify="true"
      data-netlify-honeypot="subject"
      action={locale === "en" ? "/en/thank-you" : "/es/gracias"}
      full={full}
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
  )
};