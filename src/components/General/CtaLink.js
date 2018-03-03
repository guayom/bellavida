import React from "react"
import styled from 'styled-components'
import Link from 'gatsby-link'

export default ({to, text, size}) => (
    <Link 
        to={to}
        style={{
            display: `inline-block`,
            padding: size === "small" ? '5px 10px' : '8px 20px',
            background: '#93c548',
            fontSize: size === "small" ? '11px' : '14px',
            lineHeight: size === "small" ? '11px' : '14px',
            color: '#fff',
            textDecoration: `none`,
            borderRadius: `4px`,
        }}
    >
        {text}
    </Link>
)