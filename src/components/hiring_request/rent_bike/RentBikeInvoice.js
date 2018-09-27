import React, { Component } from "react";
import styles from "./RentBikeComponentStyle";
import { Dialog } from "material-ui";
import { finishReturnBike } from "../../../actions/bikeActions";

class RentBikeInvoice extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userProfileAddress: "",
            totalTimeUsed: "",
            subTotal: 0,
            totalTime: 0
        };
    }

    componentDidMount() {
        this._renderProfile();
    }

    _renderProfile = async () => {
        let profileAddress = await this.props.getUserProfileAddress();
        this.setState({
            userProfileAddress: profileAddress
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
                <h3 style={styles.thanks}>Thank you for your business!</h3>
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
        let totalTime = this.props.invoice.totalTime;
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
                className="image-crop"
            >
                <div className="row" style={styles.bodyContent}>
                    <div className="col-sm-8">
                        <p style={styles.flex}>
                            <span style={styles.titleInvoice}>Vehicle Reg:</span>
                            <span style={styles.textInvoice}>{this.props.bikeInfo.bikeInfo.snNumber}</span>
                        </p>
                        <p style={styles.flex}>
                            <span style={styles.titleInvoice}>Token No:</span>
                            <span style={styles.textInvoice}>{this.props.bikeInfo.bikeInfo.tokenId}</span>
                        </p>
                        <p style={styles.flex}>
                            <span style={styles.titleInvoice}>Vehicle Owner:</span>
                            <span style={styles.textInvoice}>{this.props.bikeInfo.bikeInfo.owner}</span>
                        </p>
                        <p style={styles.flex}>
                            <span style={styles.titleInvoice}>Renter:</span>
                            <span style={styles.textInvoice}>{this.state.userProfileAddress}</span>
                        </p>
                    </div>
                    <div className="col-sm-4">
                        <img
                            src={"https://gateway.ipfs.io/ipfs/" + this.props.bikeInfo.bikeInfo.avatar }
                            alt="VeloxGo"
                            style={styles.bikeInvoice}
                        />
                    </div>
                    <div className="col-sm-12">
                        <div className="table-responsive">
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
                                        <td>{this.props.invoice.totalTimeUsed}</td>
                                        <td>
                                            {this.props.bikeInfo.bikeInfo.price}
                                            <img src="images/Velox-icon.png" style={styles.logoBike} alt="VeloxGo" />
                                        </td>
                                        <td>{this.props.invoice.subTotal}</td>
                                    </tr>
                                    <tr>
                                        <td colSpan="4" className="text-right" style={styles.total}>
                                            <span>Total: {this.props.invoice.subTotal}</span>
                                            <img src="images/Velox-icon.png" style={styles.logoBike} alt="VeloxGo" />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {this._renderAction()}
            </Dialog>
        );
    }
}

export default RentBikeInvoice;
