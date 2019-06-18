import React from 'react'
import { FaFacebookF } from "react-icons/fa"
import styled from 'styled-components'
import { StaticQuery, graphql } from "gatsby"

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

export default () => (
  <StaticQuery
    query={graphql`
      query MyQuery {
        allContentfulSocialNetwork {
          edges {
            node {
              id
              title
              url
              node_locale
            }
          }
        }
      }
    `}
    render={data => (
      <div style={{ display: `inline-block` }}>
        {data.allContentfulSocialNetwork.edges.filter(network => network.node.node_locale === "en").map(
          ({ node: { id, url, title } }) => (
            <Link
              key={id}
              href={url}
              title={title}
              rel="nofollow"
              target="_blank"
            >
              {displayIcon(title)}
            </Link>
          )
        )}
      </div>
    )}
  />
)
