import React from 'react'
import styled from 'styled-components'
import Wrapper from '../../components/Layout/Wrapper'
import PhoneNumber from '../../components/General/PhoneNumber'
import SocialNetworks from '../../components/Header/SocialNetworks'
import LanguageSwitcher from '../../components/Header/LanguageSwitcher'
import logo from '../../images/logo-blanco.png'
import FaEnvelope from 'react-icons/lib/fa/envelope'
import Link from 'gatsby-link'

const Footer = styled.footer`
  background: ${props => props.theme.grayDarkest};
  padding: 60px 0;
  color: ${props => props.theme.grayMedium};
  font-size: 13px;
  margin-top: 0;
  margin-bottom: 40px;

  a {
    text-decoration:none;
  }
`

const FooterWrapper = Wrapper.extend`
  display: flex;
  border-top: ${props => props.subfooter ? `solid 1px rgba(255,255,255,0.05)` : 'none'};
  margin-top: ${props => props.subfooter ? `40px` : '0'};
  padding-top: ${props => props.subfooter ? `20px` : '0'};

`

const Column =  styled.div`
  flex-grow: ${props => props.first ? '2' : '1'};
  flex-basis: 0;
  border-right: ${props => props.first ? `1px solid rgba(255,255,255,0.05)` : 'none'};
  padding-left: ${props => props.first ? '0' : '40px'};
  padding-right: 40px;
`

const Title = styled.h3`
  color: #fff;
  font-size: 13px;
`

const Menu = ({items, suffix}) => (
  <ul>
    {items.map(item => (
      <li key={item.node.id}>
        <Link to={`/${suffix}/${item.node.slug}`}>
          {item.node.title}
        </Link>
      </li>
    ))}
  </ul>
)

export default ({phoneNumbers, socialNetworks, translation, locale, brands}) => (
  <Footer>
    <FooterWrapper>
      <Column first>
        <img src={logo} alt="Bella Vida Costa Rica" />
        {phoneNumbers.edges.map((number, i) => (
          <p key={number.node.id}><PhoneNumber phoneNumber={number.node.number} /></p>
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
        <Menu items={brands} suffix={`${locale}/${locale === "en" ? "brands" : "marcas"}`} />
      </Column>
      <Column>
        <Title>Get Our Newsletter</Title>
      </Column>
    </FooterWrapper>
    <FooterWrapper subfooter>
      <LanguageSwitcher translation={translation}/>
      <SocialNetworks socialNetworks={socialNetworks}/>
    </FooterWrapper>
  </Footer>
)
