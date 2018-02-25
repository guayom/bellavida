import React from 'react'
import FaPhone from 'react-icons/lib/fa/phone'

export default ({phoneNumber}) => (
  <a href={`tel:${phoneNumber}`}><FaPhone /> {phoneNumber}</a>
)
