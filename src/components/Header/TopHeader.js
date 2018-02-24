import React from 'react'
import styled from "styled-components"
import LanguageSwitcher from '../../components/Header/LanguageSwitcher'
import SocialNetworks from '../../components/Header/SocialNetworks'
import PhoneNumbers from '../../components/Header/PhoneNumbers'
import Wrapper from '../../components/Layout/Wrapper'

const OuterContainer = styled.div`
  background: #000;
  color: ${props => props.theme.grisMedio};
  padding: 5px 0;
  font-size: 13px;
`

const InnerContainer = Wrapper.extend`
  display: flex;
`

export default (props) => (
  <OuterContainer>
    <InnerContainer>
      <LanguageSwitcher />
      <SocialNetworks />
      <PhoneNumbers />
    </InnerContainer>
  </OuterContainer>
)
