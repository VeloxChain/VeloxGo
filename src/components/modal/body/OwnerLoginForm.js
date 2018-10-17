import React, { Component } from "react";
import {
    MODAL_CREATE_ACCOUNT,
    MODAL_EXISTING,
} from "../constants";
class OwnerLogin extends Component {
    render() {
        return (
            <div className="mh250 pd10">
                <div className="intro-popup-top">
                    <h4 className="text-center">{this.props.global.nodeName}: <b>TestNet</b></h4>
                    <h4 className="text-center">You need an ethereum accounts to use the application</h4>
                </div>

                <div className="flexible-evenly">
                    <button
                        onClick={() => this.props.setType(MODAL_CREATE_ACCOUNT)}
                        className="button-login"
                    >
                        NEW ACCOUNT
                    </button>
                    <button
                        onClick={() => this.props.setType(MODAL_EXISTING)}
                        className="button-login"
                    >
                        EXISTING ACCOUNT
                    </button>
                </div>
            </div>
        );
    }
}
export default OwnerLogin;
