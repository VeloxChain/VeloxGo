import React, { Component } from "react";
import Web3 from "web3";
import { addAccount } from "../../../actions/accountActions";
import { useMetamask } from "../../../actions/appAction"; //addEthereumKey
// import { MODAL_CREATE_ACCOUNT_BIKECOIN } from "../constants";
// import _ from "lodash";
import RaisedButton from "material-ui/RaisedButton";
import { addUserProfile } from "../../../actions/userProfileActions"; //addVerifyUserProfile
// import constants from "../../../services/constants";
class UnlockMetaMask extends Component {
    constructor(props){
        super(props);
        this.state = {
            isMetamaskLocked: true,
        };
    }
    componentDidMount(){
        window.addEventListener("load", this.detectMetamask);
        this.detectMetamask();
    }
    detectMetamask = () => {
        var web3js = null;
        // Checking if Web3 has been injected by the browser (Mist/MetaMask)
        if (typeof window.web3 !== "undefined") {
        // Use Mist/MetaMask's provider
            web3js = new Web3(window.web3.currentProvider);
            this.setState({
                account:web3js.eth.accounts[0]
            });
        } else {
            alert("No web3? You should consider trying MetaMask!");
        }
    }
    useMetamaskAccount = () => {
        this.props.dispatch(addAccount(this.state.account, "", "User", ""));
        this.props.dispatch(useMetamask(true));
        let userProfile = {
            userProfileAddress: "",
        };
        this.props.dispatch(addUserProfile(userProfile));
        this.props.closeModal();
        // this.props.setType(MODAL_CREATE_ACCOUNT_BIKECOIN);
        // let accountAddress = this.state.account;
        // addEthereumKey(this.props.dispatch, {address: accountAddress, key: "meta-mask", account_name: "Metamask"});
        // let props = this.props
        // let self = this
        // console.log("accountAddress", accountAddress);
        // this.props.ethereum.getUserProfileFromNetwork(accountAddress, (userProfileAddress,userName,email) => {
        //     console.log(userProfileAddress, userProfileAddress);
        //     if (userProfileAddress !== constants.EMPTY_ADDRESS && userProfileAddress !== null) {
        //         let userProfile = {
        //             userProfileAddress: userProfileAddress,
        //             userName: userName,
        //             email: email,
        //             accountAddress: accountAddress,
        //             isMetamask: true,
        //             hasToUnlockPrimary: false,
        //             ethereum: props.ethereum
        //         }
        //         props.dispatch(addUserProfile(userProfile));
        //         if (_.isFunction(props.openComfirm)) {
        //             props.closeModal();
        //             props.openComfirm();
        //         }
        //     } else {
        //         let userProfile = {
        //             userProfileAddress: "",
        //             userName: "",
        //             email: "",
        //             accountAddress: accountAddress,
        //             isMetamask: true,
        //             hasToUnlockPrimary: false,
        //             ethereum: props.ethereum
        //         }
        //         props.dispatch(addVerifyUserProfile(userProfile));
        //         if (_.isFunction(props.openComfirm)) {
        //             props.closeModal();
        //             props.openComfirm();
        //         } else {
        //             this.props.setType(MODAL_CREATE_ACCOUNT_BIKECOIN);
        //         }
        //     }
        // });

    }
    render() {
        return (
            <div className="mh250 pd10">
                <div className="intro-popup-top">
                    <h4 className="text-center">Ehereum network: <b>{this.props.global.nodeName}</b></h4>
                    {this.state.account ? (
                        <div className="text-center">
                            <h4 className="text-center"> {this.state.account} </h4>
                            <div className="flexible-center">
                                <RaisedButton
                                    label="USE THIS METAMASK ACCOUNT"
                                    labelColor="#fff"
                                    backgroundColor="#5c57a3"
                                    style={{marginTop:20}}
                                    onClick={this.useMetamaskAccount}
                                />
                            </div>
                        </div>
                    ):
                        (
                            <h5 className="text-center">You have not unlock your metamask wallet. Please unlock it</h5>
                        )
                    }
                </div>
            </div>
        );
    }
}
export default UnlockMetaMask;
