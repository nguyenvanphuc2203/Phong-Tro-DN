import React, { Component } from 'react';
import { connect } from 'react-redux';
import store from '../store/store';
import toastr from 'toastr';
import $ from "jquery";
import axios from 'axios';
import WOW from 'wowjs';
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
        sendComment:()=>{
          alert('ok')
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
        id="input_search"
        type="text"
        placeholder="Bạn muốn tìm trọ ở đâu?"
        style={{
          boxSizing: `border-box`,
          border: `1px solid transparent`,
          width: `240px`,
          height: `48px`,
          marginTop: `11px`,
          marginLeft: `-54px`,
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
    {console.log(props.markers)}
    {props.markers.map((marker, index) =>
      <Marker
        options={{icon: 'https://i.imgur.com/1LPtwiF.png'}}
        key={index} 
        position={marker.position} />
    )}
    {props.nhatro.map((nhatro, index) =>
        <Marker
          key={index}
          options={{icon: 'https://i.imgur.com/9G5JOp8.png'}}
          position={nhatro}
          onClick={()=>{ props.showInfo(index)} }
        >
          { (props.showInfoIndex === index ) && 
          <InfoWindow  onCloseClick={props.onToggleOpen}>
            <div onClick={()=>{}} class="wow slideInLeft">
              <div className="nhatro_image">
                <img src="https://i.imgur.com/7IgBxnH.jpg" width="300px" />
                <div className="nhatro_phone"><i class="fas fa-mobile-alt"></i> {nhatro.phone}</div>
                <div className="nhatro_status">{ nhatro.status ? "" : " Đã Cho Thuê "}</div>
              </div>
              <div className="infobox">
                <div >{nhatro.title}</div>
                <div className="price">{nhatro.price}</div>
              </div>
              <ul className="list-group">
                {nhatro.service.map(service => <li className="list-group-item">{service.text}</li> )}
              </ul>
              <div className="comment" data-toggle="collapse" data-target="#comment">
                <i class="far fa-comments" ></i> Comment
              </div>
              <div id="comment" class="collapse">
                <div>
                  <input id="comment_text" onKeyPress={
                    (ev)=>{
                      if (ev.key === 'Enter') {
                        // add database
                        let comment_text = $('#comment_text').val();
                        $('#comment_text').val('');
                        toastr.success('Cảm ơn bạn đã để lại đánh giá!')
                        fetch('http://localhost:8080/addcomment', {
                          method: 'POST',
                          headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                          },
                          body: JSON.stringify({
                            id: nhatro._id,
                            user_image: props.user_image,
                            comment: comment_text
                        }),
                      });

                      }
                    }
                  } type="text" className="input-comment" size="35" placeholder="Nhập Đánh giá Của Bạn" />
                  <div className="box_comment">
                    {nhatro.comments.map(comment => 
                      <div className="comment-item">
                        <img className="image-user-comment" src={comment.user_image} width="300px" />
                        <p> {comment.comment}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </InfoWindow>}
        </Marker>
    )}
  </GoogleMap>
);

class Maps extends Component {
  constructor(props){
    super(props);
    const wow = new WOW.WOW();
    wow.init();
    this.state = {
      nhatro : []
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
        <MapWithASearchBox 
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `390px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
          nhatro={this.state.nhatro}
          user_image={this.props.user.picture.data.url} />
            
      </div>
    );
  }
}

export default connect((state)=>state)(Maps)
