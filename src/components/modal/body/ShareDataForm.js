import React, { Component } from "react";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import {connect} from "react-redux";
import _ from "lodash";
import  {verifyEmail } from "../../../utils/validators";
import { addNewToast } from "../../../actions/appAction";
// import constants from "../../../services/constants";
import { toast } from "react-toastify";
// import { MODAL_CONFIRM_TRANSACTION } from "../../Modal/constants";

class ShareData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            name: "",
            errors: {
                email: "",
                name: "",
            }
        };
    }

    _onSubmit = (event) => {
        event.preventDefault();
        if (!this._validate()){
            return;
        }

        let findAccountByEmailResult = this.props.ethereum.findAccountByEmail(this.state.email);

        findAccountByEmailResult.then(response => {
            if(response === "0x0000000000000000000000000000000000000000") {
                this.props.addNewToast({
                    message: "This email is not exist",
                    option: {
                        type: toast.TYPE.ERROR,
                        autoClose: "2000"
                    },
                });
                return;
            } else {
                if (response === this.props.userProfile.data.accountAddress) {
                    this.props.addNewToast({
                        message: "You can't user your account",
                        option: {
                            type: toast.TYPE.ERROR,
                            autoClose: "2000"
                        },
                    });
                    return;
                }

                this.shareData(response);
            }
        });
    }

    _validate = () => {
        let state = this.state;
        if (_.isEmpty(this.state.name)) {
            state = { ...state, errors:  { ...state.errors, name : "Name is not empty"}};
        } else {
            state = { ...state, errors:  { ...state.errors, name : ""}};
        }

        if (!verifyEmail(this.state.email)) {
            state = { ...state, errors:  { ...state.errors, email : "invalid email"}};
        } else {
            state = { ...state, errors:  { ...state.errors, email : ""}};
        }

        this.setState(state);
        return (state.errors.name === "" && state.errors.email === "");
    }

    render() {
        return (
            <div className="mh250 pd10">
                <div className="form-modal">
                    <TextField
                        floatingLabelText="Email Address"
                        fullWidth={true}
                        value={this.state.email}
                        errorText={this.state.errors.email}
                        onChange={(e) => this.setState({email: e.target.value})}
                    /><br />
                    <TextField
                        floatingLabelText="Your Initial Name"
                        fullWidth={true}
                        value={this.state.name}
                        errorText={this.state.errors.name}
                        onChange={(e) => this.setState({name: e.target.value})}
                    /><br />
                    <div className="flexible-end mg30-0">
                        <RaisedButton
                            label="SHARE"
                            labelColor="#fff"
                            backgroundColor="#5c57a3"
                            onClick={this._onSubmit}
                        />
                    </div>
                </div>

            </div>
        );
    }
}
const mapDispatchToProps = dispatch => {
    return {
        addNewToast: toastData => dispatch(addNewToast(toastData)),
        dispatch: dispatch
    };
};

export default connect(null, mapDispatchToProps)(ShareData);
