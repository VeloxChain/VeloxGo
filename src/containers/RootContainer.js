import React from "react";
import { connect } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
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
        this.props.ethereum.getBalance(this.props.accounts.accounts.address, this.getBalance);
    }

    getBalance = (balance) => {
        if (balance > 0) {
            this.props.setType(MODAL_CREATE_ACCOUNT_BIKECOIN);
        } else {
            this.props.setType(MODAL_INSUFFICIENT_FUNDS);
        }
    }


    componentWillReceiveProps(props){
        if(!_.isUndefined(props.toast)) {
            if(props.toast.message !== "") {
                toast(
                    props.toast.message,
                    {
                        ...props.toast.option,
                        onClose: () => this.props.addNewToast({message: ""})
                    }
                );
            }
        }
    }

    render() {
        return (
            <div className="main_container">
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
