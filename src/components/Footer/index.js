import React from 'react'
import styled from 'styled-components'
import breakpoint from 'styled-components-breakpoint'
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

  a {
    text-decoration:none;
  }

  ${breakpoint('tablet')`
    margin-bottom: 40px;
  `}
`

const FooterWrapper = Wrapper.extend`

  ${breakpoint('tablet') `
    display: flex;
    border-top: ${props => props.subfooter ? `solid 1px rgba(255,255,255,0.05)` : 'none'};
    margin-top: ${props => props.subfooter ? `40px` : '0'};
    padding-top: ${props => props.subfooter ? `20px` : '0'};
  `}
`

const Column =  styled.div`
  margin-bottom: 30px;
  ${breakpoint('tablet')`
    flex-grow: ${props => props.first ? '1.5' : '1'};
    flex-basis: 0;
    border-right: ${props => props.first ? `1px solid rgba(255,255,255,0.05)` : 'none'};
    padding-left: ${props => props.first ? '0' : '40px'};
    padding-right: ${props => props.first ? '40px' : '0'};
    margin-bottom: 0;
  `}
`

const Title = styled.h3`
  color: #fff;
  font-size: 13px;
  margin-bottom: 10px;

  ${breakpoint('tablet')`
    margin-bottom: 20px;
  `}
`

const Input = styled.input`
  background: #000000;
  border-width: 1px;
  border-style: solid;
  border-color: #000000;
  font-size: 11px;
  box-shadow: none;
  border-radius: 2px;
  height: 34px;
  padding: 6px 12px;
  display: block;
  line-height: 20px;
  color: #555555;
  transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
  cursor: text;
  margin-bottom: 10px;

  &:hover, &:focus {
    border-color: ${props => props.theme.mainColor};
    outline: none;
  }
`

const Button = styled.button`
  background: #000000;
  border-color: #000000;
  font-size: 11px;
  padding: 7px 12px;
  transition: all 0.2s;
  -webkit-appearance: button;
  cursor: pointer;
  color: #ffffff;
  display: inline-block;
  margin-bottom: 0;
  font-weight: normal;
  text-align: center;
  vertical-align: middle;
  border: 1px solid transparent;
  white-space: nowrap;
  line-height: 20px;
  border-radius: 4px;
  user-select: none;

  &:hover {
    background: ${props => props.theme.mainColor};
  }
`

const Menu = ({items, prefix}) => (
  <ul style={{listStyle: `none`, padding: 0, margin: 0}}>
    {items.map(item => (
      <li 
        key={item.node.id}
        style={{
          margin: 0,
          padding: 0,
        }}>
        <Link 
          to={`${prefix}${item.node.slug}`}
          style={{
            fontSize: `11px`,
            color: `#595959`,
            padding: `4px 0`,
            display: `block`,
          }}
          activeStyle={{
            color: '#93c548'
          }}
          >
          {item.node.title}
        </Link>
      </li>
    ))}
  </ul>
)

// This could be done in contentful
const QuickAcessLinks = [
  { en: { node: { id: 1, slug: "/", title: "Home" } }, es: { node: { id: 1, slug: "/es/", title: "Inicio" } }},
  { en: { node: { id: 2, slug: "/en/products/", title: "Products" } }, es: { node: { id: 2, slug: "/es/productos/", title: "Productos" } }},
  { en: { node: { id: 3, slug: "/en/company/", title: "Company" } }, es: { node: { id: 3, slug: "/es/acerca-de-nosotros/", title: "Compañía" } }},
  { en: { node: { id: 4, slug: "/en/service-center/", title: "Service center" } }, es: { node: { id: 4, slug: "/es/centro-de-servicio/", title: "Centro de servicio" } }},
  { en: { node: { id: 5, slug: "/en/environment/", title: "Environment" } }, es: { node: { id: 5, slug: "/es/medio-ambiente/", title: "Medio ambiente" } }},
  { en: { node: { id: 6, slug: "/en/projects/", title: "Projects" } }, es: { node: { id: 6, slug: "/es/proyectos/", title: "Proyectos" } }},
  { en: { node: { id: 7, slug: "/en/contact-us/", title: "Contact us" } }, es: { node: { id: 7, slug: "/es/contacto/", title: "Contacto" } }},
  { en: { node: { id: 8, slug: "/en/sitemap/", title: "Sitemap" } }, es: { node: { id: 8, slug: "/es/mapa-de-sitio/", title: "Mapa de sitio" } }},
]

export default ({ phoneNumbers, socialNetworks, translation, locale, brands, products}) => (
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
        <Menu items={QuickAcessLinks.map(i => i[locale])} prefix="" />
      </Column>
      <Column>
        <Title>Our Products</Title>
        <Menu items={products} prefix={`/${locale}/${locale === "en" ? "products" : "productos"}/`} />
      </Column>
      <Column>
        <Title>Our Brands</Title>
        <Menu items={brands} prefix={`/${locale}/${locale === "en" ? "brands" : "marcas"}/`} />
      </Column>
      <Column>
        <Title>Get Our Newsletter</Title>
        <form name="subscribe" method="post" data-netlify="true" data-netlify-honeypot="text">
          <p style={{display: `none`}}>
            <input type="hidden" name="form-name" value="subscribe" />
            <input name="text"/>
          </p>
          <Input type="text" name="name" placeholder="Name"/>
          <Input type="email" name="email" placeholder="Email"/>
          <Button type="submit">Subscribe</Button>
        </form>
      </Column>
    </FooterWrapper>
    <FooterWrapper subfooter>
      <LanguageSwitcher translation={translation}/>
      <SocialNetworks socialNetworks={socialNetworks}/>
    </FooterWrapper>
  </Footer>
)
