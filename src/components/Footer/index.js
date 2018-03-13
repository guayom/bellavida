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

const Menu = ({items, prefix}) => (
  <ul>
    {items.map(item => (
      <li key={item.node.id}>
        <Link to={`${prefix}${item.node.slug}`}>
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
      </Column>
    </FooterWrapper>
    <FooterWrapper subfooter>
      <LanguageSwitcher translation={translation}/>
      <SocialNetworks socialNetworks={socialNetworks}/>
    </FooterWrapper>
  </Footer>
)
