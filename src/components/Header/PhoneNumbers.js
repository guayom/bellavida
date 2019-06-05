import React from 'react'
import {FaPhone} from 'react-icons/fa'
import styled from 'styled-components'

const Link = styled.div`
  color: ${props => props.theme.grayMedium};

  &:hover {
    color: ${props => props.theme.mainColor};
  }
`

export default ({phoneNumber}) => (
  <div style={{marginLeft: `auto`}}>
    <Link href={`tel:${phoneNumber}`}>
      <FaPhone /> {phoneNumber}
    </Link>
  </div>
)
