import React from 'react'
import styled from 'styled-components'
import breakpoint from 'styled-components-breakpoint'
import { InstantSearch, Hits, SearchBox } from 'react-instantsearch/dom'
import 'instantsearch.css/themes/reset.css'
import Link from 'gatsby-link'
import AlgoliaLogo from '../../images/search-by-algolia.svg'

const Container = styled.div`
  position:relative;
  z-index: 10;
  text-align: left;
  grid-row: 2;
  grid-column: 1 / span 2;

  ${breakpoint('tablet') `
    grid-column: 1 / span 3;
    grid-row: 2;
    display: ${props => props.displaySearch ? "block" : 'none'};
  `}

  .ais-InstantSearch__root {
    position: relative;
  }

  .ais-Hits {
    position: absolute;
    top: calc(100% + 10px);
    left: 0;
    right: 0;
    background: rgba(255,255,255,0.95);
    padding: 10px 10px 20px;
    border: solid 1px #ddd;
    display: ${props => props.active ? "block" : "none"};

    background-image: url(${AlgoliaLogo});
    background-repeat: no-repeat;
    background-size: 100px;
    background-position: bottom 10px right 10px;
  }

  .ais-SearchBox {
    border: solid 1px #eee;
    border-radius: 15px;
    border-color: ${props => props.active ? props.theme.mainColor : props.theme.grayLight};
    box-shadow: ${props => props.active ? '1px 1px 3px 0px rgba(158,158,158,1)' : 'none'};
    overflow: hidden;
  }

  .ais-Hits-item {
    width: 100%;
    margin: 0;
    box-shadow: none;
    border-bottom: 1px solid #ddd;
    padding: 5px 0;

    &:last-of-type {
      border: none;
    }
  }

  .ais-SearchBox-form {
    margin: 0;
    display: grid;
    grid-template-columns: auto 30px 30px;
  }

  .ais-SearchBox-input {
    width: 100%;
    border: 0;
    padding: 5px 5px 5px 15px;
    grid-column: 1;

    &:focus {
      outline: none;
    }
  }

  .ais-SearchBox-reset {
    grid-column: 2;
    grid-row: 1;
  }

  .ais-SearchBox-submit {
    grid-column: 3;
    &:focus {
      outline: none;
    }
  }
`

function Result({ hit }) {
  return (
    <Link to={hit.path}>{hit.context.pageTitle}</Link>
  );
}

function AlgoliaSearch() {
  return (
    <div className="container">
      <SearchBox />
    </div>
  );
}

class Search extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      active: false
    }
    this.onSearchStateChange = this.onSearchStateChange.bind(this)
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClicks);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClicks);
  }

  onSearchStateChange(e){
    if(e.query !== "" && e.query != null) {
      this.setState({active: true})
    } else {
      this.setState({ active: false })
    }
  }

  render(){
    var active = this.state.active
    return (
      <Container active={active} displaySearch={this.props.displaySearch}>
        <InstantSearch
          appId="18NBZT4GQG"
          apiKey="5674c23a94fd448f3f22b66de5599a7c"
          indexName="main"
          searchState={this.state.searchState}
          onSearchStateChange={e => this.onSearchStateChange(e)}
        >
          <AlgoliaSearch />
          <Hits hitComponent={Result} />
        </InstantSearch>
      </Container>
    )
  }
}

export default Search
