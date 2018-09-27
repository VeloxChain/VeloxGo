import React, { Component } from "react";
import RaisedButton from "material-ui/RaisedButton";
import { addUserProfile } from "../../../actions/userProfileActions";
class NotEnoughEther extends Component {
    constructor(props) {
        super(props);
        this.state = {
            accountAddress: "",
        };
    }
    handleUserProfile = () => {
        this.props.dispatch(addUserProfile(this.state));
        this.props.closeModal();
    }
    render() {
        return (
            <div className="mh250 pd10">
                <div className="intro-popup-top">
                    <h4 className="text-center">{this.props.global.nodeName}: <b>TestNet</b></h4>
                    <h4 className="text-center">Insufficient funds to create NextId Profile</h4>
                </div>

                <div className="flexible">
                    <RaisedButton
                        label="OK"
                        labelColor="#fff"
                        backgroundColor="#5c57a3"
                        onClick={() => this.handleUserProfile()}
                    />
                </div>
            </div>
        );
    }
}

export default NotEnoughEther;
