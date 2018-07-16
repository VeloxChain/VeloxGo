import React, { Component } from "react";
import styles from "./RentBikeComponentStyle";
import { Dialog } from "material-ui";
import moment from "moment";
import { finishReturnBike } from "../../../actions/bikeActions";

class RentBikeInvoice extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userProfileAddress: "",
            totalTimeUsed: "",
            subTotal: 0,
            totalTime: 0
        }
    }

    componentDidMount() {
        this._renderProfile();
        this._renderRentalPeriod();
    }

    _renderProfile = async () => {
        let profileAddress = await this.props.getUserProfileAddress();
        this.setState({
            userProfileAddress: profileAddress
        });
    }
    _renderRentalPeriod = () => {
        const { bikeInfo } = this.props;
        let startTime = moment(bikeInfo.startTime*1000);
        let now = moment();
        let duration = moment.duration(now.diff(startTime));
        let totalTime = now.unix();
        let dataDuration = duration._data;
        let totalTimeUsed = this.props.calculateTotalTimeUsed(dataDuration);
        this.setState({
            totalTimeUsed: totalTimeUsed,
            totalTime: totalTime
        }, () => this._renderBKCUsed(duration));
    }
    _renderBKCUsed = (duration) => {
        const { bikeInfo } = this.props.bikeInfo;
        let totalTimeUsed = duration.as("seconds");
        let subTotal = bikeInfo.price /3600 * totalTimeUsed;
        subTotal = subTotal.toFixed(2);
        this.setState({
            subTotal: subTotal
        });
    }
    _renderAction = () => {
        if (this.props.isConfirm === 1) {
            return (
                <div className="text-center">
                    <button
                        onClick={this.props.handleChangeShowDialog}
                        style={styles.buttonInvoice}
                    >
                        Cancel
                    </button>
                    <button
                        style={styles.buttonInvoice}
                        onClick={this.handleSubmit}
                    >
                        Pay
                    </button>
                </div>
            );
        } 
        return (
            <div className="text-center">
                <button
                    onClick={this.finishReturnBike}
                    style={styles.buttonInvoice}
                >
                    Ok
                </button>
            </div>
        );     
    }
    finishReturnBike = () => {
        this.props.dispatch(finishReturnBike());
    }
    _renderTitle = () => {
        if (this.props.isConfirm === 1) {
            return "Rent Invoice";
        }
        return "Rent Receipt";
    }
    handleSubmit = () => {
        let callBack = this.props.handleChangeConfirm;
        let totalTime = this.state.totalTime;
        this.props.finishRentBike(
            this.props.bikeInfo.bikeInfo.tokenId,
            callBack,
            totalTime
        );
    }
    render() {
        return (
            <Dialog
                title={this._renderTitle()}
                modal={false}
                open={this.props.showDialog}
                autoScrollBodyContent={true}
                repositionOnUpdate={true}
                titleStyle={styles.titleStyle}
            >
                <div className="row" style={styles.bodyContent}>
                    <div className="col-sm-8">
                        <p style={styles.flex}>
                            <span style={styles.titleInvoice}>Bike Serial:</span>
                            <span style={styles.textInvoice}>{this.props.bikeInfo.bikeInfo.snNumber}</span>
                        </p>
                        <p style={styles.flex}>
                            <span style={styles.titleInvoice}>Token No:</span>
                            <span style={styles.textInvoice}>{this.props.bikeInfo.bikeInfo.tokenId}</span>
                        </p>
                        <p style={styles.flex}>
                            <span style={styles.titleInvoice}>Bike Owner:</span>
                            <span style={styles.textInvoice}>{this.props.bikeInfo.bikeInfo.originalOwner}</span>
                        </p>
                        <p style={styles.flex}>
                            <span style={styles.titleInvoice}>Renter:</span>
                            <span style={styles.textInvoice}>{this.state.userProfileAddress}</span>
                        </p>
                    </div>
                    <div className="col-sm-4">
                        <img
                            src={"https://gateway.ipfs.io/ipfs/" + this.props.bikeInfo.bikeInfo.avatar }
                            alt="Bikecoin"
                            style={styles.bikeInvoice}
                        />
                    </div>
                    <div className="col-sm-12">
                        <table className="table" style={styles.table}>
                            <thead>
                                <tr>
                                    <th>Description</th>
                                    <th>Hours</th>
                                    <th>Price / 1h</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Rent Fee</td>
                                    <td>{this.state.totalTimeUsed}</td>
                                    <td>
                                        {this.props.bikeInfo.bikeInfo.price}
                                        <img src="images/logo.png" style={styles.logoBike} alt="BikeCoin" />
                                    </td>
                                    <td>{this.state.subTotal.toLocaleString()}</td>
                                </tr>
                                <tr>
                                    <td colSpan="4" className="text-right" style={styles.total}>
                                        <span>Total: {this.state.subTotal.toLocaleString()}</span>
                                        <img src="images/logo.png" style={styles.logoBike} alt="BikeCoin" />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {this._renderAction()}
            </Dialog>
        );
    }
}

export default RentBikeInvoice;
