import React, { Component } from "react";
import styles from "./EditBikeComponentStyle";
import EditBikeForm from "./EditBikeForm";
import TransferBike from "./TransferBike";
import BikeInfo from "./bike_info/BikeInfo";
import { updateBike, destroyBike } from "../../../actions/bikeActions";
import { toast } from "react-toastify";
import SERVICE_IPFS from "../../../services/ipfs";
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
        let bikeHash = SERVICE_IPFS.putDataToIPFS(this.state.bikeInfo);
        this.props.dispatch(updateBike(this.props.index, this.state.bikeInfo, bikeHash));
        toast.success("Saved!");
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
                            <BikeInfo bikeInfo={this.state.bikeInfo} handleChangeState={this.handleChangeState} />
                        </div>
                    </div>
                    <div className="col-sm-5">
                        <TransferBike {...this.props} handleChangeState={this.handleChangeState} deytroyBike={this.deytroyBike} />
                    </div>
                </div>
            </div>
        );
    }
}

export default EditBikeComponent;
