import React, { Component } from 'react';

export default class ImageUpload extends Component {
    constructor(props) {
      super(props);
      this.state = {
        file: '',
        imagePreviewUrl: ''
      };
      this._handleImageChange = this._handleImageChange.bind(this);
      this._handleSubmit = this._handleSubmit.bind(this);
    }
  
    _handleSubmit(e) {
      e.preventDefault();
      console.log(this.state.file)
    }
  
    _handleImageChange(e) {
      e.preventDefault();
  
      let reader = new FileReader();
      let file = e.target.files[0];
  
      reader.onloadend = () => {
        this.setState({
          file: file,
          imagePreviewUrl: reader.result
        });
      }
      reader.readAsDataURL(file)
    }
  
    render() {
      let {imagePreviewUrl} = this.state;
      let $imagePreview = null;
      if (imagePreviewUrl) {
        $imagePreview = (<img src={imagePreviewUrl} />);
      }
  
      return (
        <div className="previewComponent">
          <form class="inputheader" onSubmit={this._handleSubmit}>
            <input className="fileInput" type="file" onChange={this._handleImageChange} />
            <button className="submitButton" 
            type="submit" 
            onClick={(e)=>this._handleSubmit(e)}>Upload Image</button>
            <div className="imgPreview">
                {$imagePreview}
             </div>
          </form>
        </div>
      )
    }
  
  }