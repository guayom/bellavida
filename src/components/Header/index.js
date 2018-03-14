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
  position: relative;
  margin: 0 -20px;

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
  flex-grow: 2;
  flex-basis: 0;
  padding: 0 0 0 20px;

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
  padding-right: 20px;
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
class Header extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      expanded: false
    }
    this.toggleMenu = this.toggleMenu.bind(this)
  }

  toggleMenu(){
    this.setState({expanded: !this.state.expanded})
  }

  render(){
    const phoneNumbers = this.props.phoneNumbers
    const socialNetworks = this.props.socialNetworks
    const translation = this.props.translation
    const locale = this.props.locale
    const products = this.props.products
    const brands = this.props.brands
    const expanded = this.state.expanded
    return(
      <div>
        <TopHeader
          phoneNumbers={phoneNumbers}
          socialNetworks={socialNetworks}
          translation={translation}
          locale={locale}
        />
        <Wrapper>
          <MenuBar>
            <LogoContainer>
              <Link to="/" style={{textDecoration: 'none',}}>
                <Logo src={LogoSrc} alt="Bella Vida Costa Rica" />
              </Link>
            </LogoContainer>
            <Menu products={products} locale={locale} brands={brands} expanded={expanded}/>
            <Search />
            <ToggleMenuButtonContainer>
              <ToggleMenuButton onClick={e => this.toggleMenu()}>
                <FaBars />
              </ToggleMenuButton>
            </ToggleMenuButtonContainer>
          </MenuBar>
        </Wrapper>
      </div>
    )
  }
}

export default Header
