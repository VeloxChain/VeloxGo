import React from "react";
import { connect } from "react-redux";
import { ToastContainer } from "react-toastify";
import _ from "lodash";
import Header from "../components/Header";
import Navigation from "../components/Navigation";
import SERVICE_IPFS from "../services/ipfs";
import { addNewToast } from "../actions/appAction";
import {
    MODAL_OWNER_LOGIN,
    MODAL_CREATE_ACCOUNT_BIKECOIN,
    MODAL_INSUFFICIENT_FUNDS
} from "../components/modal/constants";
import { logout } from "../actions/accountActions";

class RootContainer extends React.Component {
    constructor(props) {
        super(props);
        SERVICE_IPFS.init();
    }

    componentDidMount() {
        this.props.ethereum.watch();
    }

    handleLogout = () => {
        this.props.logout();
    }

    handleLogin = () => {
        this.props.setType(MODAL_OWNER_LOGIN);
    }
    openModal = () => {
        this.props.setType(MODAL_CREATE_ACCOUNT_BIKECOIN);
        // this.props.ethereum.getBalance(this.props.accounts.accounts.address, this.getBalance);
    }

    getBalance = (balance) => {
        if (balance > 0) {
            this.props.setType(MODAL_CREATE_ACCOUNT_BIKECOIN);
        } else {
            this.props.setType(MODAL_INSUFFICIENT_FUNDS);
        }
    }


    _renderTxHash = (AppReducer) => {
        if (AppReducer.txHash) {
            if (AppReducer.txHash.length === 66) {
                return (
                    <a href={"https://ropsten.etherscan.io/tx/" + AppReducer.txHash} style={{fontSize:20}} target="_blank">{"Tx: " + AppReducer.txHash}</a>
                );
            }
            return (
                <a style={{fontSize:20}} target="_blank">{AppReducer.txHash}</a>
            );
        }
    }
    _renderLoading = () => {
        const { AppReducer } = this.props;
        if (AppReducer.isLoading) {
            return (
                <div className="absolute-fancy-loading flexible">
                    <div style={{marginTop: -150}}>
                        <img
                            id="loader"
                            src="images/loading.png"
                            style={{margin: "auto"}}
                            alt="Bikecoin"
                        />
                        <br/>
                        {this._renderTxHash(AppReducer)}
                    </div>

                </div>
            );
        }
    }
    render() {
        return (
            <div className="main_container">
                {this._renderLoading()}
                <Header hidden={_.isEmpty(this.props.userProfile.data)}/>
                <ToastContainer />
                <div className="right-col">
                    <div className="row">
                        <Navigation
                            userProfile={this.props.userProfile}
                            handleLogout={this.handleLogout}
                            accounts={this.props.accounts.accounts}
                            handleLogin={this.handleLogin}
                            openModal={this.openModal} />
                    </div>
                    {
                        this.props.children
                    }
                </div>

            </div>

        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addNewToast: toastData => dispatch(addNewToast(toastData)),
        logout: () => {dispatch(logout());}
    };
};

export default connect(null, mapDispatchToProps)(RootContainer);
