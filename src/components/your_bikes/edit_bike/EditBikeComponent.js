import React, { Component } from "react";
import styles from "./EditBikeComponentStyle";
import EditBikeForm from "./EditBikeForm";
import TransferBike from "./TransferBike";
import BikeInfo from "./bike_info/BikeInfo";
class EditBikeComponent extends Component {

    render() {
        return (
            <div style={styles.wrapp}>
                <button style={styles.buttonTransfer} onClick={this.props.switchState}> <i className="fa fa-chevron-left"></i> GO BACK</button>
                <div className="row">
                    <div className="col-sm-7">
                        <div style={styles.wrappLeft}>
                            <EditBikeForm {...this.props} />
                            <BikeInfo {...this.props}/>
                        </div>
                    </div>
                    <div className="col-sm-5">
                        <TransferBike {...this.props} />
                    </div>
                </div>
            </div>
        );
    }
}

export default EditBikeComponent;
