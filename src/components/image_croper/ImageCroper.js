import React, { Component } from "react";
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
                aspect: this.props.aspect,
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
            xStart   = this.state.crop.x * this.state.crop.naturalWidth /100,
            yStart   = this.state.crop.y * this.state.crop.naturalHeight /100;
  
        imageObj.src  = srcData;
        canvas.width  = width;
        canvas.height = height;
  
        ctx.drawImage(imageObj, xStart, yStart, width, height, 0, 0, width, height);

        let newSrc = canvas.toDataURL();
        
        this.props.handleCropImage(newSrc);
    }
  

    onImageLoaded = (image) => {
        let newCrop = makeAspectCrop(
            {
                x: 0,
                y: 0,
                aspect: this.props.aspect,
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
                    <button
                        onClick={this.props.onHandleCloseCropImage}
                        style={styles.button}
                    >
                        Cancel
                    </button>
                    <button
                        style={styles.button}
                        onClick={ () => {
                            this.snapshotResize();
                            this.props.onHandleCloseCropImage();
                        }}
                    >Apply</button>
                </div>
            </div>
        );
    }
}

export default ImageCroper;