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
            passphrase: "",
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

    _onDeploy = () => {
        const { type, data, handle } = this.props.externalData;
        if (type === "updateUserProfile") {
            data.passphrase = this.state.passphrase;
            this.props.dispatch(handle(data));
        }
        this.props.closeModal();
    }

    render() {
        return (
            <div className="mh250 pd10 relative">
                <div className="form-modal">
                    <TextField
                        floatingLabelText="Passpharse"
                        fullWidth={true}
                        type="password"
                        disabled={this.state.disabled}
                        value={this.state.passphrase}
                        errorText={this.state.errors.passphrase}
                        onKeyPress={(e) => this.handleKeyPress(e)}
                        onChange={(e) => this.setState({ passphrase: e.target.value })}
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
