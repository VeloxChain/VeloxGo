import React, { Component } from "react";
import styles from "./YourAccountComponentStyle";
import TextField from "material-ui/TextField";
import constants from "../../services/constants";
class YourAccountForm extends Component {
    _viewETHOnEtherScan = () =>{
        const { accounts } = this.props.accounts;
        return (
            <a
                href={"https://ropsten.etherscan.io/address/" + accounts.address}
                title="View Owner Address On EtherScan"
                target="_blank" >
                {accounts.address + " "}
                <i className="fa fa-external-link"></i>
            </a>
        );
    }
    _viewProfileOnEtherScan = () =>{
        const { userProfileAddress } = this.props;
        return (
            <a
                href={"https://ropsten.etherscan.io/address/" + userProfileAddress}
                title="View Wallet Address On EtherScan"
                target="_blank" >
                {userProfileAddress + " "}
                <i className="fa fa-external-link"></i>
            </a>
        );
    }
    _viewBKCOnEtherScan = () =>{
        return (
            <a
                href={"https://ropsten.etherscan.io/token/" + constants.BIKECOIN_TOKEN_ADDRESS}
                title="View Wallet Address On EtherScan"
                target="_blank" >
                {constants.BIKECOIN_TOKEN_ADDRESS + " "}
                <i className="fa fa-external-link"></i>
            </a>
        );
    }
    render() {
        return (
            <div>
                <h4 style={styles.title}>
                    Network: {this.props.global.nodeName}
                </h4>
                <div className="row">
                    <div className="col-sm-10">
                        <form style={styles.form}>
                            <div className="form-group row">
                                <label className="col-sm-3" style={styles.labelText}>Owner Address:</label>
                                <div className="col-sm-9">
                                    <p style={styles.address} className="test-ellipsis">{this._viewETHOnEtherScan()}</p>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-3" style={styles.labelText}>Wallet Address:</label>
                                <div className="col-sm-9">
                                    <p style={styles.address} className="test-ellipsis">{this._viewProfileOnEtherScan()}</p>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-3" style={styles.labelText}>BKC Address:</label>
                                <div className="col-sm-9">
                                    <p style={styles.address} className="test-ellipsis">{this._viewBKCOnEtherScan()}</p>
                                </div>
                            </div>
                        </form>

                        <TextField
                            floatingLabelText="Email"
                            fullWidth
                            value={this.props.userInfo.email}
                            onChange={(e) => this.props.handleChangeState({email: e.target.value})}
                            onKeyPress={(e) => this.props.handleKeyPress(e)}
                            floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                            underlineFocusStyle={styles.underlineStyle}
                        />

                        <div className="row">
                            <div className="col-sm-6">
                                <TextField
                                    floatingLabelText="First Name"
                                    fullWidth
                                    value={this.props.userInfo.firstname}
                                    onChange={(e) => this.props.handleChangeState({firstname: e.target.value})}
                                    onKeyPress={(e) => this.props.handleKeyPress(e)}
                                    floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                                    underlineFocusStyle={styles.underlineStyle}
                                />
                            </div>
                            <div className="col-sm-6">
                                <TextField
                                    floatingLabelText="Last Name"
                                    fullWidth
                                    value={this.props.userInfo.lastname}
                                    onChange={(e) => this.props.handleChangeState({lastname: e.target.value})}
                                    onKeyPress={(e) => this.props.handleKeyPress(e)}
                                    floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                                    underlineFocusStyle={styles.underlineStyle}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="text-left">
                    <button style={styles.button} onClick={this.props.saveInformation}>update</button>
                </div>
            </div>
        );
    }
}

export default YourAccountForm;
