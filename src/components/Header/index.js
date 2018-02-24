import React from 'react'
import Link from 'gatsby-link'
import TopHeader from '../../components/Header/TopHeader'
import Menu from '../../components/Header/Menu'
import Search from '../../components/Header/Search'
import Wrapper from '../../components/Layout/Wrapper'

const Header = (props) => (
  <div>
    <TopHeader phoneNumbers={props.phoneNumbers}/>
    <Wrapper>
      <div>
        <h1 style={{ margin: 0 }}>
          <Link
            to="/"
            style={{
              textDecoration: 'none',
            }}
          >
            Logo here
          </Link>
        </h1>
      </div>
      <Menu products={props.products} locale={props.locale} brands={props.brands}/>
      <Search />
    </Wrapper>
  </div>
)

export default Header
