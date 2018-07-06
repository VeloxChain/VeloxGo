import React, { Component } from "react";
import styles from "./YourAccountComponentStyle";
import TextField from "material-ui/TextField";

class YourAccountForm extends Component {
    _viewETHOnEtherScan = () =>{
        const { accounts } = this.props.accounts;
        return (
            <a
                href={"https://ropsten.etherscan.io/address/" + accounts.address}
                title="View ETH Address On EtherScan"
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
                title="View Profile Address On EtherScan"
                target="_blank" >
                {userProfileAddress + " "}
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
                <p style={styles.address}>
                    ETH Address: {this._viewETHOnEtherScan()}
                </p>
                <p style={styles.address}>
                    User Profile Address: {this._viewProfileOnEtherScan()}
                </p>
                <TextField
                    floatingLabelText="Email"
                    fullWidth
                    value={this.props.userInfo.email}
                    onChange={(e) => this.props.handleChangeState({email: e.target.value})}
                    onKeyPress={(e) => this.props.handleKeyPress(e)}
                />
                <TextField
                    floatingLabelText="First Name"
                    fullWidth
                    value={this.props.userInfo.firstname}
                    onChange={(e) => this.props.handleChangeState({firstname: e.target.value})}
                    onKeyPress={(e) => this.props.handleKeyPress(e)}
                />
                <TextField
                    floatingLabelText="Last Name"
                    fullWidth
                    value={this.props.userInfo.lastname}
                    onChange={(e) => this.props.handleChangeState({lastname: e.target.value})}
                    onKeyPress={(e) => this.props.handleKeyPress(e)}
                />

                <div className="text-right">
                    <button style={styles.button} onClick={this.props.saveInformation}>update</button>
                </div>
            </div>
        );
    }
}

export default YourAccountForm;
