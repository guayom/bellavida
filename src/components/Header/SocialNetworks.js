import React from 'react'
import { FaFacebookF } from "react-icons/fa"
import styled from 'styled-components'

const Link = styled.a`
  background: ${props => props.theme.grayMedium};
  border-radius: 2px;
  display: inline-block;
  width: 20px;
  height: 20px;
  text-align: center;
  color: ${props => props.theme.mainColor};
  line-height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: ${props => props.theme.mainColorVariation};
    background: ${props => props.theme.mainColor};
  }
`

function displayIcon(title){
  if (title === "Facebook") {
    return <FaFacebookF />
  } else {
    return null
  }
}

export default ({socialNetworks}) => (
  <div style={{display: `inline-block`}}>
    {socialNetworks.edges.map((n, i) => (
      <Link
        key={n.node.id}
        href={n.node.url}
        title={n.node.title}
        rel="nofollow"
        target="_blank"
        >
        {displayIcon(n.node.title)}
      </Link>
    ))}
  </div>
)
