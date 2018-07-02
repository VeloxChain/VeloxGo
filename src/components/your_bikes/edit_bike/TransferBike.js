import React, { Component } from "react";
import styles from "./EditBikeComponentStyle";

const lockedOff = "images/lockedOff.png";
const lockedOn = "images/lockedOn.png";
const flashOff = "images/flashOff.png";
const flashOn = "images/flashOn.png";
const honk = "images/honk.png";
const honkOn = "images/honkGreen.png";

class TransferBike extends Component {
    render() {
        return (
            <div style={styles.wrappRight}>
                <div style={styles.boxLeft}>
                    <img
                        src={"https://gateway.ipfs.io/ipfs/" + this.props.bikeInfo.avatar }
                        alt="Bikecoin"
                        style={styles.bike}
                    />
                </div>
                <div style={styles.boxRight}>
                    <div>
                        <button style={styles.buttonTransfer} onClick={this.props.transferBike}>Transfer</button>
                        <button style={styles.buttonDelete} onClick={this.props.deytroyBike}>Destroy</button>
                        <button style={styles.buttonTransfer}>Lost mode</button>

                        <div style={styles.wrappStatus}>
                            <img
                                src={this.props.bikeInfo.isFlash ? flashOn : flashOff}
                                style={styles.iconStatus}
                                alt="Bikecoin"
                            />
                            <img
                                src={this.props.bikeInfo.isHonk ? honkOn : honk}
                                style={styles.iconStatus}
                                alt="Bikecoin"
                            />
                            <div style={{ minHeight: "43px" }}>
                                <img
                                    src={this.props.bikeInfo.isLock ? lockedOn : lockedOff}
                                    style={styles.iconStatus}
                                    alt="Bikecoin"
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
