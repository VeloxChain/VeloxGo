import React, { Component } from "react";
import Web3 from "web3";
import { addAccount } from "../../../actions/accountActions";
import { MODAL_CREATE_ACCOUNT_BIKECOIN } from "../constants";
import _ from "lodash";
import RaisedButton from "material-ui/RaisedButton";
import { addUserProfile } from "../../../actions/userProfileActions";
// import constants from "../../../services/constants";
import SERVICE_IPFS from "../../../services/ipfs";
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
            alert("No web3? You should consider trying MetaMask!");
        }
    }
    useMetamaskAccount = async () => {
        let hashData = localStorage.getItem("hash");
        if (_.isUndefined(hashData)){
            this.props.setType(MODAL_CREATE_ACCOUNT_BIKECOIN);
            return;
        }
        try {
            var retreiveUserProfile = await SERVICE_IPFS.getDataFromIPFS(hashData);
            retreiveUserProfile = JSON.parse(retreiveUserProfile);
            retreiveUserProfile["accountAddress"] = this.state.account;
            this.props.dispatch(addUserProfile({userProfile: retreiveUserProfile}));
            this.props.dispatch(addAccount(this.state.account, "", retreiveUserProfile.firstname + " " + retreiveUserProfile.lastname, ""));
            this.props.closeModal();

        } catch (e) {
            this.props.setType(MODAL_CREATE_ACCOUNT_BIKECOIN);
        }
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
