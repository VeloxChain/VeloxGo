import React, { Component } from "react";
import styles from "./RentBikeComponentStyle";
import moment from "moment";
import RentBikeInvoice from "./RentBikeInvoice";
const lockedOff = "images/lockedOff.png";
const lockedOn = "images/lockedOn.png";
const flashOff = "images/flashOff.png";
const flashOn = "images/flashOn.png";
const honk = "images/honk.png";
const honkOn = "images/honkGreen.png";

class RentBikeActions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFlash: false,
            isHonk: false,
            isLock: false,
            showDialog: false,
            isConfirm: 1
        };
    }

    handleChangeShowDialog = () => {
        this.setState({
            showDialog: !this.state.showDialog
        });
    }

    handleChangeConfirm = () => {
        this.setState({
            isConfirm: 0,
            showDialog : false
        }, () => {
            setTimeout(() => {
                this.handleChangeShowDialog();
            },200);
        });
    }
    _renderInvoice = () => {
        if (this.state.showDialog) {
            return (
                <RentBikeInvoice
                    {...this.props}
                    showDialog={this.state.showDialog}
                    calculateTotalTimeUsed={this.props.calculateTotalTimeUsed}
                    handleChangeShowDialog={this.handleChangeShowDialog}
                    bikeInfo={this.props.bikeInfo}
                    finishRentBike={this.props.finishRentBike}
                    isConfirm={this.state.isConfirm}
                    handleChangeConfirm={this.handleChangeConfirm}
                />
            );
        }
    }
    render() {
        return (
            <div style={styles.wrappRight}>
                <div style={styles.boxLeft}>
                    <img
                        src={"https://gateway.ipfs.io/ipfs/" + this.props.bikeInfo.bikeInfo.avatar }
                        alt="Bikecoin"
                        style={styles.bike}
                    />
                </div>
                <div style={styles.boxRight}>
                    <div>
                        <div style={styles.center}>
                            <div style={styles.startTime}>
                                <p style={styles.title}>Start Time</p>
                                <div style={styles.wrapper}>
                                    <span style={styles.timeStart}>{moment(this.props.bikeInfo.startTime*1000).format("LLL")}</span>
                                </div>
                            </div>

                            <div>
                                <p style={styles.title}>Rental Duration</p>
                                <div style={styles.wrapper}>
                                    <span style={styles.timer}>{this.props.bikeInfo.totalTimeUsed}</span>
                                </div>
                            </div>
                        </div>
                        <div style={styles.wrappStatus}>
                            <img
                                src={this.state.isFlash ? flashOn : flashOff}
                                style={styles.iconStatus}
                                onClick={() => this.setState({isFlash: !this.state.isFlash})}
                                alt="Bikecoin"
                            />
                            <img
                                src={this.state.isHonk ? honkOn : honk}
                                style={styles.iconStatus}
                                onClick={() => this.setState({isHonk: !this.state.isHonk})}
                                alt="Bikecoin"
                            />
                            <div style={{ minHeight: "43px" }}>
                                <img
                                    src={this.state.isLock ? lockedOn : lockedOff}
                                    style={styles.iconStatus}
                                    onClick={() => this.setState({isLock: !this.state.isLock})}
                                    alt="Bikecoin"
                                />
                            </div>
                        </div>
                        <button
                            style={styles.buttonVerified}
                            onClick={this.handleChangeShowDialog}
                        >
                            Return Bike
                        </button>
                        {this._renderInvoice()}
                    </div>
                </div>
            </div>
        );
    }
}
export default RentBikeActions;
