import React, {Component} from 'react';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import './CloudinaryWidget.css';

const CLOUDINARY_UPLOAD_PRESET = 'prm9b0gh';
const CLOUDINARY_UPLOAD_URL= 'https://api.cloudinary.com/v1_1/personal-project/image/upload';

export default class CloudinaryWidget extends Component {
    constructor(){
        super();
        this.state={
            uploadedFile: null,
            uploadedFileCloudinaryUrl: ''
        }
    }

    onImageDrop(files){
        this.setState({
            uploadedFile: files[0]
        });
        this.handleImageUpload(files[0]);
    }

    handleImageUpload(file){
        let upload = request.post(CLOUDINARY_UPLOAD_URL)
            .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
            .field('file', file);
        upload.end((err, response)=> {
            if(err){
                console.error(err);
            }
            if(response.body.secure_url !== ''){
                this.setState({
                    uploadedFileCloudinaryUrl: response.body.secure_url
                });
            }
        });
    }
    render(){
        return(
            <form>
                <div className='fileUpload'>
                <Dropzone
                multiple={false}
                accept="image/*"
                onDrop={this.onImageDrop.bind(this)} className='fileBox'>
                <p>Drop an image or click to select</p>
                </Dropzone>
                </div>

                <div>
                    {this.state.uploadedFileCloudinaryUrl === '' ? null :
                <div>
                    <p>{this.state.uploadedFile.name}</p>
                    <img src={this.state.uploadedFileCloudinaryUrl} />
                </div>}
                </div>

                
            </form>
        )
    }
}