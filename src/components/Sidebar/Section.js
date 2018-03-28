import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  border: solid 1px #ddd;
  padding 1.5em;
  margin-bottom: 2em;
  font-size: 13px;

  h4 {
    margin: 0 0 5px;
    font-size: 13px;
  }

  a:hover {
    text-decoration: none;
  }
`

const Title = styled.h3`
  font-size: 15px;
  color: #444444;
  font-weight: bold;
  margin: 0 0 20px;
`

export default (props) => (
  <Container>
    <Title>{props.title}</Title>
    {props.children}
  </Container>
)