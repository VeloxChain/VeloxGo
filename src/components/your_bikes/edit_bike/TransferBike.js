import React, { Component } from "react";
import styles from "./EditBikeComponentStyle";
import { toast } from "react-toastify";
const lockedOff = "images/lockedOff.png";
const lockedOn = "images/lockedOn.png";
const flashOff = "images/flashOff.png";
const flashOn = "images/flashOn.png";
const honk = "images/honk.png";
const honkOn = "images/honkGreen.png";

class TransferBike extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFlash: false,
            isHonk: false,
            isLock: false,
        };
    }
    notifyFeatures = () => {
        toast.info("This feature is not supported in MVP");
    }
    render() {
        return (
            <div className="wrapp-right">
                <div className="box-left">
                    <img
                        src={"https://gateway.ipfs.io/ipfs/" + this.props.bikeInfo.avatar }
                        alt="Velox Go"
                        style={styles.bike}
                    />
                </div>
                <div className="box-right">
                    <div>
                        <button style={styles.buttonTransfer} onClick={this.props.transferBike}>Transfer</button>
                        <button style={styles.buttonDelete} onClick={this.notifyFeatures}>Destroy</button>
                        <button style={styles.buttonTransfer} onClick={this.notifyFeatures}>Lost mode</button>

                        <div style={styles.wrappStatus}>
                            <img
                                src={this.state.isFlash ? flashOn : flashOff}
                                style={styles.iconStatus}
                                onClick={() => this.setState({isFlash: !this.state.isFlash})}
                                alt="Velox Go"
                            />
                            <img
                                src={this.state.isHonk ? honkOn : honk}
                                style={styles.iconStatus}
                                onClick={() => this.setState({isHonk: !this.state.isHonk})}
                                alt="Velox Go"
                            />
                            <div style={{ minHeight: "43px" }}>
                                <img
                                    src={this.state.isLock ? lockedOn : lockedOff}
                                    style={styles.iconStatus}
                                    onClick={() => this.setState({isLock: !this.state.isLock})}
                                    alt="Velox Go"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default TransferBike;
