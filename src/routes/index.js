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
import BikeForRentComponent from "../components/bike_for_rent/BikeForRentComponent";
import YourAccountComponent from "../components/your_account/YourAccountComponent";

class root extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            type:MODAL_OWNER_LOGIN,
            isOpen: false,
            metamask: false
        };
    }
    closeModal = () => {
        this.setState({
            isOpen: false
        });
    }
    setType = (type) => {
        this.setState({
            type: type,
            isOpen: true
        });
        return true;
    }
    _renderHomePage = () => {
        if (_.isEmpty(this.props.userProfile.data)) {
            return (<div></div>);
        }
        return (
            <Switch>
                <Route exact path="/your_bikes" render={() => <YourBikesComponent {...this.props} setType={this.setType} />} />
                <Route exact path="/bike_for_rent" render={() => <BikeForRentComponent {...this.props} setType={this.setType} />} />
                <Route exact path="/your_account" render={() => <YourAccountComponent {...this.props} setType={this.setType} />} />
            </Switch>
        );
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
                    metamask={this.state.metamask}
                    accounts={this.props.accounts}
                    userProfile={this.props.userProfile}
                    AppReducer={this.props.AppReducer}
                    global={this.props.global}
                    contacts={this.props.contacts}
                    api={this.props.api}
                    ethereum={this.props.ethereum}
                    dispatch={this.props.dispatch}
                    keystore={this.props.keystore}
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
    api: new ServerService(),
    ethereum: new EthereumService(state),
});
export default withRouter(connect(mapStateToProps)(root));
