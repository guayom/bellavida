import React from "react"
import { FaSearch } from "react-icons/fa"
import styled from "styled-components"
import breakpoint from "styled-components-breakpoint"

const Container = styled.div`
  display: none;

  ${breakpoint("tablet")`
    display: block;
    align-self: center;
    justify-self: right;
    border-radius: 50%;
    border: solid 1px #ddd;
    height: 30px;
    width: 30px;
    text-align: center;
    line-height: 26px;
  `}
`

export default ({ displaySearch }) => (
  <Container onClick={e => displaySearch()}>
    <FaSearch />
  </Container>
)
