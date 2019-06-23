import React from "react"
import { FaDownload } from "react-icons/fa"

export default ({ url, title }) => {
  return (
    <a
      style={{
        display: `inline-block`,
        padding: "8px 20px",
        background: "#93c548",
        fontSize: "14px",
        lineHeight: "14px",
        color: "#fff",
        textDecoration: `none`,
        borderRadius: `4px`,
        border: 0,
      }}
      href={url}
      target="_blank"
      download={title}
    >
      {title} <FaDownload />
    </a>
  )
}
