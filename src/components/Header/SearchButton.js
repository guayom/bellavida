import React from 'react'
import FaSearch from 'react-icons/lib/fa/search'
import styled from 'styled-components'
import breakpoint from 'styled-components-breakpoint'

const Container = styled.div`
  display: none;

  ${breakpoint('tablet')`
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

class SearchButton extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    return(
      <Container onClick={e => this.props.displaySearch()}>
        <FaSearch />
      </Container>
    )
  }
}

export default SearchButton