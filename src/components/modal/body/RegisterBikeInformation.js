import React, { Component } from "react";
import TextField from "material-ui/TextField";
import styles from "./CustomCss";
import Dropzone from "react-dropzone";
import _ from "lodash";

class RegisterBikeInformation extends Component {
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
            return <img src={ this.props.info.imagePreview } style={{width:"100%", height: "100%", objectFit : "cover"}} alt="" />;
        }
        return <i className="fa fa-camera icon-camera"></i>;
    }

    render() {
        return (
            <div className="wrapp">
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

                            />
                            <TextField
                                floatingLabelText="Owner"
                                value={this.props.info.owner}
                                fullWidth
                            />
                            <TextField
                                floatingLabelText="Bike serial"
                                value={this.props.info.snNumber}
                                fullWidth
                                style={styles.mb20}
                                onChange={(e) => this.props.handleChangeState({snNumber: e.target.value})}
                            />

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
