import React from 'react'
import TitleBar from  '../../components/General/TitleBar'
import styled from 'styled-components'
import breakpoint from 'styled-components-breakpoint'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

const Container = styled.div`
  flex: 1 0;
`

const latitude = 10.308094191678;
const longitude = -84.86571288339;

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
    <GoogleMap
        defaultZoom={8}
        defaultCenter={{ lat: latitude, lng: longitude }}
    >
        <Marker
            position={{ lat: 9.9526159, lng: -84.2274045 }}
        />
        <Marker
            position={{ lat: 10.5906306, lng: -85.5347681 }}
    />
    </GoogleMap>
))

export default (props) => (
    <Container>
        <TitleBar title="Visit our showrooms" />
        <MyMapComponent
            isMarkerShown
            googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `400px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
        />
    </Container>
)