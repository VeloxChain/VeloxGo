import React, { Component } from "react";
import styles from "./YourAccountComponentStyle";
import TextField from "material-ui/TextField";
import { uploadUserProfileToIPFS } from "../../actions/userProfileActions";
import { MODAL_CONFIRM_TRANSACTION } from "../modal/constants";
class YourAccountForm extends Component {
    constructor(props) {
        super(props);
        this.state = this.props.userProfile.data;
    }
    saveInformation = () => {
        var state = this.state;
        let userInfo = {
            email: state.email,
            lastname: state.lastname,
            firstname: state.firstname,
            avatar: state.avatar,
            accountAddress:this.props.getAccountAddress(),
            ethereum: this.props.ethereum,
            keyStore: this.props.accounts.accounts.key,
        };
        if (this.props.metamask) {
            this.props.dispatch(uploadUserProfileToIPFS(userInfo));
        } else {
            this.props.setType(MODAL_CONFIRM_TRANSACTION, {type: "updateUserProfile", data: userInfo, handle: uploadUserProfileToIPFS});
        }

    }
    handleKeyPress = (target) => {
        if(target.charCode===13){
            this.saveInformation();
        }
    }
    getUserProfileAddress = () => {
        return this.props.ethereum.networkAdress.getUserProfile(this.props.getAccountAddress());
    }
    render() {
        return (
            <div>
                <h3 style={styles.title}>ETH Address: <span style={styles.ethAddress}>{this.props.accounts.accounts.address}</span></h3>
                <TextField
                    floatingLabelText="User Profile Address"
                    fullWidth
                    value={this.getUserProfileAddress()}
                />
                <TextField
                    floatingLabelText="Email"
                    fullWidth
                    value={this.state.email}
                    onChange={(e) => this.setState({email: e.target.value})}
                    onKeyPress={(e) => this.handleKeyPress(e)}
                />
                <TextField
                    floatingLabelText="First Name"
                    fullWidth
                    value={this.state.firstname}
                    onChange={(e) => this.setState({firstname: e.target.value})}
                    onKeyPress={(e) => this.handleKeyPress(e)}
                />
                <TextField
                    floatingLabelText="Last Name"
                    fullWidth
                    value={this.state.lastname}
                    onChange={(e) => this.setState({lastname: e.target.value})}
                    onKeyPress={(e) => this.handleKeyPress(e)}
                />

                <div className="text-right">
                    <button style={styles.button} onClick={this.saveInformation}>update</button>
                </div>
            </div>
        );
    }
}

export default YourAccountForm;
