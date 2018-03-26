import React from "react"
import styled from 'styled-components'
import Link from 'gatsby-link'

const Cta = styled(Link)`
  display: inline-block;
  padding: ${props => props.size === "small" ? '5px 10px' : '8px 20px'};
  background: ${props => props.theme.mainColor};
  font-size: ${props => props.size === "small" ? '11px' : '14px'};
  line-height: ${ props => props.size === "small" ? '11px' : '14px'};
  color: #fff;
  text-decoration: none;
  border-radius: 4px;

  &:hover {
    background: ${props => props.theme.mainColorVariation};
    color: #fff;
  }
`

export default ({to, text, size}) => (
  <Cta to={to} size={size}>
    {text}
  </Cta>
)