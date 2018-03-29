import React from 'react'
import styled from 'styled-components'
import FaSearch from 'react-icons/lib/fa/search'
import breakpoint from 'styled-components-breakpoint'

const Container = styled.div`
  position:relative;
  z-index: 10;
  text-align: left;
  grid-row: 2;
  grid-column 1 / span 2;

  ${breakpoint('tablet') `
    align-self: center;
    text-align: right;
    height: 30px;
    grid-row: 1 / span 1;
    grid-column: 3 / span 1;
  `}
`

const Form = styled.form`
  display: block;
  border: solid 1px #eee;
  border-radius: 15px;
  border-color: ${props => props.active ? props.theme.mainColor : props.theme.grayLight};
  box-shadow: ${props => props.active ? '1px 1px 3px 0px rgba(158,158,158,1)' : 'none'};
  height: 30px;
  overflow: hidden;
  background-color: white;
  position:relative;
  margin: 0;
  transition: all 0.5s ease;
  z-index: 1;

  ${breakpoint('tablet') `
    position: absolute;
    top: 0;
    right: 0;
    width: ${props => props.active ? '150px' : '30px'};
  `}
`

const SearchInput = styled.input`
  width: 100%;
  border: none;
  z-index: 2;
  margin: 0;
  background: transparent;
  color: ${props => props.theme.grayMedium};
  font-size: 12px;
  transition: all 0.5s ease;
  padding: 5px 8px;

  &:focus {
    outline: none;
  }

  ${breakpoint('tablet') `
    position:absolute;
    top: 4px;
    left: 5px;
    width: 120px;
    opacity: ${props => props.active ? '1' : '0'};
    height: 20px;
    padding: 0;
  `}
`

const SearchIconContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 30px;
  height: 30px;
  font-size: 14px;
  line-height: 25px;
  text-align:center;
  z-index: 0;
  color: ${props => props.active ? props.theme.mainColor : props.theme.grayDarkest};
  transition: all 0.5s ease;
`

class Search extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      active: false
    }
    this.handleClicks = this.handleClicks.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClicks);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClicks);
  }

  handleClicks(e) {
    if (this.state.active && e != 'insideSearchFormClick') {
      this.setState({active: false})
    } else if (this.state.active === false && e === 'insideSearchFormClick'){
      this.setState({active: true})
    }
  }

  render(){
    var active = this.state.active
    return (
      <Container>
        <Form active={active} onClick={e => this.handleClicks('insideSearchFormClick')}>
          <SearchIconContainer active={active}>
            <FaSearch />
          </SearchIconContainer>
          <SearchInput type="text" name="query" active={active}/>
        </Form>
      </Container>
    )
  }
}

export default Search
