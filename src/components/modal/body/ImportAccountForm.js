import React, { Component } from "react";
import TextField from "material-ui/TextField";
import {
    MODAL_CREATE_ACCOUNT_BIKECOIN,
    // MODAL_INSUFFICIENT_FUNDS
} from "../constants";
import Dropzone from "react-dropzone";

import { specifyName, specifyDesc, throwError, uploadKey } from "../../../actions/importKeystoreActions"; //emptyForm
import { addAccount } from "../../../actions/accountActions";
import { verifyAccount, verifyKey, anyErrors } from "../../../utils/validators";
import { addressFromKey } from "../../../utils/keys";
// import constants from "../../../services/constants";
import { addUserProfile } from "../../../actions/userProfileActions";
import SERVICE_IPFS from "../../../services/ipfs";
import _ from "lodash";
import styles from "./CustomCss";

class ImportAccount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            accountName: "",
            fileName: "",
        };
    }
    specifyName = (event) => {
        this.props.dispatch(specifyName(event.target.value));
    }

    specifyDesc = (event) => {
        this.props.dispatch(specifyDesc(event.target.value));
    }

    lowerCaseKey = (keystring) => {
        var keyObject = JSON.parse(keystring);
        var keyLowerCase = {};
        //lowercase all key
        _.forEach(Object.keys(keyObject), (key) => {
            keyLowerCase[key.toLowerCase()] = keyObject[key];
        });
        return JSON.stringify(keyLowerCase);
    }
    handleKeyPress = (target) => {
        if(target.charCode===13){
            this.importAccount(target);
        }
    }

    importAccount = async (event) => {
        event.preventDefault();
        if (this.props.keystore.keystring === "" || this.state.accountName === "") {
            return;
        }
        var keystring = this.lowerCaseKey(this.props.keystore.keystring);
        var errors = {};
        errors["addressError"] = verifyAccount(this.props.keystore.address);
        errors["keyError"] = verifyKey(keystring);
        if (anyErrors(errors)) {
            this.props.dispatch(throwError("Cannot import invalid keystore file"));
        } else {
            let { keystore } = this.props;
            this.props.dispatch(addAccount(keystore.address, keystore.keystring, this.state.accountName, keystore.desc));
            let hashData = localStorage.getItem("hash");
            if (_.isUndefined(hashData)){
                this.props.setType(MODAL_CREATE_ACCOUNT_BIKECOIN);
                return;
            }
            try {
                var retreiveUserProfile = await SERVICE_IPFS.getDataFromIPFS(hashData);
                retreiveUserProfile = JSON.parse(retreiveUserProfile);
                retreiveUserProfile["accountAddress"] = this.state.account;
                this.props.dispatch(addUserProfile({userProfile: retreiveUserProfile}));
                this.props.closeModal();
            } catch (e) {
                this.props.setType(MODAL_CREATE_ACCOUNT_BIKECOIN);
            }
        }
    }
    onDrop = (files) => {
        var file = files[0];
        var fileReader = new FileReader();
        fileReader.onload = (event) => {
            var keystring = event.target.result;
            try {
                var address = addressFromKey(keystring);
                this.props.dispatch(uploadKey(
                    address, keystring));
            } catch (e) {
                this.props.dispatch(throwError(e.message));
            }
        };
        try {
            fileReader.readAsText(file);
        } catch (e) {
            //
        }
        this.setState({
            fileName: file.name
        });
    }

    render() {
        return (
            <div className="mh250 pd10">
                <div className="form-dragdrop">
                    <Dropzone onDrop={this.onDrop.bind(this)} className="dragDrop-container flexible" multiple={false} activeClassName="onDrop">
                        <div className="text-center">
                            <a className="font60 default-cursor">
                                <i className="fa fa-hdd-o" aria-hidden="true"></i>
                            </a>
                            {
                                this.state.fileName === "" ?
                                    (
                                        <div>
                                            <p className="bold"> Drop file here to import</p>
                                            <p>or</p>
                                        </div>
                                    )
                                    :
                                    (
                                        <p className="bold">{this.state.fileName}</p>
                                    )
                            }

                            <p className="maskButton">{this.state.fileName === "" ? "Choose file" : "re-choose"}</p>
                        </div>
                    </Dropzone>
                    <TextField
                        floatingLabelText="Account name"
                        fullWidth={true}
                        value={this.state.accountName}
                        onKeyPress={(e) => this.handleKeyPress(e)}
                        onChange={(e) => this.setState({ accountName: e.target.value })}
                    /><br />
                    <div className="flexible-end mg30-0">
                        <button
                            onClick={this.importAccount}
                            style={styles.buttonBack}
                        >
                            IMPORT ACCOUNT
                        </button>
                    </div>
                </div>

            </div>
        );
    }
}

// export default ImportAccount;

export default ImportAccount;
