import React, { Component } from "react";
import MapRegisterBike from "../../../map_register_bike/MapRegisterBike";

class RegisterBikeLocation extends Component {
    render() {
        return (
            <div className="wrapp">
                <div className="w100p">
                    <div className="row">
                        <div className="col-sm-8 col-sm-offset-2">
                            <MapRegisterBike handleChangeState={this.props.handleChangeState}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default RegisterBikeLocation;
