import React, { Component } from "react";
import TextField from "material-ui/TextField";
import styles from "../CustomCss";
import Dropzone from "react-dropzone";
import _ from "lodash";
import { Dialog } from "material-ui";
import ImageCroper from "../../../image_croper/ImageCroper";
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

class RegisterBikeInformation extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpenCropImage: false,
            imagePreview: null
        };
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
                this.props.handleChangeState({
                    imageData: new Buffer(fileData),
                    imageName: file.name,
                    imagePreview: file.preview
                });

                this.setState({
                    imagePreview: file.preview
                });

                // setTimeout(()=> this.onHandleOpenCropImage(), 3000)

                this.onHandleOpenCropImage();
                return;
            }
            this.props.handleChangeState({
                invoiceData: new Buffer(fileData),
                invoiceName: file.name,
            });
        };
        try {
            fileReader.readAsArrayBuffer(file);
        } catch (e) {
            //
        }
    }
    _renderPreview = () => {
        if (this.props.info.imagePreview) {
            return <img src={ this.props.info.imagePreview } style={{width:"100%", height: "100%", objectFit : "cover"}} alt="BikeCoin" />;
        }
        return <i className="fa fa-camera icon-camera"></i>;
    }

    base64ToArrayBuffer = (base64) => {
        var binary_string =  window.atob(base64);
        var len = binary_string.length;
        var bytes = new Uint8Array( len );
        for (var i = 0; i < len; i++)        {
            bytes[i] = binary_string.charCodeAt(i);
        }
        return bytes.buffer;
    }

    handleCropImage = (newSrc) => {
        this.props.handleChangeState({
            imageData: new Buffer(newSrc.replace(/^data:image\/(png|gif|jpeg|jpg);base64,/,""), "base64"),
            // imageName: file.name,
            imagePreview: newSrc
        });
    }

    render() {
        return (
            <div className="wrapp">
                <Dialog
                    title="Select an area on image"
                    modal={false}
                    onRequestClose={this.onHandleCloseCropImage}
                    open={this.state.isOpenCropImage}
                    autoScrollBodyContent={true}
                    repositionOnUpdate={true}
                >
                    <ImageCroper
                        handleCropImage={this.handleCropImage}
                        handleChangeState={this.props.handleChangeState}
                        imagePreview={this.state.imagePreview}
                        onHandleCloseCropImage={this.onHandleCloseCropImage}
                        aspect={10 / 7}
                    />
                </Dialog>

                <div className="w100p">
                    <Dropzone onDrop={this.onDrop} style={styles.dropzone} multiple={false} activeClassName="onDrop" accept=".jpeg,.jpg,.png">
                        { this._renderPreview() }
                    </Dropzone>

                    <div className="row">
                        <div className="col-sm-8 col-sm-offset-2">
                            <TextField
                                floatingLabelText="Manufacturer"
                                value={this.props.info.manufacturer}
                                fullWidth
                                onChange={(e) => this.props.handleChangeState({manufacturer: e.target.value})}
                                floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                                underlineFocusStyle={styles.underlineStyle}
                            />
                            <TextField
                                floatingLabelText="Owner"
                                value={this.props.info.owner}
                                fullWidth
                                floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                                underlineFocusStyle={styles.underlineStyle}
                            />
                            <TextField
                                floatingLabelText="Bike serial"
                                value={this.props.info.snNumber}
                                fullWidth
                                onChange={(e) => this.props.handleChangeState({snNumber: e.target.value})}
                                floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                                underlineFocusStyle={styles.underlineStyle}
                            />

                            <SelectField
                                floatingLabelText="Model"
                                value={this.props.info.model}
                                onChange={(event, index, value) => this.props.handleChangeState({model: value})}
                                selectedMenuItemStyle={styles.selectedMenuItemStyle}
                                style={styles.mb20}
                                fullWidth
                            >
                                <MenuItem value={"Model 1"} primaryText="Model 1" />
                                <MenuItem value={"Model 1C"} primaryText="Model 1C" />
                            </SelectField>

                            <p style={styles.upload}>Upload your invoice</p>
                            <input type="file" onChange={(event)=> this.readFile(event.target.files[0], "invoice")} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default RegisterBikeInformation;
