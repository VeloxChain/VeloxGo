import React, { Component } from "react";
import styles from "./YourAccountComponentStyle";
import YourAccountForm from "./YourAccountForm";
import YourAccountInfo from "./YourAccountInfo";
import { uploadUserProfileToIPFS } from "../../actions/userProfileActions";
import { MODAL_CONFIRM_TRANSACTION } from "../modal/constants";
class YourAccountComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            info: {
                bkc: 0,
                eth: 0
            },
            userProfile: this.props.userProfile.data,
            accountAddress: "",
            userProfileAddress: ""
        };
    }


    onChangeAvatar = (newData) => {
        this.setState({
            userProfile: {
                ...this.state.userProfile,
                ...newData
            }
        });   
    }

    saveInformation = () => {
        const { userProfile, accountAddress } = this.state;
        let data = {
            email: userProfile.email,
            lastname: userProfile.lastname,
            firstname: userProfile.firstname,
            avatarData: userProfile.imageData,
            avatar: userProfile.avatar,
            accountAddress: accountAddress,
            ethereum: this.props.ethereum,
            keyStore: this.props.accounts.accounts.key,
        };
        if (this.props.metamask) {
            this.props.dispatch(uploadUserProfileToIPFS(data));
        } else {
            this.props.setType(MODAL_CONFIRM_TRANSACTION, {type: "updateUserProfile", data: data, handle: uploadUserProfileToIPFS});
        }

    }
    handleKeyPress = (target) => {
        if(target.charCode===13){
            this.saveInformation();
        }
    }
    _renderETHBalance = (balance) => {
        this.setState({eth: balance});
    }
    _renderBKCBalance = (balance) => {
        this.setState({bkc: balance});
    }
    handleChangeState = (data) => {
        const { userProfile } = this.state;
        let dataChanges = Object.assign(userProfile, data);
        this.setState({ userProfile: dataChanges });
        return;
    }
    componentDidMount() {
        this._renderAddress();
    }
    _renderAddress = async () => {
        let accountAddress = await this.props.getAccountAddress();
        this.props.ethereum.getBalance(accountAddress, this._renderETHBalance);
        this.props.ethereum.getBikeCoinBalance(accountAddress, this._renderBKCBalance);
        let userProfileAddress = await this.props.ethereum.networkAdress.getUserProfile(accountAddress);
        this.setState({userProfileAddress: userProfileAddress, accountAddress: accountAddress});
    }
    render() {
        return (
            <div style={styles.wrapp}>
                <div className="row">
                    <div className="col-sm-4" style={{minWidth:400}}>
                        <YourAccountInfo {...this.props} info={this.state.info} onChangeAvatar={this.onChangeAvatar} />
                    </div>
                    <div className="col-sm-6">
                        <YourAccountForm
                            {...this.props}
                            handleChangeState={this.handleChangeState}
                            handleKeyPress={this.handleKeyPress}
                            userProfileAddress={this.state.userProfileAddress}
                            userInfo={this.state.userProfile}
                            saveInformation={this.saveInformation} />
                    </div>
                </div>
            </div>
        );
    }
}

export default YourAccountComponent;
