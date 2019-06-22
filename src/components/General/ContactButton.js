import React, { useState } from "react"
import styled from "styled-components"
import { FaEnvelope } from "react-icons/fa"
import ContactForm from "./FloatingContactFormContainer"
import { CSSTransition } from "react-transition-group"

const Modal = styled.div`
  background: rgba(0, 0, 0, 0.8);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
  pointer-events: ${props => props.active ? "default" : "none"};
`

const Button = styled.div`
  position: fixed;
  right: 3vw;
  bottom: 5vh;
  z-index: 11;
  background: ${props => props.theme.mainColor};
  padding: 5px;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.5);
  color: #fff;
  cursor: pointer;
  transition: color 0.3s ease, transform 0.3s ease;
  font-size: 30px;

  @media screen and (min-width: 700px) {
    right: 3vw;
    bottom: 3vh;
  }

  &:hover {
    background: ${props => props.theme.mainColorVariation};
    transform: translateY(-2px);
  }
`

export default ({ locale }) => {
  const [active, setActive] = useState(false)
  return (
    <>
      <CSSTransition in={active} timeout={200} classNames="fade" unmountOnExit>
          <Modal active={active} onClick={() => setActive(false)} />
      </CSSTransition>
      <CSSTransition in={active} timeout={200} classNames="fade" unmountOnExit>
          <ContactForm locale={locale} />
      </CSSTransition>
      <Button onClick={() => setActive(true)}>
        <FaEnvelope />
      </Button>
    </>
  )
}
