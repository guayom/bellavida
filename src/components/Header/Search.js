import React from 'react'
import styled from 'styled-components'
import FaSearch from 'react-icons/lib/fa/search'
import breakpoint from 'styled-components-breakpoint'

const Container = styled.div`
  margin-left: auto;
  width: 30px;
  overflow:visible;
  position:relative;
  flex-grow: 2;
  z-index: 10;
  flex-basis: 0;
  text-align: right;
  padding-top: 5px;

  ${breakpoint('tablet') `
    flex-grow: 1;
    padding-top: 0;
  `}
`

const Form = styled.form`
  display: inline-block;
  border: solid 1px #eee;
  border-radius: 15px;
  border-color: ${props => props.active ? props.theme.mainColor : props.theme.grayLight};
  width: ${props => props.active ? '150px' : '30px'};
  box-shadow: ${props => props.active ? '1px 1px 3px 0px rgba(158,158,158,1)' : 'none'};
  height: 30px;
  overflow: hidden;
  background-color: white;
  position:relative;
  margin: 0;
  transition: all 0.5s ease;
  z-index: 1;

  ${breakpoint('tablet') `
    display: block;
    position:absolute;
    top: 30px;
    right: 0;
  `}
`

const SearchInput = styled.input`
  width: 100%;
  height: 20px;
  position:absolute;
  top: 4px;
  left: 5px;
  width: 120px;
  border: none;
  z-index: 2;
  background: purple;
  margin: 0;
  background: transparent;
  color: ${props => props.theme.grayMedium};
  opacity: ${props => props.active ? '1' : '0'};
  font-size: 12px;
  transition: all 0.5s ease;

  &:focus {
    outline: none;
  }
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
