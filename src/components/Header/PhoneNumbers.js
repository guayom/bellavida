import React from 'react'
import FaPhone from 'react-icons/lib/fa/phone'
import styled from 'styled-components'

const Link = styled.div`
  color: ${props => props.theme.grayMedium};
`

export default ({phoneNumber}) => (
  <div style={{marginLeft: `auto`}}>
    <Link href={`tel:${phoneNumber}`}><FaPhone /> {phoneNumber}</Link>
  </div>
)
