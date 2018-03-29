import React from 'react'
import styled from 'styled-components'

const Cta = styled.a `
  display: inline-block;
  padding: ${props => props.size === "small" ? '5px 10px' : '8px 20px'};
  background: ${props => props.theme.mainColor};
  font-size: ${props => props.size === "small" ? '11px' : '14px'};
  line-height: ${ props => props.size === "small" ? '11px' : '14px'};
  color: #fff;
  text-decoration: none;
  border-radius: 4px;

  &:hover {
    background: ${props => props.theme.mainColorVariation};
    color: #fff;
  }
`

class Tabs extends React.Component {
  render(){
    const locations = this.props.locations
    return(
      <div>
        {locations.map(location => (
          <div style={{marginBottom: `20px`}}>
            <strong>{location.node.title}</strong>
            <div dangerouslySetInnerHTML={{__html: location.node.address.childMarkdownRemark.html}} />
            <Cta 
              href={`http://maps.google.com/maps?q=${location.node.location.lat},${location.node.location.lon}&ll=${location.node.location.lat},${location.node.location.lon}&z=17`}
              size="small"
            >
            Google Maps
            </Cta>
          </div>
        ))}
      </div>
    )
  }
}

export default Tabs