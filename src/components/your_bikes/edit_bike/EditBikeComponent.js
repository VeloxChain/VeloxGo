import React, { Component } from "react";
import styles from "./EditBikeComponentStyle";
import EditBikeForm from "./EditBikeForm";
import TransferBike from "./TransferBike";
import BikeActivities from "./BikeActivities";
import BikeInfo from "./bike_info/BikeInfo";
import { uploadModifiedBikeToIPFS, destroyBike } from "../../../actions/bikeActions";
class EditBikeComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bikeInfo: this.props.bikeInfo
        };
    }
    handleChangeState = (data) => {
        const { bikeInfo } = this.state;
        let dataChanges = Object.assign(bikeInfo, data);
        this.setState({ bikeInfo: dataChanges });
        return;
    }
    changeBikeInfo = async () => {
        await this.props.dispatch(uploadModifiedBikeToIPFS(this.state.bikeInfo, this.props.index));
    }
    deytroyBike = () => {
        this.props.dispatch(destroyBike(this.props.index));
        this.props.switchState();
    }
    render() {
        return (
            <div style={styles.wrapp}>
                <div style={styles.rowButton}>
                    <button style={styles.buttonBack} onClick={this.props.switchState}> <i className="fa fa-chevron-left"></i> GO BACK</button>
                    <button style={styles.buttonSave} onClick={this.changeBikeInfo}>Save</button>
                </div>
                <div className="row">
                    <div className="col-sm-7">
                        <div style={styles.wrappLeft}>
                            <EditBikeForm bikeInfo={this.state.bikeInfo} handleChangeState={this.handleChangeState} />
                        </div>
                    </div>
                    <div className="col-sm-5">
                        <TransferBike {...this.props} handleChangeState={this.handleChangeState} deytroyBike={this.deytroyBike} />
                    </div>
                    <div className="col-lg-8">
                        <BikeInfo bikeInfo={this.state.bikeInfo} handleChangeState={this.handleChangeState} />
                    </div>
                    <div className="col-lg-4" style={{marginTop:10}}>
                        <BikeActivities {...this.props} />
                    </div>
                </div>
            </div>
        );
    }
}

export default EditBikeComponent;
