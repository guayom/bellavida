import React from 'react'
import styled from "styled-components"
import LanguageSwitcher from '../../components/Header/LanguageSwitcher'
import SocialNetworks from '../../components/Header/SocialNetworks'
import PhoneNumbers from '../../components/Header/PhoneNumbers'
import Wrapper from '../../components/Layout/Wrapper'

const Container = styled.div`
  background: #000;
  color: ${props => props.theme.skyColor}
`

export default (props) => (
  <Container>
    <Wrapper>
      <LanguageSwitcher />
      <SocialNetworks />
      <PhoneNumbers />
    </Wrapper>
  </Container>
)
