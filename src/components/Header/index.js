import React from 'react'
import Link from 'gatsby-link'
import TopHeader from '../../components/Header/TopHeader'
import Menu from '../../components/Header/Menu'
import Search from '../../components/Header/Search'
import Wrapper from '../../components/Layout/Wrapper'
import LogoSrc from '../../images/logo.png'
import styled from 'styled-components'

const MenuContainer = Wrapper.extend`
  padding: 10px 0;
  display: flex;
`

const Logo = styled.img`
  margin: 0;
`

const Header = (props) => (
  <div>
    <TopHeader phoneNumbers={props.phoneNumbers} socialNetworks={props.socialNetworks}/>
    <MenuContainer>
      <div>
        <h1 style={{ margin: 0 }}>
          <Link
            to="/"
            style={{
              textDecoration: 'none',
            }}
          >
            <img src={LogoSrc} alt="Bella Vida Costa Rica"/>
          </Link>
        </h1>
      </div>
      <Menu products={props.products} locale={props.locale} brands={props.brands}/>
      <Search />
    </MenuContainer>
  </div>
)

export default Header
