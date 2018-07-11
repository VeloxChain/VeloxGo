import React, { Component } from "react";
import TextField from "material-ui/TextField";
import styles from "./CustomCss";
import { toast } from "react-toastify";
import { transferBike } from "../../../actions/bikeActions";
class ConfirmTransaction extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addressTo: "",
            passphrase: "",
        };
    }

    handleKeyPress = (target) => {
        if(target.charCode===13){
            this._onDeploy();
        }
    }
    validate = () => {
        if (this.state.addressTo === "") {
            return false;
        }
        if (this.state.passphrase === "" && !this.props.isMetamask) {
            return false;
        }
        return true;
    }

    _onDeploy = async () => {
        let isValidate = await this.validate();
        if (!isValidate) {
            toast.error("Invalid Form");
            return;
        }
        const { address, tokenId, callBack } = this.props.externalData;
        let payload = {
            address: address,
            addressTo: this.state.addressTo,
            tokenId: tokenId,
            ethereum: this.props.ethereum,
            keyStore: this.props.accounts.accounts.key,
            passphrase: this.state.passphrase,
            callBack: callBack
        };
        this.props.dispatch(transferBike(payload));
        this.props.closeModal();
    }
    _renderPassphrase = () => {
        if (!this.props.isMetamask) {
            return (
                <TextField
                    floatingLabelText="Passpharse"
                    fullWidth={true}
                    type="password"
                    value={this.state.passphrase}
                    onKeyPress={(e) => this.handleKeyPress(e)}
                    onChange={(e) => this.setState({ passphrase: e.target.value })}
                    floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                    underlineFocusStyle={styles.underlineStyle}
                />
            );
        }
    }
    render() {
        return (
            <div className="mh250 pd10 relative">
                <div className="form-modal">
                    <TextField
                        floatingLabelText="Profile Address"
                        fullWidth={true}
                        value={this.state.addressTo}
                        onKeyPress={(e) => this.handleKeyPress(e)}
                        onChange={(e) => this.setState({ addressTo: e.target.value })}
                        floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                        underlineFocusStyle={styles.underlineStyle}
                    />
                    {this._renderPassphrase()}
                </div>
                <div className="action-form">
                    <button onClick={this._onDeploy} style={styles.buttonBack}>
                        TRANSFER
                    </button>
                </div>
            </div>
        );
    }
}


export default ConfirmTransaction;
