import React, { Component } from 'react';
import { connect } from 'react-redux';
import store from '../store/store';
import toastr from 'toastr';
import $ from "jquery";
import axios from 'axios';
import WOW from 'wowjs';
import FromChoThue from './formChothue';

const { compose, withProps, lifecycle } = require("recompose");
const {
  withScriptjs,
} = require("react-google-maps");
const { StandaloneSearchBox } = require("react-google-maps/lib/components/places/StandaloneSearchBox");

const PlacesWithStandaloneSearchBox = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: '100%' }} />,
    containerElement: <div style={{ height: '400px' }} />,
  }),
  lifecycle({
    componentWillMount() {
      const refs = {}

      this.setState({
        places: [],
        onSearchBoxMounted: ref => {
          refs.searchBox = ref;
        },
        onPlacesChanged: () => {
          const places = refs.searchBox.getPlaces();
          toastr.success('lấy vị trí thành công!?')
          this.setState({
            places,
          });
        },
      })
    },
  }),
  withScriptjs  
)(props =>
  <div data-standalone-searchbox="">
    <StandaloneSearchBox
      ref={props.onSearchBoxMounted}
      bounds={props.bounds}
      onPlacesChanged={props.onPlacesChanged}
    >
      <input
        type="text"
        placeholder="Trọ của bạn ở đâu? gõ để xác định vị trí "
        style={{
          boxSizing: `border-box`,
          border: `1px solid transparent`,
          width: `340px`,
          height: `48px`,
          marginTop: `11px`,
          marginLeft: `60px`,
          padding: `0 10px`,
          zIndex:'1000',
          borderRadius: `3px`,
          boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
          fontSize: `14px`,
          outline: `none`,
          textOverflow: `ellipses`,
        }}
      />
    </StandaloneSearchBox>
    <ol>
      {props.places.map(({ place_id, formatted_address, geometry: { location } }) =>
      <div key={place_id}>
          <FromChoThue formatted_address={formatted_address} location={location}/>
      </div>
        
      )}
    </ol>
  </div>
);


class Maps extends Component {
  constructor(props){
    super(props);
    const wow = new WOW.WOW();
    wow.init();
    this.state = {
     
    }
  }
  render() {
    return (

      <div class="wow slideInLeft">
          <PlacesWithStandaloneSearchBox 
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `390px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
          />
      </div>
    );
  }
}

export default connect((state)=>state)(Maps)
