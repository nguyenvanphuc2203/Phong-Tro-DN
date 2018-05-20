import React, { Component } from 'react';
import { BrowserRouter as Router,Route,Link } from 'react-router-dom';
import { connect } from 'react-redux';
import store from '../store/store';
import $ from "jquery";
import toastr from 'toastr';
import ImagesUploader from 'react-images-uploader';
import 'react-images-uploader/styles.css';
import 'react-images-uploader/font.css';
import { WithContext as ReactTags } from 'react-tag-input';
import ImageUploader from 'react-images-upload';
import cloudinary from 'cloudinary';
import { SERVER_URL } from '../config';

cloudinary.config('izmedia-net','719937479881317','EJltXAn2fjKWFVkOSw1ppQixWXY')
class FormChoThue extends Component {
  constructor(props){
    super(props);
    this.state = {
      pictures: [],
      tags: [
          { id: "WIFI", text: "Wifi Miễn Phí" },
          { id: "Chung chủ", text: "Chung chủ" }
       ],
      suggestions: [
        { id: "WIFI", text: "Wifi Miễn Phí" },
        { id: "Chung chủ", text: "Chung chủ" },
        { id: "Giờ Giấc Tự do", text: "Giờ Giấc Tự do" },
        { id: "Gác Lửng", text: "Gác Lửng" },
        { id: "Rộng Rãi", text: "Rộng Rãi" }
       ]
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.handleAddition = this.handleAddition.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
    this.onDrop = this.onDrop.bind(this);
  }
  onDrop(picture) {
    this.setState({
        pictures: this.state.pictures.concat(picture),
    });
    this.state.pictures.map(file => {
      var reader = new FileReader();
      reader.onloadend = function() {
        console.log('RESULT', reader.result)
        cloudinary.uploader.upload( reader.result, {
          "crop":"limit",
          "tags":"samples",
          "width":3000,
          "height":2000
        }, 
        function(result) { console.log(result) });
      }
      reader.readAsDataURL(file[0]);
    })
  }
  handleDelete(i) {
    const { tags } = this.state;
    this.setState({
     tags: tags.filter((tag, index) => index !== i),
    });
  }
  handleAddition(tag) {
    const { tags } = this.state;
    this.setState({tags: [...tags, ...[tag]] });
  }
  handleDrag(tag, currPos, newPos) {
    const tags = [...this.state.tags];
    const newTags = tags.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    // re-render
    this.setState({ tags: newTags });
  }
  postItem(){
    if ( this.refs.lat.value != '' && this.refs.lng.value != '' && this.refs.title.value != '' && this.refs.price.value != '' ) {
      // post data to server node 
      fetch(SERVER_URL+'/postitem', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          lat: this.refs.lat.value,
          lng: this.refs.lng.value,
          title: this.refs.title.value,
          price: this.refs.price.value,
          phone: this.refs.phone.value,
          user_id:this.props.user.id,
          status: true,
          service: this.state.tags
        }),
      });
      toastr.success('Đăng tin cho thuê thành công !')
    }else{
      toastr.error('vui lòng điền đầy đủ thông tin !')
    }
    
  }
  toggle(){
      $('.collapse_maps').click()
      toastr.warning('Kéo thả để  chọn vị trí !',"Hướng dẫn")
  }
  render() {
    $( "#address" ).click(function() {
      $('.collapse_maps').click()
      $('#input_search').focus()
    });
    return (
        <div class="form-post">
          <div class="row">
            <div class="col-md-6">
              <input class="input-post" type="hidden" ref="lat" id="lat_pick" placeholder="kinh độ" />
              <input class="input-post" type="hidden" ref="lng" id="lng_pick" placeholder="vĩ độ" />
              <input class="input-post" onClick={this.toggle} ref="address" id="address" placeholder="Vị Trí Nhà Trọ Của Bạn" />
              <input class="input-post" ref="title" type="text" placeholder="Tiêu đề tin"/>
              <input class="input-post" ref="price"  placeholder="Giá/Tháng"/>
              <input class="input-post" ref="phone" type="text" placeholder="Số Điện thoại * bắt buộc"/>
              <ReactTags class="input-post" tags={this.state.tags}
                    suggestions={this.state.suggestions}
                    handleDelete={this.handleDelete}
                    handleAddition={this.handleAddition}
                    handleDrag={this.handleDrag}
                    inline={true}
                    placeholder="Đặc Điểm Tiện Nghi Ngôi Nhà?" />
              <input  onClick={this.postItem.bind(this)}  class="btn btn-success button-input-post" type="submit" value="ĐĂNG TIN!"/>
            </div>
            <div class="col-md-6">
              <div class="imageUpload">
                  <ImageUploader
                      withIcon={true}
                      withPreview={true}
                      accept='image/*'
                      fileSizeError='kích thước ảnh quá lớn!'
                      fileTypeError='định dạng không được hỗ trợ!'
                      buttonText='Chọn Một Bức Ảnh'
                      onChange={this.onDrop}
                      imgExtension={['.jpg', '.gif', '.png', '.gif']}
                      maxFileSize={5242880}
                  />
              </div>
            </div>
          </div>
        </div>
    );
  }
}

export default connect(state=>state)(FormChoThue);
