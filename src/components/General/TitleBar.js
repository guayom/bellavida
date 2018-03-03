import React from 'react'
import styled from 'styled-components'

const TitleBar = styled.div`
    display: block;
    background: ${props => props.theme.grayMedium};
    color: #fff;
    padding: 10px;
    margin-bottom: 20px;
`

const Title = styled.h3`
    color: #fff;
    font-size: 16px;
    margin: 0;
`

export default ({title}) => (
    <TitleBar>
        <Title>{title}</Title>
    </TitleBar>
)