import React, { Component } from "react";
import styles from "./YourAccountComponentStyle";
import TextField from "material-ui/TextField";

class YourAccountComponent extends Component {

    render() {
        return (
            <div style={styles.wrapp}>
                <div className="row">
                    <div className="col-sm-4">
                        <div style={styles.wrappLeft}>
                            <div style={styles.wrappTop}>
                                <img src="images/avatar.png" style={styles.avatar} alt="Bikecoin" />
                                <h4 style={styles.name}>Pham Duc Vuong</h4>
                            </div>
                            <div style={styles.wrappBottom}>
                                <h4 style={styles.blance}>balance</h4>
                                <h3>99BKC</h3>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6">
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
                        </div>
                        <div className="text-right">
                            <button style={styles.button}>update</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default YourAccountComponent;
