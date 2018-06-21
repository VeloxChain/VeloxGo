import React, { Component } from "react";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
// import { unlock } from "../../../utils/keys";
import { verifyNumber } from "../../../utils/validators";
// import Web3 from "web3";
// import { addTx } from "../../../actions/txActions";
// import Tx from "../../../services/tx";
// import { deployPrimaryDataOnUserProfile } from "../../../actions/userProfileActions";
class ConfirmTransaction extends Component {
    constructor(props) {
        super(props);
        this.state = {
            accountAddress: "",
            passpharse: "",
            gasLimit: 4712388,
            gasPrice: 50,
            disabled: false,
            submitted: false,
            labelButton: "Confirm",
            errors: {
                accountAddress: "",
                passpharse: "",
                gasLimit: "",
                gasPrice: ""
            }
        };
    }

    handleKeyPress = (target) => {
        if(target.charCode===13){
            this._onDeploy();
        }
    }

    isValidData = () => {
        var errors = this.state.errors;
        return (errors.accountAddress === "" && errors.passpharse === "" && errors.userName === "" && errors.email === "" && errors.gasPrice === "" && errors.gasLimit === "");
    }
    validate = () => {
        let state = this.state;

        if (verifyNumber(this.state.gasLimit) != null) {
            state = { ...state, errors: { ...state.errors, gasLimit: "invalid Gas Limit" } };
        } else {
            state = { ...state, errors: { ...state.errors, gasLimit: "" } };
        }

        if (verifyNumber(this.state.gasPrice) != null) {
            state = { ...state, errors: { ...state.errors, gasPrice: "invalid Gas Price" } };
        } else {
            state = { ...state, errors: { ...state.errors, gasPrice: "" } };
        }

        if (this.state.accountAddress === "") {
            state = { ...state, errors: { ...state.errors, accountAddress: "Account name is empty" } };
        } else {
            state = { ...state, errors: { ...state.errors, accountAddress: "" } };
        }

        if (this.state.passpharse === "" && this.props.metamask === false) {
            state = { ...state, errors: { ...state.errors, passpharse: "Passpharse is invalid" } };
        } else {
            state = { ...state, errors: { ...state.errors, passpharse: "" } };
        }
        this.setState(state);
    }
    _onDeploy = () => {
        if (this.state.submitted) {
            return;
        }
        this.validate();
        // if (this.isValidData()) {
        //     let isMetamask = true;
        //     let address = this.getAccountAddress();
        //     let self = this;
        // }
        try{
            this.setState({
                submitted: true
            });
        }
        catch (ex) {
            //
        }

        // let params = this.props.params;
        // let props = this.props;
        // var keyStore = "";
        // let state = this.state;
        // state.gasPrice = state.gasPrice*1000000000;
        // let self = this;
        // if (this.props.accounts.accounts[params.userProfile.accountAddress]) {
        //     keyStore = this.props.accounts.accounts[params.userProfile.accountAddress].key;
        // } else {
        //     if (params.address2) {
        //         keyStore = this.props.accounts.accounts[params.address2].key;
        //     }
        // }
        // if (params.txType === constants.TX_TYPE_VERIFY_FACET){
        //     props.ethereum.getNonce(params.userProfile.accountAddress || params.address2, (nonce) => {
        //
        //         try{
        //             verifyFacet(
        //                 params.address,
        //                 params.facetAddress,
        //                 params.userProfile.accountAddress || params.address2,
        //                 params.userProfile.isMetamask || params.isMetamask,
        //                 state.gasLimit,
        //                 state.gasPrice, state.passpharse,
        //                 keyStore, props.ethereum,nonce,
        //                 params.fromEmail,
        //                 params.statusVerify,
        //                 params.inNetwork
        //             ).then((hash) => {
        //                 const tx = new Tx(
        //                     hash, params.userProfile.accountAddress || params.address2, state.gasLimit, state.gasPrice,
        //                     nonce, "pending", "verify facet", {
        //                     facetAddress: params.facetAddress,
        //                     account: params.userProfile.accountAddress || params.address2,
        //                     isMetamask: params.userProfile.isMetamask || params.isMetamask,
        //                     gas: state.gasLimit,
        //                     gasPrice: state.gasPrice,
        //                     facetField: params.facetField,
        //                     address: params.address,
        //                     publicKey: params.userProfile.publicKey || null,
        //                     facetKey: params.facetKey,
        //                     fromEmail: params.fromEmail,
        //                     toEmail: params.toEmail,
        //                     clientURL: constants.REMOTE_API_HOST,
        //                     nonce: nonce+1,
        //                 }, "", params.userProfile.isMetamask || params.isMetamask)
        //                 props.dispatch(addTx(tx))
        //                 params.callback();
        //                 props.closeModal()
        //             })
        //         }
        //         catch(exception){
        //             console.log(exception)
        //             state = { ...state, errors: { ...state.errors, passpharse: "Passpharse is invalid" } };
        //             self.setState(state)
        //         }
        //     })
        //     props.closeModal();
        // }

    }
    getContractAddress = (userProfileAddress) => {
        this.setState({
            userProfileAddress: userProfileAddress
        });
    }
    addUserProfile = () => {
        this.props.closeModal();
    }
    rejectTransaction = () => {
        this.setState({ submitted: false, labelButton: "CREATE BIKECOIN ACCOUNT" });
    }
    submitTransaction = () => {
        this.setState({ submitted: true, labelButton: "PENDING..." });
    }
    getAccountAddress = () => {
        return this.props.params.userProfile.accountAddress || this.props.params.address2;
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
                    <TextField
                        floatingLabelText="Account address"
                        fullWidth={true}
                        disabled={this.state.disabled}
                        value={this.getAccountAddress()}
                    /><br />
                    <TextField
                        floatingLabelText="Passpharse"
                        fullWidth={true}
                        type="password"
                        disabled={this.state.disabled}
                        value={this.state.passpharse}
                        errorText={this.state.errors.passpharse}
                        onKeyPress={(e) => this.handleKeyPress(e)}
                        onChange={(e) => this.setState({ passpharse: e.target.value })}
                    />
                    <div className="flexible-end mg30-0">
                        <RaisedButton
                            label={this.state.labelButton}
                            labelColor="#fff"
                            disabled={this.state.disabled}
                            backgroundColor="#5c57a3"
                            onClick={this._onDeploy}
                        />
                    </div>
                </div>

            </div>
        );
    }
}


export default ConfirmTransaction;
