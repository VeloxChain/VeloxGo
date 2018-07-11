import React, { Component } from "react";
import TextField from "material-ui/TextField";
import  {verifyEmail } from "../../../utils/validators";
import { createUserProfileToIPFS } from "../../../actions/userProfileActions";
import Dropzone from "react-dropzone";
import _ from "lodash";
import styles from "./CustomCss";
import { toast } from "react-toastify";
import { Dialog } from "material-ui";
import ImageCroperProfile from "../../image_croper/ImageCroperProfile";

class CreateAccount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            passpharse: "",
            firstname: "",
            lastname: "",
            avatar: "",
            email: "",
            disabled:false,
            submitted:false,
            labelButton: "CREATE BIKECOIN ACCOUNT",
            imageData: "",
            isOpenCropImage: false,
            imagePreview: "images/avatar.png"
        };
    }

    handleKeyPress = (target) => {
        if(target.charCode===13){
            this.createProfile();
        }
    }

    validate = async () => {
        let isValidEmail = await verifyEmail(this.state.email);
        if (!isValidEmail) {
            return 'Invalid Email';
        }
        if (this.state.firstname === "") {
            return 'Invalid First Name';
        }
        if (this.state.lastname === "") {
            return 'Invalid Last Name';
        }
        if (this.state.passpharse === "" && this.isMetamask() === false) {
            return 'Invalid Passpharse';
        }
        
        return '';
    }

    createProfile = async () => {
        if (this.state.submitted) {
            return;
        }
        let validDataMessenger = await this.validate();
        if (validDataMessenger != '') {
            toast.error(validDataMessenger);
            return;
        }
        var state = this.state;
        let userInfo = {
            email: state.email,
            isCreateNew: true,
            lastname: state.lastname,
            firstname: state.firstname,
            avatarData: state.imageData,
            avatar: state.avatar,
            accountAddress:this.props.getAccountAddress(),
            ethereum: this.props.ethereum,
            keyStore: this.props.accounts.accounts.key,
            passphrase: state.passpharse
        };
        await this.props.dispatch(createUserProfileToIPFS(userInfo));
        this.props.closeModal();
    }

    getContractAddress = (userProfileAddress) => {
        this.setState({
            userProfileAddress:userProfileAddress
        });
    }

    rejectTransaction = () => {
        this.setState({submitted: false, labelButton: "CREATE NEXTID ACCOUNT"});
    }

    submitTransaction = () => {
        this.setState({submitted: true, labelButton: "PENDING..."});
    }
    
    isMetamask =  () => {
        const { accounts } = this.props;
        return (_.isEmpty(accounts.accounts) || accounts.accounts.key === "" || accounts.accounts.keystring === "" || _.isUndefined(accounts.accounts.key));
    }
    
    _renderPassphrase = () => {
        if (this.isMetamask()) {
            return undefined;
        }
        return (
            <TextField
                floatingLabelText="Passpharse"
                fullWidth={true}
                type="password"
                disabled={this.state.disabled}
                value={this.state.passpharse}
                errorText={ this.state.errors ? this.state.errors.passpharse : null }
                onKeyPress={(e) => this.handleKeyPress(e)}
                onChange={(e) => this.setState({passpharse: e.target.value})}
            />
        );
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

    _renderPreview = () => {
        if (this.state.imagePreview) {
            return <img src={ this.state.imagePreview } style={{width:"100%", height: "100%", objectFit : "cover"}} alt="BikeCoin" />;
        }
        return <i className="fa fa-camera icon-camera"></i>;
    }

    handleCropImage = (newSrc) => {
        this.setState({
            imageData: new Buffer(newSrc.replace(/^data:image\/(png|gif|jpeg|jpg);base64,/,""), "base64"),
            // imageName: file.name,
            imagePreview: newSrc
        });
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

    render() {
        return (
            <div className="mh250 pd10 relative">
                {
                    this.state.submitted ?
                        (
                            <div className="absolute-fancy-loading flexible">
                                <div className="loader-medium" />
                            </div>
                        )
                        : undefined
                }

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

                <div className="form-modal">

                    <Dropzone onDrop={this.onDrop} className="avatarDrop" multiple={false} activeClassName="onDrop" accept=".jpeg,.jpg,.png">
                        { this._renderPreview() }
                    </Dropzone>

                    <TextField
                        floatingLabelText="Account address"
                        fullWidth={true}
                        disabled={this.state.disabled}
                        value={this.props.getAccountAddress()}
                        underlineStyle={styles.underlineStyle}
                        floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                        underlineFocusStyle={styles.underlineStyle}
                    /><br />
                    <TextField
                        floatingLabelText="Email"
                        fullWidth={true}
                        type="email"
                        disabled={this.state.disabled}
                        value={this.state.email}
                        errorText={ this.state.errors ? this.state.errors.email : null}
                        onKeyPress={(e) => this.handleKeyPress(e)}
                        onChange={(e) => this.setState({email: e.target.value})}
                        underlineStyle={styles.underlineStyle}
                        floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                        underlineFocusStyle={styles.underlineStyle}
                    /><br />
                    <TextField
                        floatingLabelText="First Name"
                        fullWidth={true}
                        disabled={this.state.disabled}
                        value={this.state.firstname}
                        errorText={ this.state.errors ? this.state.errors.firstname : null}
                        onKeyPress={(e) => this.handleKeyPress(e)}
                        onChange={(e) => this.setState({firstname: e.target.value})}
                        underlineStyle={styles.underlineStyle}
                        floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                        underlineFocusStyle={styles.underlineStyle}
                    /><br />
                    <TextField
                        floatingLabelText="Last Name"
                        fullWidth={true}
                        disabled={this.state.disabled}
                        value={this.state.lastname}
                        errorText={ this.state.errors ? this.state.errors.lastname : null}
                        onKeyPress={(e) => this.handleKeyPress(e)}
                        onChange={(e) => this.setState({lastname: e.target.value})}
                        underlineStyle={styles.underlineStyle}
                        floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                        underlineFocusStyle={styles.underlineStyle}
                    /><br />
                    {this._renderPassphrase()}
                </div>

                <div className="action-form">
                    <button
                        disabled={this.state.disabled}
                        onClick={this.createProfile}
                        style={styles.buttonBack}
                    >
                        {this.state.labelButton}
                    </button>
                </div>
            </div>
        );
    }
}

export default CreateAccount;
