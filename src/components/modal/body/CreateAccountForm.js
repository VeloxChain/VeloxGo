import React, { Component } from "react";
import TextField from "material-ui/TextField";
// import RaisedButton from "material-ui/RaisedButton";
import  {verifyEmail, verifyNumber } from "../../../utils/validators";
import { uploadUserProfileToIPFS } from "../../../actions/userProfileActions";
// import { useMetamask } from "../../../actions/appAction";
import Dropzone from "react-dropzone";
import _ from "lodash";
import styles from "./CustomCss";

class CreateAccount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            passpharse: "",
            firstname: "",
            lastname: "",
            avatar: "",
            email: "",
            gasLimit: 4712388,
            gasPrice: 50,
            disabled:false,
            submitted:false,
            labelButton: "CREATE BIKECOIN ACCOUNT",
            fileData: "",
            preview: "",
            errors : {
                passpharse: "",
                firstname: "",
                lastname: "",
                avatar: "",
                email: "",
                gasLimit: "",
                gasPrice: ""
            }
        };
    }
    handleKeyPress = (target) => {
        if(target.charCode===13){
            this.createProfile();
        }
    }

    isValidData = () => {
        var errors = this.state.errors;
        return (errors.passpharse === "" && errors.avatar === "" && errors.firstname === "" && errors.lastname === "" && errors.email === "" && errors.gasPrice === "" && errors.gasLimit === "");
    }
    validate = () => {
        let state = this.state;
        if (!verifyEmail(this.state.email)) {
            state = { ...state, errors:  { ...state.errors, email : "invalid email"}};
        } else {
            state = { ...state, errors:  { ...state.errors, email : ""}};
        }

        if (verifyNumber(this.state.gasLimit) != null) {
            state = { ...state, errors:  { ...state.errors, gasLimit : "invalid Gas Limit"}};
        } else {
            state = { ...state, errors:  { ...state.errors, gasLimit : ""}};
        }

        if (verifyNumber(this.state.gasPrice) != null) {
            state = { ...state, errors:  { ...state.errors, gasPrice : "invalid Gas Price"}};
        } else {
            state = { ...state, errors:  { ...state.errors, gasPrice : ""}};
        }

        if (this.state.firstname === "") {
            state = { ...state, errors:  { ...state.errors, firstname : "First name is empty"}};
        } else {
            state = { ...state, errors:  { ...state.errors, firstname : ""}};
        }
        if (this.state.lastname === "") {
            state = { ...state, errors:  { ...state.errors, lastname : "Last name is empty"}};
        } else {
            state = { ...state, errors:  { ...state.errors, lastname : ""}};
        }
        let accounts = this.props.accounts.account;
        if (this.state.passpharse === "" && (!_.isEmpty(accounts) && (accounts.key !== "" || accounts.keystring !== ""))) {
            state = { ...state, errors:  { ...state.errors, passpharse : "Passpharse is invalid"}};
        } else {
            state = { ...state, errors:  { ...state.errors, passpharse : ""}};
        }
        this.setState(state);
    }
    createProfile = async () => {
        if (this.state.submitted) {
            return;
        }
        if (this.isValidData()){
            var state = this.state;
            let userInfo = {
                email: state.email,
                lastname: state.lastname,
                firstname: state.firstname,
                avatarData: state.fileData,
                avatar: state.avatar,
                accountAddress:this.props.getAccountAddress(),
                ethereum: this.props.ethereum,
                keyStore: this.props.accounts.accounts.key,
                passphrase: state.passpharse
            };
            await this.props.dispatch(uploadUserProfileToIPFS(userInfo));
            this.props.closeModal();
        }
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
    onDrop = (images) => {
        if (_.isEmpty(images)) {
            return;
        }
        images = images[0];
        var fileReader = new FileReader();
        fileReader.onload = (event) => {
            var fileData = event.target.result;
            this.setState({
                // fileData: new Buffer(fileData).toString("base64"),
                fileData: new Buffer(fileData),
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
    _renderPassphrase = () => {
        const { accounts } = this.props;
        if (_.isEmpty(accounts.accounts) || accounts.accounts.key === "" || accounts.accounts.keystring === "" || _.isUndefined(accounts.accounts.key)) {
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
    _renderPreview = () => {
        if (this.state.preview) {
            return (
                <img src={ this.state.preview } style={{width:"100%", height: "100%", objectFit : "cover"}} alt="" />
            );
        }
        return (
            <i className="fa fa-camera icon-camera"></i>
        );
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
                <div className="form-modal">
                    <Dropzone onDrop={this.onDrop} className="avatarDrop" multiple={false} activeClassName="onDrop" accept=".jpeg,.jpg,.png">
                        {this._renderPreview()}
                    </Dropzone>

                    <TextField
                        floatingLabelText="Account address"
                        fullWidth={true}
                        disabled={this.state.disabled}
                        value={this.props.getAccountAddress()}
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
                    /><br />
                    <TextField
                        floatingLabelText="First Name"
                        fullWidth={true}
                        disabled={this.state.disabled}
                        value={this.state.firstname}
                        errorText={ this.state.errors ? this.state.errors.firstname : null}
                        onKeyPress={(e) => this.handleKeyPress(e)}
                        onChange={(e) => this.setState({firstname: e.target.value})}
                    /><br />
                    <TextField
                        floatingLabelText="Last Name"
                        fullWidth={true}
                        disabled={this.state.disabled}
                        value={this.state.lastname}
                        errorText={ this.state.errors ? this.state.errors.lastname : null}
                        onKeyPress={(e) => this.handleKeyPress(e)}
                        onChange={(e) => this.setState({lastname: e.target.value})}
                    /><br />
                    {this._renderPassphrase()}
                    <div className="flexible-end mg30-0">
                        <button
                            disabled={this.state.disabled}
                            onClick={this.createProfile}
                            style={styles.buttonBack}
                        >
                            {this.state.labelButton}
                        </button>
                    </div>
                </div>

            </div>
        );
    }
}

export default CreateAccount;
