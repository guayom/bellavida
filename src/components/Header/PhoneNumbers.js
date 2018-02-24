import React from 'react'
import FaPhone from 'react-icons/lib/fa/phone'

export default ({phoneNumber}) => (
  <div style={{marginLeft: `auto`}}>
    <a href={`tel:${phoneNumber}`}><FaPhone /> {phoneNumber}</a>
  </div>
)
