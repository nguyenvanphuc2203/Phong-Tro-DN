import React, { Component } from 'react';
import { connect } from 'react-redux';
import store from '../store/store';
import toastr from 'toastr';
import $ from "jquery";
import axios from 'axios';
import WOW from 'wowjs';
import FormChoThue from './formChothue';
import { SERVER_URL } from '../config';


const _ = require("lodash");
const { compose, withProps,withStateHandlers, lifecycle } = require("recompose");
const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} = require("react-google-maps");
const { SearchBox } = require("react-google-maps/lib/components/places/SearchBox");
const google = window.google;
const debounce = require("lodash");

const MapWithASearchBox = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyDxFLq6ww-zE69Agx7KUZysAt67HmR46JU&v=3.exp&libraries=geometry,drawing,places&signed_in=true",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `700px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  lifecycle({
    componentWillMount() {
      const refs = {}
      console.log(this.props.nhatro)
      this.setState({
        bounds: null,
        center: {
          lat: 15.9710189, lng: 108.2293462
        },
        markers: [],
        onMapMounted: ref => {
          refs.map = ref;
        },
        onBoundsChanged: debounce(
          () => {
          this.setState({
            bounds: refs.map.getBounds(),
            center: refs.map.getCenter()
          })
          let { onBoundsChange } = this.props
            if (onBoundsChange) {
              onBoundsChange(refs.map)
            }
          },
            100,
            { maxWait: 500 }
          ),
        onSearchBoxMounted: ref => {
          refs.searchBox = ref;
        },
        onPlacesChanged: () => {
          const places = refs.searchBox.getPlaces();
          const bounds = new google.maps.LatLngBounds();

          places.forEach(place => {
            if (place.geometry.viewport) {
              bounds.union(place.geometry.viewport)
            } else {
              bounds.extend(place.geometry.location)
            }
          });
          const nextMarkers = places.map(place => ({
            position: place.geometry.location,
          }));
          const nextCenter = _.get(nextMarkers, '0.position', this.state.center);

          this.setState({
            center: nextCenter,
            markers: nextMarkers,
          });
          // refs.map.fitBounds(bounds);
        },
      })
    },
  }),
  /* icon trọ  */
  withStateHandlers(() => ({
    isOpen: false,
    showInfo : '0'
  }), {
    onToggleOpen: ({ isOpen }) => () => ({
      isOpen: !isOpen,
    }),
    showInfo: ({ showInfo,isOpen }) => (a) => ({
      isOpen: !isOpen,
      showInfoIndex: a
    })
  }),
  withScriptjs,
  withGoogleMap
)(props =>
  <GoogleMap
    ref={props.onMapMounted}
    defaultZoom={15}
    center={props.center}
    onBoundsChanged={props.onBoundsChanged}
  >
    <SearchBox
      ref={props.onSearchBoxMounted}
      bounds={props.bounds}
      controlPosition={google.maps.ControlPosition.TOP_LEFT}
      onPlacesChanged={props.onPlacesChanged}
    >
      <input
        type="text"
        placeholder="Nhập Tên Phường/Quận?"
        style={{
          boxSizing: `border-box`,
          border: `1px solid transparent`,
          width: `240px`,
          height: `48px`,
          marginTop: `11px`,
          marginLeft: `-50px`,
          padding: `0 10px`,
          zIndex:'1000',
          borderRadius: `3px`,
          boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
          fontSize: `14px`,
          outline: `none`,
          textOverflow: `ellipses`,
        }}
      />
    </SearchBox>
    {props.markers.map((marker, index) =>
      <Marker
        draggable
        onDragEnd={(e) => {
          console.log(e);
          fetch('http://maps.googleapis.com/maps/api/geocode/json?latlng='+e.latLng.lat()+','+e.latLng.lng()+'&sensor=false')
          .then((response) => response.json())
          .then((responseJson) => {
            console.log(responseJson)
            $('#address').val(responseJson.results[0].formatted_address)
          })
          .catch((error) => {
            console.error(error);
          });
          $('#lat_pick').val(e.latLng.lat());
          $('#lng_pick').val(e.latLng.lng());
          $('.collapse_maps').click()
        }}
        options={{icon: 'https://i.imgur.com/1LPtwiF.png'}}
        key={index} 
        position={marker.position} />
    )}
  </GoogleMap>
);

class Maps extends Component {
  constructor(props){
    super(props);
    const wow = new WOW.WOW();
    wow.init();
    this.state = {
      
    }
  }
  componentWillMount() {
    fetch(SERVER_URL+'/maps')
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson)
        this.setState({ nhatro: responseJson }) ;
      })
      .catch((error) => {
        console.error(error);
      });
  }
  render() {
    return (
      <div className="wow slideInLeft">
        <div class="row">
          <div class="col-md-12">
          <button class="btn btn-success collapse_maps" id="toggle_maps" data-toggle="collapse" data-target="#maps_pick">Chọn Vị Trí</button>
            <div id="maps_pick" class="collapse">
              <MapWithASearchBox 
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `390px` }} />}
                mapElement={<div style={{ height: `100%` }} />}
                nhatro={this.state.nhatro} />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <FormChoThue />
          </div>
        </div>
       
      </div>
    );
  }
}

export default connect((state)=>state)(Maps)
