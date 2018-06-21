import React, { Component } from "react";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import Web3 from "web3";
import  {verifyEmail, verifyNumber } from "../../../utils/validators";
import { addUserProfile } from "../../../actions/userProfileActions";
import { useMetamask } from "../../../actions/appAction";
import Dropzone from "react-dropzone";
import _ from "lodash";
class CreateAccount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            accountAddress: this.props.userProfile.data.accountAddress,
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
            errors : {
                accountAddress: "",
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
        return (errors.accountAddress === "" && errors.passpharse === "" && errors.avatar === "" && errors.firstname === "" && errors.lastname === "" && errors.email === "" && errors.gasPrice === "" && errors.gasLimit === "");
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

        if (this.state.accountAddress === "") {
            state = { ...state, errors:  { ...state.errors, accountAddress : "Account name is empty"}};
        } else {
            state = { ...state, errors:  { ...state.errors, accountAddress : ""}};
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

        if (this.state.passpharse === "" && this.props.metamask === false) {
            state = { ...state, errors:  { ...state.errors, passpharse : "Passpharse is invalid"}};
        } else {
            state = { ...state, errors:  { ...state.errors, passpharse : ""}};
        }
        this.setState(state);
    }
    createProfile = () => {
        if (this.state.submitted) {
            return;
        }
        this.validate();
        if (this.isValidData()){
            // let isMetamask = true;
            // this.submitTransaction();
            // let address = this.getAccountAddress();
            // let self = this;
            // this.props.api.retreiveAccount(address,, this.state.email).then((data)=>{
            //     var keyString = "";
            //     if (!self.props.metamask) {
            //         isMetamask = false;
            //         keyString = this.props.accounts.accounts[address].key;
            //     }
            //     self.setState({
            //         isMetamask:isMetamask,
            //         accountAddress:address,
            //         publicKey: data.publicKey,
            //         privateKey: data.privateKey
            //     });
            //     try {
            //         self.props.ethereum.deployUserProfile(
            //             address,
            //             self.state.firstname,
            //             self.state.lastname,
            //             self.state.passpharse,
            //             self.state.email,
            //             data.publicKey,
            //             self.state.gasLimit,
            //             self.state.gasPrice*100000000,
            //             isMetamask,
            //             self.rejectTransaction,
            //             self.submitTransaction,
            //             self.addUserProfile,
            //             self.getContractAddress,
            //             keyString
            //         );
            //     } catch (e) {
            //         var state = self.state;
            //         state = { ...state, errors:  { ...state.errors, passpharse : "Passpharse is invalid"}};
            //         self.setState(state);
            //     }
            // });
        }
    }
    getContractAddress = (userProfileAddress) => {
        this.setState({
            userProfileAddress:userProfileAddress
        });
    }
    addUserProfile = () => {
        this.props.dispatch(addUserProfile(this.state));
        this.props.dispatch(useMetamask(this.state.isMetamask));
        this.props.closeModal();
    }
    rejectTransaction = () => {
        this.setState({submitted: false, labelButton: "CREATE NEXTID ACCOUNT"});
    }
    submitTransaction = () => {
        this.setState({submitted: true, labelButton: "PENDING..."});
    }
    getAccountAddress = () => {
        let address = "";
        if (this.props.metamask) {
            var web3js = null;
            if (typeof window.web3 !== "undefined") {
                web3js = new Web3(window.web3.currentProvider);
                address = web3js.eth.accounts[0];
            } else {
                alert("No web3? You should consider trying MetaMask!");
                return;
            }
        } else {
            address = this.props.accounts.address;
        }
        return address;
    }
    onDrop = (images) => {
        if (_.isEmpty(images)) {
            return;
        }
        images = images[0];
        this.setState({ preview: images.preview });
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
                    <Dropzone onDrop={this.onDrop} className="avatarDrop" multiple={false} activeClassName="onDrop">
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

                    <TextField
                        floatingLabelText="Account address"
                        fullWidth={true}
                        disabled={this.state.disabled}
                        value={this.getAccountAddress()}
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
                    {
                        this.props.metamask ?
                            (
                                undefined
                            )
                            :
                            (
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
                            )
                    }

                    <div className="flexible-end mg30-0">
                        <RaisedButton
                            label={this.state.labelButton}
                            labelColor="#fff"
                            disabled={this.state.disabled}
                            backgroundColor="#5c57a3"
                            onClick={this.createProfile}
                        />
                    </div>
                </div>

            </div>
        );
    }
}

export default CreateAccount;
