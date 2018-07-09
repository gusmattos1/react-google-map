/* global google */
import fetch from "isomorphic-fetch";

import {
  default as React,
  Component,
} from "react";

import {
  withGoogleMap,
  GoogleMap,
  Marker,
} from "../../../lib";

import MarkerClusterer from "../../../lib/addons/MarkerClusterer";

const MarkerClustererExampleGoogleMap = withGoogleMap(props => (
  <GoogleMap
    defaultZoom={3}
    defaultCenter={{ lat: 43.0391667, lng: -79.525 }}
  >
    <MarkerClusterer
      averageCenter
      enableRetinaIcons
      gridSize={60}
    >
      {props.markers.map(marker => (
        <Marker
          position={{ lat: marker.attributes.LATITUDE, lng: marker.attributes.LONGITUDE }}
          key={marker.attributes.Index_}
        />
      ))}
    </MarkerClusterer>
  </GoogleMap>
));

export default class MarkerClustererExample extends Component {
  state = {
    markers: [],
  }

  componentDidMount() {
    fetch('https://services.arcgis.com/S9th0jAJ7bqgIRjw/arcgis/rest/services/KSI/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json')
      .then(res => res.json())
      .then(data => {
        this.setState({ markers: data.features });
      });
  }

  render() {
    return (
      <MarkerClustererExampleGoogleMap
        containerElement={
          <div style={{ height: `100%` }} />
        }
        mapElement={
          <div style={{ height: `100%` }} />
        }
        markers={this.state.markers}
      />
    );
  }
}
