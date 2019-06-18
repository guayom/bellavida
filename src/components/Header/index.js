import React from 'react'
import Link from 'gatsby-link'
import TopHeader from '../../components/Header/TopHeader'
import Menu from '../../components/Header/Menu'
import Search from '../../components/Header/Search'
import Wrapper from '../../components/Layout/Wrapper'
import LogoSrc from '../../images/logo.png'
import SearchButton from '../../components/Header/SearchButton'
import styled from 'styled-components'
import breakpoint from 'styled-components-breakpoint'
import {FaBars} from 'react-icons/fa'

const MenuBar = styled.div`
  display: grid;
  position: relative;
  margin: 0;
  padding: 20px 0;
  grid-row-gap: 10px;

  ${breakpoint('tablet') `
    grid-template-columns: 3fr 15fr 30px;
    grid-auto-rows: 80px;
    padding: 0;
  `}
`

const LogoContainer = styled.h1`
  justify-content: left;
  align-items: center;
  text-decoration: none;
  margin: 0;

  ${breakpoint('tablet') `
    align-self: center;
  `}
`

const Logo = styled.img`
  margin: 0;
`

const ToggleMenuButtonContainer = styled.div`
  display: block;
  text-align: right;
  grid-column: 2;
  grid-row: 1;

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
      expanded: false,
      displaySearch: false,
    }
    this.toggleMenu = this.toggleMenu.bind(this)
    this.collapseMenu = this.collapseMenu.bind(this)
    this.displaySearch = this.displaySearch.bind(this)
  }

  toggleMenu(){
    this.setState({expanded: !this.state.expanded})
  }

  collapseMenu(){
    this.setState({ expanded: false })
  }

  displaySearch(){
    this.setState({displaySearch: !this.state.displaySearch})
  }

  render(){
    const translation = this.props.translation
    const locale = this.props.locale
    const expanded = this.state.expanded
    return(
      <div>
        <TopHeader
          translation={translation}
          locale={locale}
        />
        <Wrapper>
          <MenuBar>
            <LogoContainer>
              <Link to={locale === "en" ? "/":"/es/"} style={{textDecoration: 'none'}}>
                <Logo src={LogoSrc} alt="Bella Vida Costa Rica" />
              </Link>
            </LogoContainer>
            <Menu locale={locale} expanded={expanded} handleClick={e => this.collapseMenu(e)}/>
            <SearchButton displaySearch={e => this.displaySearch(e)} />
            <Search displaySearch={this.state.displaySearch}/>
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
