import React from 'react'
import styled from 'styled-components'
import breakpoint from 'styled-components-breakpoint'

const Wrapper = styled.div`
  padding-left: 20px;
  padding-right: 20px;
  box-sizing:border-box;
  margin: 0 auto;

  ${breakpoint('tablet') `
    padding-left: 80px;
    padding-right: 80px;
  `}
`

export default Wrapper
