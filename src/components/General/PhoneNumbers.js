import React from "react"
import { FaPhone } from "react-icons/fa"
import { StaticQuery, graphql } from "gatsby"

export default ({header}) => (
  <StaticQuery
    query={graphql`
      query PhoneNumbersQuery {
        allContentfulPhoneNumbers {
          edges {
            node {
              id
              number
              node_locale
            }
          }
        }
      }
    `}
    render={data => (
      <>
        {data.allContentfulPhoneNumbers.edges.filter(number => number.node.node_locale === "en").map(number => (
          <div key={number.node.id} style={header && {marginLeft: `auto`}}>
            <a href={`tel:${number.node.number}`}>
              <FaPhone /> {!header && number.node.number}
            </a>
          </div>
        ))}
      </>
    )}
  />
)
