import React, { Component } from "react";
import styles from "./YourAccountComponentStyle";
import TextField from "material-ui/TextField";

class YourAccountForm extends Component {
    render() {
        return (
            <div>
                <h3 style={styles.title}>
                    ETH Address: <a href={"https://ropsten.etherscan.io/address/" + this.props.accounts.accounts.address} target="_blank">{this.props.accounts.accounts.address}</a>
                </h3>
                <TextField
                    floatingLabelText="User Profile Address"
                    fullWidth
                    value={this.props.userProfileAddress}
                />
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
