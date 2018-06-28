import React, { Component } from "react";
import { RaisedButton } from "material-ui";
import ReactCrop, { makeAspectCrop } from "react-image-crop";
import styles from "./ImageCroperStyle";
import "react-image-crop/dist/ReactCrop.css";

class ImageCroper extends Component {
    constructor(props) {
        super(props);

        this.state = {
            crop: {
                x: 10,
                y: 10,
                width: 10,
                height: 7,
                aspect: 10 / 7
            },
        };
    }

    onHandleChangeCrop = crop => {
        this.setState({ crop });
    }

    snapshotResize () {
        let srcData = this.props.imagePreview;
        let width = this.state.crop.width;
        let height = this.state.crop.height;

        let imageObj = new Image(),
            canvas   = document.createElement("canvas"),
            ctx      = canvas.getContext("2d"),
            xStart   = 0,
            yStart   = 0,
            aspectRadio,
            newWidth,
            newHeight;
  
        imageObj.src  = srcData;
        canvas.width  = width;
        canvas.height = height;
  
        aspectRadio = imageObj.height / imageObj.width;
  
        if(imageObj.height < imageObj.width) {
            //horizontal
            aspectRadio = imageObj.width / imageObj.height;
            newHeight   = height,
            newWidth    = aspectRadio * height;
            xStart      = -(newWidth - width) / 2;
        } else {
            //vertical
            newWidth  = width,
            newHeight = aspectRadio * width;
            yStart    = -(newHeight - height) / 2;
        }
  
        ctx.drawImage(imageObj, xStart, yStart, newWidth, newHeight);
  
        let newSrc = canvas.toDataURL("image/jpeg", 0.75);

        this.props.handleChangeState({
            // imageData: new Buffer(fileData),
            // imageName: file.name,
            imagePreview: newSrc
        });
    }
  

    onImageLoaded = (image) => {
        this.setState({
            crop: makeAspectCrop({
                x: 0,
                y: 0,
                aspect: 10 / 7,
                width: 20,
            }, image.width / image.height),
        });

        setTimeout(() => { window.dispatchEvent(new Event("resize")); }, 0);
    }

    onCropComplete = () => {
        let newSRC = this.snapshotResize(this.props.imagePreview, this.state.crop.width, this.state.crop.height);
    }

    render(){
        return (
            <div>
                <div className="row" style={styles.bodyContent}>
                    <ReactCrop
                        src={this.props.imagePreview}
                        crop={this.state.crop}
                        onImageLoaded={this.onImageLoaded}
                        onComplete={this.onCropComplete}
                        onChange={this.onHandleChangeCrop}
                    />
                </div>
                <div className="row pull-right" style={styles.actionFooter}>
                    <RaisedButton label="Cancel" onClick={this.props.onHandleCloseCropImage}/>
                    <RaisedButton label="Apply"
                        style={{marginLeft: "10px"}}
                        secondary={true} 
                        onClick={ () => {
                            this.props.onHandleCloseCropImage();
                            this.props.onHandleCloseCropImage();
                        }}
                    />
                </div>
            </div>
        );
    }
}

export default ImageCroper;