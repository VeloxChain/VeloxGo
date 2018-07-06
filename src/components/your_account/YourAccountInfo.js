import React, { Component } from "react";
import styles from "./YourAccountComponentStyle";
import Dropzone from "react-dropzone";
import { Dialog } from "material-ui";
import _ from "lodash";
import ImageCroperProfile from "../image_croper/ImageCroperProfile";

class YourAccountInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpenCropImage: false,
            imagePreview: "https://gateway.ipfs.io/ipfs/" + this.props.userProfile.data.avatar
        };
    }

    _renderPreview = () => {
        if (this.state.imagePreview) {
            return <img src={this.state.imagePreview} style={{width:"100%", height: "100%", objectFit : "cover"}} alt="BikeCoin" />;
        }
        return <i className="fa fa-camera icon-camera"></i>;
    }

    onHandleOpenCropImage = () => {
        this.setState({
            isOpenCropImage: true
        });
    }

    onHandleCloseCropImage = () => {
        this.setState({
            isOpenCropImage: false
        });
    }

    onDrop = (images) => {
        if (_.isEmpty(images)) {
            return;
        }
        images = images[0];
        this.readFile(images, "images");
    }

    readFile = (file, name) => {
        var fileReader = new FileReader();
        fileReader.onload = (event) => {
            var fileData = event.target.result;
            if (name === "images") {
                this.setState({
                    imageData: new Buffer(fileData),
                    avatar: file.name,
                    imagePreview: file.preview
                });

                let data = [];
                data["imageData"] = new Buffer(fileData);

                this.props.onChangeAvatar(data);

                this.onHandleOpenCropImage();
                return;
            }
        };
        try {
            fileReader.readAsArrayBuffer(file);
        } catch (e) {
            //
        }
    }
    
    handleCropImage = (newSrc) => {
        this.setState({
            imageData: new Buffer(newSrc.replace(/^data:image\/(png|gif|jpeg|jpg);base64,/,""), "base64"),
            imagePreview: newSrc
        });

        let data = [];
        data["imageData"] = new Buffer(newSrc.replace(/^data:image\/(png|gif|jpeg|jpg);base64,/,""), "base64");

        this.props.onChangeAvatar(data);
    }

    render() {
        let { userProfile } = this.props;
        return (
            <div style={styles.wrappLeft}>
                <Dialog
                    title="Select an area on image"
                    modal={false}
                    onRequestClose={this.onHandleCloseCropImage}
                    open={this.state.isOpenCropImage}
                    autoScrollBodyContent={true}
                    repositionOnUpdate={true}
                >
                    <ImageCroperProfile
                        handleCropImage={this.handleCropImage}
                        imagePreview={this.state.imagePreview}
                        onHandleCloseCropImage={this.onHandleCloseCropImage}
                        aspect={1 / 1}
                    />
                </Dialog>
                <div style={styles.wrappTop}>
                    <div style={{float:"left", marginRight: 20}}>
                        <Dropzone onDrop={this.onDrop} className="avatarDropProfile" multiple={false} activeClassName="onDrop" accept=".jpeg,.jpg,.png">
                            { this._renderPreview() }
                        </Dropzone>
                    </div>
                    <div style={{float:"left"}}>
                        <h4 style={styles.name}>{userProfile.data.firstname + " " + userProfile.data.lastname}</h4>
                        <p style={styles.text}>
                            BKC: {this.props.info.bkc}
                            <br />
                            ETH: {this.props.info.eth}
                        </p>
                        <button style={styles.buttonCollect}>
                            <span>collect 200 </span>
                            <img src="images/icon.png" alt="Bikecoin" style={styles.icon} />
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default YourAccountInfo;
