import React, { Component } from "react";
import styles from "./EditBikeComponentStyle";
import EditBikeForm from "./EditBikeForm";
import TransferBike from "./TransferBike";
import BikeActivities from "./BikeActivities";
import BikeInfo from "./bike_info/BikeInfo";
// import { destroyBike, uploadModifiedBikeToIPFS } from "../../../actions/bikeActions";
class EditBikeComponent extends Component {
    // deytroyBike = () => {
    //     this.props.dispatch(destroyBike(this.props.index));
    //     this.props.switchState();
    // }
    // handleChangeState = (data) => {
    //     const { bikeInfo } = this.state;
    //     let dataChanges = Object.assign(bikeInfo, data);
    //     this.setState({ bikeInfo: dataChanges });
    //     return;
    // }
    // changeBikeInfo = async () => {
    //     await this.props.dispatch(uploadModifiedBikeToIPFS(this.state.bikeInfo, this.props.index));
    // }
    transferBike = () => {

    }
    render() {
        return (
            <div style={styles.wrapp}>
                <div className="row" style={styles.rowButton}>
                    <div className="col-sm-6">
                        <button style={styles.buttonBack} onClick={this.props.switchState}>
                            <i className="fa fa-chevron-left" style={styles.iconBack} />
                            <span> GO BACK</span>
                        </button>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-7">
                        <div style={styles.wrappLeft}>
                            <EditBikeForm bikeInfo={this.props.bikeInfo} accounts={this.props.accounts} />
                        </div>
                    </div>
                    <div className="col-sm-5">
                        <TransferBike {...this.props} deytroyBike={this.deytroyBike} transferBike={this.transferBike} />
                    </div>
                    <div className="col-lg-7">
                        <BikeInfo bikeInfo={this.props.bikeInfo} />
                    </div>
                    <div className="col-lg-5" style={{marginTop:10}}>
                        <BikeActivities {...this.props} />
                    </div>
                </div>
            </div>
        );
    }
}

export default EditBikeComponent;
