import React, { Component } from "react";
import styles from "./YourAccountComponentStyle";
import TextField from "material-ui/TextField";
import { updateUserProfile } from "../../actions/userProfileActions";
import { toast } from "react-toastify";
import SERVICE_IPFS from "../../services/ipfs";
class YourAccountForm extends Component {
    constructor(props) {
        super(props);
        this.state = this.props.userProfile.data;
    }
    saveInformation = async () => {
        let profileHash = await SERVICE_IPFS.putDataToIPFS(this.state);
        await this.props.dispatch(updateUserProfile(this.state, profileHash));
        await localStorage.setItem("hash", profileHash);
        toast.success("Saved!");
    }
    render() {
        return (
            <div>
                <h3 style={styles.title}>ETH Address: <span style={styles.ethAddress}>{this.props.accounts.accounts.address}</span></h3>
                <TextField
                    floatingLabelText="User Profile Address"
                    fullWidth
                    value="0x0000000000000000000000000000000000000000"
                />
                <TextField
                    floatingLabelText="Email"
                    fullWidth
                    value={this.state.email}
                    onChange={(e) => this.setState({email: e.target.value})}
                />
                <TextField
                    floatingLabelText="First Name"
                    fullWidth
                    value={this.state.firstname}
                    onChange={(e) => this.setState({firstname: e.target.value})}
                />
                <TextField
                    floatingLabelText="Last Name"
                    fullWidth
                    value={this.state.lastname}
                    onChange={(e) => this.setState({lastname: e.target.value})}
                />

                <div className="text-right">
                    <button style={styles.button} onClick={this.saveInformation}>update</button>
                </div>
            </div>
        );
    }
}

export default YourAccountForm;
