import React from 'react'
import Link from 'gatsby-link'
import TopHeader from '../../components/Header/TopHeader'
import Menu from '../../components/Header/Menu'
import Search from '../../components/Header/Search'
import Wrapper from '../../components/Layout/Wrapper'
import LogoSrc from '../../images/logo.png'
import styled from 'styled-components'

const MenuContainer = Wrapper.extend`
  display: flex;
`

const LogoContainer = styled.h1`
  display: flex;
  justify-content: left;
  align-items: center;
  height: 100%;
  text-decoration: none;
  margin: 0;
`

const Logo = styled.img`
  margin: 0;
`

const Header = (props) => (
  <div>
    <TopHeader phoneNumbers={props.phoneNumbers} socialNetworks={props.socialNetworks} translation={props.translation}/>
    <MenuContainer>
      <div style={{flexGrow: 2}}>
        <LogoContainer>
          <Link
            to="/"
            style={{
              textDecoration: 'none',
            }}
          >
            <Logo src={LogoSrc} alt="Bella Vida Costa Rica"/>
          </Link>
        </LogoContainer>
      </div>
      <Menu products={props.products} locale={props.locale} brands={props.brands}/>
      <Search />
    </MenuContainer>
  </div>
)

export default Header
