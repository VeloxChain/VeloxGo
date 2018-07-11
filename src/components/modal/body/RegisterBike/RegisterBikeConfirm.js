import React, { Component } from "react";
import TextField from "material-ui/TextField";
import styles from "../CustomCss";

class RegisterBikeConfirm extends Component {

    _renderPassphrase = () => {
        if (this.props.isMetamask === false) {
            return (
                <TextField
                    floatingLabelText="Enter your password wallet"
                    type="password"
                    fullWidth
                    style={styles.mb80}
                    value={this.props.info.passphrase}
                    onChange={(e) => this.props.handleChangeState({passphrase: e.target.value})}
                    floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                    underlineFocusStyle={styles.underlineStyle}
                />
            );
        }
    }
    render() {
        return (
            <div className="wrapp">
                <div className="w100p">
                    <div className="row">
                        <div className="col-sm-8 col-sm-offset-2">
                            <div className="invoice">
                                <h4>By register your bike!</h4>
                                <h3 className="color-web">You will receive 20BKC</h3>
                            </div>
                            {this._renderPassphrase()}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default RegisterBikeConfirm;
