import React, { Component } from "react"
import GoogleMapReact from "google-map-react"
import TitleBar from "../../components/General/TitleBar"
import styled from "styled-components"
import { MdLocationOn } from "react-icons/md"

const Container = styled.div`
  flex: 1 0;
`

const MarkerContainer = styled.div`
  font-size: 25px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  width: 80px;
  height: 80px;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 50%;
  cursor: pointer;
  transition: background .3s ease;
  margin-top: -40px;
  margin-left: -40px;

  &:hover {
    background: rgba(0, 0, 0, 0.5);
  }

  path {
    fill: red;
  }
`

const Text = styled.div`
  width: 100%;
  font-size: 16px;
  line-height: 1em;
  color: #fff;
`

const AnyReactComponent = ({ text, lat, lng }) => (
  <MarkerContainer
    onClick={() =>
      window.open(
        `http://maps.google.com/maps?q=${lat},${lng}&ll=${lat},${lng}&z=17`,
        "_blank"
      )
    }
  >
    <div>
      <MdLocationOn />
    </div>
    <Text>{text}</Text>
  </MarkerContainer>
)

class SimpleMap extends Component {
  static defaultProps = {
    center: {
      lat: 9.98,
      lng: -84.83,
    },
    zoom: 7.8,
  }
  render() {
    return (
      // Important! Always set the container height explicitly
      <Container>
        <TitleBar title="Visit our showrooms" />
        <div style={{ height: "400px", width: "100%" }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: process.env.GATSBY_GOOGLE_MAPS_KEY }}
            defaultCenter={this.props.center}
            defaultZoom={this.props.zoom}
          >
            <AnyReactComponent
              lat={9.953229}
              lng={-84.157156}
              text="San José"
            />
            <AnyReactComponent
              lat={10.5906306}
              lng={-85.5347681}
              text="Liberia"
            />
          </GoogleMapReact>
        </div>
      </Container>
    )
  }
}

export default SimpleMap
