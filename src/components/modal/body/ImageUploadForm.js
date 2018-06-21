import React from "react";
import { CardMedia } from "material-ui/Card";
import _ from "lodash";
import Dialog from "material-ui/Dialog";
import RaisedButton from "material-ui/RaisedButton";
import styles from "./CustomCss";
import {Cropper} from "react-image-cropper";

export default class ImageUpload extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            imageRoot: "",
            image: this.props.value,
        };
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (!_.isUndefined(nextProps.value)) {
            this.setState({
                image: nextProps.value,
            });
        }
    }

    handleChangeImage(e) {

        if(_.isUndefined(e.target.files[0])){
            return false;
        }

        e.preventDefault();

        const reader = new FileReader();
        const file = e.target.files[0];

        if (file.type.indexOf("image") === -1) {
            this.setState({
                image: null,
            });
        } else {
            reader.onloadend = () => {
                if (_.isFunction(this.props.handleChangeImage)) {
                    this.props.handleChangeImage(reader.result);
                }

                this.setState({
                    imageRoot: reader.result,
                    open: true
                });
            };

            reader.readAsDataURL(file);
        }
    }

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    UNSAFE_componentWillMount() {
        this.setState({
            imageRoot: this.props.value,
        });
    }

    onChange() {
    }

    onClickCrop = () => {

        this.setState({
            image: this.cropper.crop(),
            open: false
        }, () => {
            if (_.isFunction(this.props.handleChangeImage)) {
                this.props.handleChangeImage(this.state.image);
            }
        });
    }

    render() {
        return (
            <div className="avatar">
                <CardMedia>
                    <img src={this.state.image} alt="" />
                </CardMedia>
                <div
                    className={this.state.image === "" ? "uploadNone" : "upload"}
                    onClick={() => {this.inputUpload.click();}}
                >
                    <div style={styles.content}>
                        <input
                            onClick={(event)=> { event.target.value = null; }}
                            ref={(c) => { this.inputUpload = c; }}
                            type="file"
                            id="file"
                            onChange={e => this.handleChangeImage(e)}
                        />
                        <img src="images/picture.png" className="icon-picture" alt="avatar" />
                    </div>
                </div>
                <Dialog
                    title="Crop Image"
                    modal={false}
                    open={this.state.open}
                    bodyStyle={styles.bodyStyle}
                    onRequestClose={this.handleClose}
                >
                    <div style={styles.crop}>
                        {_.isUndefined(this.state.imageRoot) ? "" : (
                            <Cropper
                                allowNewSelection={false}
                                ratio={_.isUndefined(this.props.ratio) ? 1/1 : this.props.ratio}
                                src={this.state.imageRoot}
                                originX={0}
                                originY={0}
                                ref={(c) => { this.cropper = c; }}
                                onChange={(value) => this.onChange(value)}
                            />
                        )}
                    </div>
                    <div className="text-right" style={styles.mt20}>
                        <RaisedButton
                            label="Cancel"
                            onClick={this.handleClose}
                            style={styles.mr10}
                            buttonStyle={styles.buttonStylePopup}
                            labelStyle={styles.labelStyleCancel}
                        />
                        <RaisedButton
                            label="Crop"
                            buttonStyle={styles.buttonStyle}
                            labelStyle={styles.labelStyle}
                            onClick={() => this.onClickCrop()}
                        />
                    </div>
                </Dialog>
            </div>
        );
    }
}
