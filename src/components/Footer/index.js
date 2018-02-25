import React from 'react'
import styled from 'styled-components'
import Wrapper from '../../components/Layout/Wrapper'
import PhoneNumber from '../../components/General/PhoneNumber'
import logo from '../../images/logo-blanco.png'
import FaEnvelope from 'react-icons/lib/fa/envelope'

const Footer = styled.footer`
  background: ${props => props.theme.grayDarkest};
  padding: 60px 0;
  color: ${props => props.theme.grayMedium};
  font-size: 13px;

  a {
    color: ${props => props.theme.grayMedium};
    text-decoration:none;

     &:hover {
       color: ${props => props.theme.mainColor};
     }
  }
`

const FooterWrapper = Wrapper.extend`
  display: flex;
`

const Column =  styled.div`
  flex-grow: ${props => props.first ? '2' : '1'};
  flex-basis: 0;
  border-right: ${props => props.first ? `1px solid ${props.theme.grayMedium}` : 'none'};
  padding-left: ${props => props.first ? '0' : '40px'};
  padding-right: 40px;
`

const Title = styled.h3`
  color: #fff;
  font-size: 13px;
`

export default ({phoneNumbers}) => (
  <Footer>
    <FooterWrapper>
      <Column first>
        <img src={logo} alt="Bella Vida Costa Rica" />
        {phoneNumbers.edges.map((number, i) => (
          <p><PhoneNumber phoneNumber={number.node.number} /></p>
        ))}
        <p>
          <FaEnvelope /> Link to contact form
        </p>
        <p>
          Copyright © {(new Date()).getFullYear()} Bella Vida Costa Rica. All Rights Reserved.
        </p>
      </Column>
      <Column>
        <Title>Quick Access</Title>
      </Column>
      <Column>
        <Title>Our Products</Title>
      </Column>
      <Column>
        <Title>Our Brands</Title>
      </Column>
      <Column>
        <Title>Get Our Newsletter</Title>
      </Column>
    </FooterWrapper>
  </Footer>
)
