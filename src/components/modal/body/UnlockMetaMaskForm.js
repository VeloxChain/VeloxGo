import React, { Component } from "react";
import Web3 from "web3";
import { MODAL_CREATE_ACCOUNT_BIKECOIN } from "../constants";
import { retrieveUserProfile } from "../../../actions/userProfileActions";
import styles from "./CustomCss";
class UnlockMetaMask extends Component {
    constructor(props){
        super(props);
        this.state = {
            isMetamaskLocked: true,
        };
    }
    componentDidMount(){
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
            // alert("No web3? You should consider trying MetaMask!");
        }
    }
    useMetamaskAccount = async () => {
        let userProfileAddress = await this.props.ethereum.networkAdress.getUserProfile(this.state.account);
        if (userProfileAddress === "0x0000000000000000000000000000000000000000") {
            this.props.setType(MODAL_CREATE_ACCOUNT_BIKECOIN);
            return;
        }
        let userInfo = {
            address: this.state.account,
            keystring: "",
            accountName: "",
            desc: ""
        };
        this.props.dispatch(retrieveUserProfile({
            userProfileAddress: userProfileAddress,
            userInfo: userInfo,
            ethereum: this.props.ethereum
        }));
        this.props.closeModal();
    }
    _renderContent = () => {
        if (this.state.account) {
            return (
                <div className="text-center">
                    <h4 className="test-net"> {this.state.account} </h4>
                    <div className="flexible-center">
                        <button onClick={this.useMetamaskAccount} style={{...styles.buttonBack, ...styles.mt20}}>
                            USE THIS METAMASK ACCOUNT
                        </button>
                    </div>
                </div>
            );
        }
        return (
            <h5 className="text-center">You have not unlock your metamask wallet. Please unlock it</h5>
        );
    }
    render() {
        return (
            <div className="mh250 pd10">
                <div className="intro-popup-top">
                    <h4 className="text-center">Ehereum network: <b>{this.props.global.nodeName}</b></h4>
                    {this._renderContent()}
                </div>
            </div>
        );
    }
}
export default UnlockMetaMask;
