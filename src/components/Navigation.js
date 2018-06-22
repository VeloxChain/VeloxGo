import React, { Component } from "react";
import MenuItem from "material-ui/MenuItem";
import IconMenu from "material-ui/IconMenu";
import IconButton from "material-ui/IconButton";
import _ from "lodash";

class Navigation extends Component{
    handleLogout = () => {
        if (_.isFunction(this.props.handleLogout)) {
            this.props.handleLogout();
        }
    }

    handleLogin = () => {
        if (_.isFunction(this.props.handleLogin)) {
            this.props.handleLogin();
        }
    }
    _renderUserName = () => {
        let {account, userProfile } = this.props;
        if (!_.isEmpty(userProfile.data)) {
            return userProfile.data.firstname + " " + userProfile.data.lastname;
        }
        if (_.isEmpty(account)) {
            return "";
        }
        return account.name;
    }
    _renderEditProfile = () => {
        if (_.isEmpty(this.props.userProfile.data)) {
            return (
                <MenuItem primaryText="Create Profile" onClick={this.props.openModal}/>
            );
        }
    }

    renderLogged() {
        if (!_.isEmpty(this.props.accounts) || !_.isEmpty(this.props.userProfile.data)) {
            return (
                <IconMenu iconButtonElement={
                    <IconButton style={{width: "auto"}}>
                        <a className="pointer size20 welcome-user-block">
                            <div className="div-welCome">
                                <p className="p-userName">
                                    {this._renderUserName()}
                                </p>
                                <i className="fa fa-caret-down" />
                            </div>
                        </a>
                    </IconButton>

                } >
                    {this._renderEditProfile()}
                    <MenuItem primaryText="Log out" onClick={this.handleLogout}/>
                </IconMenu>
            );
        }

        return (
            <IconMenu iconButtonElement={
                <IconButton>
                    <a className="pointer size20">
                        <i className="fa fa-user" />
                    </a>
                </IconButton>
            }>

                <MenuItem primaryText="Log in" onClick={this.handleLogin}/>
            </IconMenu>
        );
    }

    render() {
        return (
            <div className="col-xs-12 relative bg-header">
                <nav className="nav underline-none w100p h70 flexible">
                    <div className="pull-left">
                        <a className="pointer size20 toggleMenu">
                            <img src="images/Menu-Green.png" alt="Bikecoin"/>
                        </a>
                    </div>
                    <div className="margin-auto">
                        <img src="images/logo_bikecoin.png" alt="Bikecoin"/>
                    </div>
                    <div className="pull-right">
                        {
                            this.renderLogged()
                        }
                    </div>
                </nav>

            </div>
        );
    }
}

export default Navigation;
