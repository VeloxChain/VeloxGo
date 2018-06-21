import React, { Component } from "react";
import styles from "./YourAccountComponentStyle";
import TextField from "material-ui/TextField";

class YourAccountForm extends Component {

    render() {
        return (
            <div>
                <h3 style={styles.title}>User profile address: 00 000 000 00 0000</h3>
                <TextField
                    floatingLabelText="ETH Address"
                    fullWidth
                    value={this.props.accounts.accounts.address}
                />
                <TextField
                    floatingLabelText="Email"
                    fullWidth
                />
                <TextField
                    floatingLabelText="First Name"
                    fullWidth
                />
                <TextField
                    floatingLabelText="Last Name"
                    fullWidth
                />
                
                <div className="text-right">
                    <button style={styles.button}>update</button>
                </div>
            </div>
        );
    }
}

export default YourAccountForm;
