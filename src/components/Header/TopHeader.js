import React from 'react'
import styled from "styled-components"
import LanguageSwitcher from '../../components/Header/LanguageSwitcher'
import SocialNetworks from '../../components/Header/SocialNetworks'
import PhoneNumbers from '../../components/Header/PhoneNumbers'
import Wrapper from '../../components/Layout/Wrapper'

const OuterContainer = styled.div`
  background: ${props => props.theme.grayDarkest};
  padding: 5px 0;
  font-size: 13px;

  a {
    text-decoration:none;
  }
`

const InnerContainer = Wrapper.extend`
  display: flex;
`

export default (props) => (
  <OuterContainer>
    <InnerContainer>
      <LanguageSwitcher translation={props.translation} locale={props.locale}/>
      <SocialNetworks socialNetworks={props.socialNetworks}/>
      <PhoneNumbers phoneNumber={props.phoneNumbers.edges[0].node.number}/>
    </InnerContainer>
  </OuterContainer>
)
