import React from 'react'
import {FaPhone} from 'react-icons/fa'

export default ({phoneNumber}) => (
  <a href={`tel:${phoneNumber}`}><FaPhone /> {phoneNumber}</a>
)
