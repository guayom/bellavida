import React from 'react'
import Link from 'gatsby-link'
import Menu from '../../components/Header/Menu'

const Header = (props) => (
  <div
    style={{
      marginBottom: '1.45rem',
    }}
  >
    <div
      style={{
        margin: '0 auto',
        maxWidth: 960,
        padding: '1.45rem 1.0875rem',
      }}
    >
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
      <Menu products={props.products} locale={props.locale} brands={props.brands}/>
    </div>
  </div>
)

export default Header
