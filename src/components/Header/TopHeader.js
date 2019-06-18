import React from 'react'
import styled from "styled-components"
import LanguageSwitcher from '../../components/Header/LanguageSwitcher'
import SocialNetworks from '../../components/Header/SocialNetworks'
import PhoneNumbers from '../../components/General/PhoneNumbers'
import Wrapper from '../../components/Layout/Wrapper'

const OuterContainer = styled.div`
  background: ${props => props.theme.grayDarkest};
  padding: 8px 0;
  font-size: 13px;

  a {
    text-decoration:none;
  }
`

const InnerContainer = styled(Wrapper)`
  display: flex;
`

export default (props) => (
  <OuterContainer>
    <InnerContainer>
      <LanguageSwitcher {...props}/>
      <SocialNetworks {...props}/>
      <PhoneNumbers header/>
    </InnerContainer>
  </OuterContainer>
)
