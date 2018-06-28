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
                aspect: 10 / 7,
                naturalWidth: 0,
                naturalHeight: 0,
            },
        };
    }

    onHandleChangeCrop = crop => {
        this.setState({
            crop: {
                ...this.state.crop,
                ...crop 
            }
        });
    }

    snapshotResize = () => {
        let srcData = this.props.imagePreview;
        let width = this.state.crop.width * this.state.crop.naturalWidth /100;
        let height = this.state.crop.height * this.state.crop.naturalHeight /100;

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
  
        aspectRadio = imageObj.width / imageObj.height;
        newHeight   = height,
        newWidth    = aspectRadio * height;
        xStart      = -(newWidth - width) / 2;
        
        ctx.drawImage(imageObj, xStart, yStart, newWidth, newHeight);
  
        let newSrc = canvas.toDataURL();
        

        this.props.handleChangeState({
            // imageData: new Buffer(fileData),
            // imageName: file.name,
            imagePreview: newSrc
        });
    }
  

    onImageLoaded = (image) => {
        let newCrop = makeAspectCrop(
            {
                x: 0,
                y: 0,
                aspect: 10 / 7,
                width: 20,
            },
            image.width / image.height
        );

        newCrop["naturalWidth"] = image.naturalWidth;
        newCrop["naturalHeight"] = image.naturalHeight;
    
        this.setState({
            crop: newCrop,
        });

        setTimeout(() => { window.dispatchEvent(new Event("resize")); }, 0);
    }

    render(){
        return (
            <div>
                <div className="row" style={styles.bodyContent}>
                    <ReactCrop
                        src={this.props.imagePreview}
                        crop={this.state.crop}
                        onImageLoaded={this.onImageLoaded}
                        onChange={this.onHandleChangeCrop}
                    />
                </div>
                <div className="row pull-right" style={styles.actionFooter}>
                    <RaisedButton label="Cancel" onClick={this.props.onHandleCloseCropImage}/>
                    <RaisedButton label="Apply"
                        style={{marginLeft: "10px"}}
                        secondary={true} 
                        onClick={ () => {
                            this.snapshotResize();
                            this.props.onHandleCloseCropImage();
                        }}
                    />
                </div>
            </div>
        );
    }
}

export default ImageCroper;