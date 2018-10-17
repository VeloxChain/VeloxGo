import React, { Component } from "react";
import TextField from "material-ui/TextField";
import { MODAL_CREATE_ACCOUNT_BIKECOIN } from "../constants";
import {addEthereumKey, useMetamask} from "../../../actions/appAction";
import { addressFromKey } from "../../../utils/keys";
import { emptyForm } from "../../../actions/createKeyStoreActions";
import { verifyPassphrase, anyErrors } from "../../../utils/validators";
import { createAccount } from "../../../actions/accountActions";
import styles from "./CustomCss";
import { toast } from "react-toastify";

class NewAccount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            accountName: "",
            passpharse: "",
            rePasspharse: "",
            address: "",
            key: "",
            error: false,
            errorName: false,
            errorPass: false,
            loading: false,
            step:1,
            isDownload: false
        };
    }
    handleKeyPress = (target) => {
        if(target.charCode===13){
            this.createAccount(target);
        }
    }
    validation = () => {
        if (this.state.accountName.trim() === "") {
            this.setState({errorName: "Please fill out the field"});
            return false;
        }
        if (this.state.passpharse.trim() === "") {
            this.setState({errorPass: "Please fill out the field"});
            return false;
        }
        return true;
    }
    createAccount = (event) => {
        event.preventDefault();
        let errors = {};
        let ethereum = this.props.ethereum;
        let password = this.state.passpharse;
        let repassword = this.state.rePasspharse;
        errors["passwordError"] = verifyPassphrase(password, repassword);
        if (!this.validation()) {
            return;
        }
        if (anyErrors(errors)) {
            this.setState({ error: "The rePasspharse does not match" });
        } else {
            this.setState({
                loading:true
            });
            let keyString = JSON.stringify(ethereum.createNewAddress(password));
            let address = addressFromKey(keyString);
            this.props.dispatch(createAccount(address, keyString, this.state.accountName, ""));
            this.props.dispatch(emptyForm());
            this.props.dispatch(useMetamask(false));
            addEthereumKey(this.props.dispatch, {address: address, key: keyString, account_name: this.state.accountName});
            this.setState(
                {
                    address: address,
                    key: keyString,
                    step:2,
                    loading:false,
                }
            );

        }
    }
    nextStep = () => {
        if (this.state.isDownload) {
            this.props.setType(MODAL_CREATE_ACCOUNT_BIKECOIN);
        } else {
            toast.error("Please backup your wallet!");
        }
    }

    downloadKeyStore = () => {
        var keystore = this.state.key;
        var address = this.state.address;
        var element = document.createElement("a");
        element.setAttribute("href", "data:text/plain;c;harset=utf-8," + encodeURIComponent(keystore));
        element.setAttribute("download", address);
        element.style.display = "none";
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
        this.setState({
            isDownload: true
        });
    }

    _renderBody = () => {
        if (this.state.step === 1) {
            return (
                <div>
                    <TextField
                        floatingLabelText="Account name"
                        fullWidth={true}
                        value={this.state.accountName}
                        errorText={this.state.errorName}
                        onKeyPress={(e) => this.handleKeyPress(e)}
                        onChange={(e) => this.setState({accountName: e.target.value, errorName: false})}
                        floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                        underlineFocusStyle={styles.underlineStyle}
                    /><br />
                    <TextField
                        floatingLabelText="Passpharse"
                        fullWidth={true}
                        type="password"
                        value={this.state.passpharse}
                        errorText={this.state.errorPass}
                        onKeyPress={(e) => this.handleKeyPress(e)}
                        onChange={(e) => this.setState({passpharse: e.target.value, errorPass: false})}
                        floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                        underlineFocusStyle={styles.underlineStyle}
                    /><br />
                    <TextField
                        floatingLabelText="Retype Passpharse"
                        fullWidth={true}
                        type="password"
                        value={this.state.rePasspharse}
                        errorText={this.state.error}
                        onKeyPress={(e) => this.handleKeyPress(e)}
                        onChange={(e) => this.setState({rePasspharse: e.target.value, error: false})}
                        floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                        underlineFocusStyle={styles.underlineStyle}
                    />
                </div>
            );
        }
        return (
            <div className="downloadKeyStore flexible mgb-30">
                <div className="text-center">
                    <h3 className="mgb-30 key-store">Download Your Key Store</h3>
                    <button className="btn" onClick={this.downloadKeyStore}>
                        <i className="fa fa-download"></i>
                    </button>
                </div>
            </div>
        );
    }

    render() {
        return (
            <div className="mh250 pd10">
                <div className="form-modal">
                    {this._renderBody()}
                </div>
                <div className="action-form">
                    {
                        !this.state.loading ?
                            (
                                <button
                                    onClick={(e) => this.state.step === 1 ? this.createAccount(e) : this.nextStep(e)}
                                    style={styles.buttonBack}
                                >
                                    {this.state.step === 1 ? "CREATE AN ACCOUNT" : "NEXT"}
                                </button>
                            )
                            :
                            (
                                <div className="maskButton pd-5-50">
                                    <div className="loader-mini" />
                                </div>
                            )
                    }
                </div>
            </div>
        );
    }
}

export default NewAccount;
