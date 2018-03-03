import React from 'react'
import TitleBar from  '../../components/General/TitleBar'
import styled from 'styled-components'

const Container = styled.div`
    flex: 1 0;
`

export default (props) => (
    <Container>
        <TitleBar title="Visit our showrooms" />
    </Container>
)