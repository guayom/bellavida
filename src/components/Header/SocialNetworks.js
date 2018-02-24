import React from 'react'
import FaFacebook from 'react-icons/lib/fa/facebook'
import styled from 'styled-components'

const Link = styled.a`
  background: ${props => props.theme.grisMedio};
  border-radius: 2px;
  display: inline-block;
  width: 20px;
  height: 20px;
  text-align: center;
  color: ${props => props.theme.mainColor};
  line-height: 20px;

  &:hover {
    color: ${props => props.theme.mainColorVariation};
    background: ${props => props.theme.mainColor};
  }
`

function displayIcon(title){
  if (title === "Facebook") {
    return <FaFacebook />
  } else {
    return null
  }
}

export default ({socialNetworks}) => (
  <div>
    {socialNetworks.edges.map((n, i) => (
      <Link
        href={n.node.url}
        title={n.node.title}
        rel="nofollow"
        target="_blank"
        key={i}>
        {displayIcon(n.node.title)}
      </Link>
    ))}
  </div>
)
