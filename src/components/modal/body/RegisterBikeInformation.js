import React, { Component } from "react";
import TextField from "material-ui/TextField";
import styles from "./CustomCss";
import Dropzone from "react-dropzone";
import _ from "lodash";

class RegisterBikeInformation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            avatar: "",
            preview: "",

            data: {
                manufacturer: "Volata Cycles",
                owner: "Vuong Pham",
                bike_serial: "2018-BKC-ZbX75728iFp5"
            }
        };
    }

    onDrop = (images) => {
        if (_.isEmpty(images)) {
            return;
        }
        images = images[0];
        var fileReader = new FileReader();
        fileReader.onload = (event) => {
            var fileData = event.target.result;
            this.setState({
                fileData: new Buffer(fileData).toString("base64"),
                avatar: images.name,
                preview: images.preview
            });
        };
        try {
            fileReader.readAsArrayBuffer(images);
        } catch (e) {
            //
        }
    }

    render() {
        return (
            <div className="wrapp">
                <div className="w100p">
                    <Dropzone onDrop={this.onDrop} style={styles.dropzone} multiple={false} activeClassName="onDrop">
                        {
                            this.state.preview ?
                                (
                                    <img src={ this.state.preview } style={{width:"100%", height: "100%", objectFit : "cover"}} alt="" />
                                )
                                :
                                (
                                    <i className="fa fa-camera icon-camera"></i>
                                )
                        }
                    </Dropzone>

                    <div className="row">
                        <div className="col-sm-8 col-sm-offset-2">
                            <TextField
                                floatingLabelText="Manufacturer"
                                value={this.state.data.manufacturer}
                                fullWidth
                            />
                            <TextField
                                floatingLabelText="Owner"
                                value={this.state.data.owner}
                                fullWidth
                            />
                            <TextField
                                floatingLabelText="Bike serial"
                                value={this.state.data.bike_serial}
                                fullWidth
                                style={styles.mb20}
                            />
                            
                            <p style={styles.upload}>Upload your invoice</p>
                            <input
                                type="file"
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default RegisterBikeInformation;
