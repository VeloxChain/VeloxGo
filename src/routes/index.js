import React from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import Modal from "../components/modal";
import RootContainer from "../containers/RootContainer";
import {connect} from "react-redux";
import EthereumService from "../services/ethereum";
import ServerService from "../services/server";
import { MODAL_OWNER_LOGIN } from "../components/modal/constants";
import _ from "lodash";
import YourBikesComponent from "../components/your_bikes/YourBikeComponent";
import HiringRequestComponent from "../components/hiring_request/HiringRequestComponent";
import YourAccountComponent from "../components/your_account/YourAccountComponent";
import Web3 from "web3";
class root extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            type:MODAL_OWNER_LOGIN,
            isOpen: false,
            metamask: false,
            externalData: null
        };
    }
    closeModal = () => {
        this.setState({
            isOpen: false
        });
    }
    setType = (type, externalData = null) => {
        this.setState({
            type: type,
            isOpen: true,
            externalData: externalData
        });
        return true;
    }
    _renderHomePage = () => {
        if (_.isEmpty(this.props.userProfile.data)) {
            return (<div></div>);
        }
        return (
            <Switch>
                <Route exact path="/your_bikes" render={() => <YourBikesComponent {...this.props} setType={this.setType} getAccountAddress={this.getAccountAddress} metamask={this.isMetamask()} />} />
                <Route exact path="/hiring_request" render={() => <HiringRequestComponent {...this.props} setType={this.setType} getAccountAddress={this.getAccountAddress} metamask={this.isMetamask()} />} />
                <Route exact path="/your_account" render={() => <YourAccountComponent {...this.props} setType={this.setType} getAccountAddress={this.getAccountAddress} metamask={this.isMetamask()} />} />
            </Switch>
        );
    }
    componentWillReceiveProps(nextProps) {
        const { accounts } = nextProps;
        if (accounts.isLogout) {
            this.setType(MODAL_OWNER_LOGIN);
        }
    }
    getAccountAddress = () => {
        let address = "";
        let accounts = this.props.accounts.accounts;
        if (_.isEmpty(accounts) || accounts.key === "" || accounts.keystring === "") {
            var web3js = null;
            if (typeof window.web3 !== "undefined") {
                web3js = new Web3(window.web3.currentProvider);
                address = web3js.eth.accounts[0];
            } else {
                alert("No web3? You should consider trying MetaMask!");
                return;
            }
        } else {
            address = accounts.address;
        }
        return address;
    }
    isMetamask = () => {
        const { accounts } = this.props;
        let isMetaMask = _.isEmpty(accounts.accounts) || accounts.accounts.key === "" || accounts.accounts.keystring === "" || _.isUndefined(accounts.accounts.key);
        return isMetaMask;
    }
    render() {
        return (
            <RootContainer {...this.props} setType={this.setType}>
                {this._renderHomePage()}
                <Modal
                    type={this.state.type}
                    isOpen={this.state.isOpen}
                    closeModal={this.closeModal}
                    setType={this.setType}
                    isMetamask={this.isMetamask()}
                    accounts={this.props.accounts}
                    userProfile={this.props.userProfile}
                    AppReducer={this.props.AppReducer}
                    global={this.props.global}
                    contacts={this.props.contacts}
                    bikes={this.props.bikes}
                    api={this.props.api}
                    ethereum={this.props.ethereum}
                    dispatch={this.props.dispatch}
                    keystore={this.props.keystore}
                    externalData={this.state.externalData}
                    getAccountAddress={this.getAccountAddress}

                />
            </RootContainer>
        );
    }
}
const mapStateToProps = state => ({
    accounts: state.accounts,
    userProfile: state.userProfile,
    AppReducer: state.AppReducer,
    global: state.global,
    contacts: state.contacts,
    keystore: state.importKeystore,
    bikes: state.bikes,
    api: new ServerService(),
    ethereum: new EthereumService(state),
});
export default withRouter(connect(mapStateToProps)(root));
