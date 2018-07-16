import React, { Component } from "react";

class RegisterBikeSuccess extends Component {

    render() {
        return (
            <div className="wrapp">
                <div className="w100p text-center">
                    <div className="row">
                        <div className="col-sm-8 col-sm-offset-2">
                            <h3 className="text-success">All set!</h3>
                            <img src="images/success.png" className="success" alt="Bikecoin" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default RegisterBikeSuccess;
