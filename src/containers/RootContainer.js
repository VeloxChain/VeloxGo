import React from "react";
import { connect } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import _ from "lodash";
import Header from "../components/Header";
import Navigation from "../components/Navigation";
import IPSFTest from "../services/ipfs";
import { addNewToast } from "../actions/appAction";
import {
    MODAL_OWNER_LOGIN,
} from "../components/modal/constants";
import { logout } from "../actions/accountActions";

class RootContainer extends React.Component {
    constructor(props) {
        super(props);
        IPSFTest.test();
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

    UNSAFE_componentWillReceiveProps(props){
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
                        <Navigation userProfile={this.props.userProfile} handleLogout={this.handleLogout} accounts={this.props.accounts.accounts} handleLogin={this.handleLogin}/>
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
