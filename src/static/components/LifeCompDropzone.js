import React from 'react';
import DropzoneComponent from 'react-dropzone-component';
import {CLOUDINARY_UPLOAD_URL} from '../config'


class LifeCompDropzone extends React.Component {

    constructor(props){

        super(props);
        this.compKey= props.compKey;
        this.compValue= props.compValue;
        this.userId = props.userId;
    }

    static propTypes =  {
        compKey: React.PropTypes.string.isRequired,
        compValue: React.PropTypes.string.isRequired,
        userId: React.PropTypes.number.isRequired
    }

    myDropzone = {};

    // Initialize dropzone object
    initCallback = (dropzone) => {
        this.myDropzone = dropzone;
        /*const mockFile = { name: "Filename", size: 12345 };
        myDropzone.emit("addedfile", mockFile);
        myDropzone.files.push(mockFile);
        myDropzone.createThumbnailFromUrl(mockFile, 
        "http://res.cloudinary.com/wordsmith/image/upload/v1484922595/sample.jpg", function() {
        myDropzone.emit("complete", mockFile);
    }, "anonymous");

    var existingFileCount = 1; // The number of files already uploaded
    myDropzone.options.maxFiles = myDropzone.options.maxFiles - existingFileCount;*/
    };

    // Remove file if max allowed files exceeded
    onMaxFilesExceeded = (file) => {
        this.myDropzone.destroy();
        this.myDropzone.removeAllFiles();
    }

    onAddedFile = (file) => {
        //this.myDropzone.removeAllFiles();
    }

    renameFile = () => {
        return this.userId+"_"+this.compKey;
    }

    onSuccess = (file, response) => {
        console.log(response.url)
    }

    params = {
        upload_preset: "h5eyyldh",
    };

    //https://api.cloudinary.com/v1_1/wordsmith/image/upload
    //http://localhost:8000/v1/goals/images/
    //url = REMOTE_BASE_URL + IMAGE_UPLOAD_PATH;


    componentConfig = {
        iconFiletypes: [],
        showFiletypeIcon: true,
        postUrl: CLOUDINARY_UPLOAD_URL
    };

    eventHandlers = {
        init: this.initCallback, 
        maxfilesexceeded: this.onMaxFilesExceeded,
        success: this.onSuccess,
        addedfile: this.onAddedFile
    };

    djsConfig = { 
        autoProcessQueue: true,
        maxFiles: 1,
        params: this.params,
        renameFilename: this.renameFile,
    }

    render() {

        return (
            <div>
                <DropzoneComponent config={this.componentConfig}
                        eventHandlers={this.eventHandlers}
                        djsConfig={this.djsConfig} />
                <div className='dropzone-title'>{this.compValue}</div>
            </div>
        );
    }

    
}

export default LifeCompDropzone;

