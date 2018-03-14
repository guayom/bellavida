import React from 'react'
import Link from 'gatsby-link'
import TopHeader from '../../components/Header/TopHeader'
import Menu from '../../components/Header/Menu'
import Search from '../../components/Header/Search'
import Wrapper from '../../components/Layout/Wrapper'
import LogoSrc from '../../images/logo.png'
import styled from 'styled-components'
import breakpoint from 'styled-components-breakpoint'
import FaBars from 'react-icons/lib/fa/bars'

const MenuBar = styled.div`
  display: flex;
  padding: 10px 0;

  ${breakpoint('tablet') `
    padding: 0;
  `}
`

const LogoContainer = styled.h1`
  display: flex;
  justify-content: left;
  align-items: center;
  height: 100%;
  text-decoration: none;
  margin: 0;
  flex-grow: 3;
  flex-basis: 0;

  ${breakpoint('tablet') `
    flex-grow: 3;
    padding: 15px 0;
  `}
`

const Logo = styled.img`
  margin: 0;
`

const ToggleMenuButtonContainer = styled.div`
  display: block;
  flex: 1 0;
  text-align: right;
  ${breakpoint('tablet') `
    display: none;
  `}
`

const ToggleMenuButton = styled.button`
  display: inline-block;
  background: ${props => props.theme.mainColor};
  color: #fff;
  border: 0;
  border-radius: 2px;
  padding: 10px 12px;

  &:focus {
    outline: none;
  }
`

const Header = (props) => (
  <div>
    <TopHeader 
      phoneNumbers={props.phoneNumbers}
      socialNetworks={props.socialNetworks}
      translation={props.translation}
      locale={props.locale}
    />
    <Wrapper>
      <MenuBar>
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
        <Menu products={props.products} locale={props.locale} brands={props.brands}/>
        <Search />
        <ToggleMenuButtonContainer>
          <ToggleMenuButton>
            <FaBars />
          </ToggleMenuButton>
        </ToggleMenuButtonContainer>
      </MenuBar>
    </Wrapper>
  </div>
)

export default Header
