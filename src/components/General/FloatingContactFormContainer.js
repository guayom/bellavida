import React from 'react';
import styled from "styled-components"
import ContactForm from "./ContactForm"

const Container = styled.div`
  position: fixed;
  right: 2vh;
  bottom: 15vh;
  z-index: 12;
  background: #fff;
  padding: 20px;
  width: 80vw;
  max-width: 400px;
  height: auto;
  max-height: 90vh;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);

  @media screen and (min-width: 700px) {
    right: 3vw;
    bottom: 15vh;
  }
`

export default ({locale}) => {
  return (
    <Container>
      <h3>
        {locale === "en"
          ? "Interested in any of our products?"
          : "¿Interesado en algún producto?"}
      </h3>
      <p>
        {locale === "en"
          ? "Send us a message and we will get back to you as soon as possible"
          : "Escríbanos y nos pondremos en contacto de inmediato"}
      </p>
      <ContactForm locale={locale} full />
    </Container>
  )
};