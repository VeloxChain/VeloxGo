import React, { Component } from "react";
import styles from "./EditBikeComponentStyle";

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
            isLock: false,
            isHonk: false,
            isFlash: false
        };
    }

    onChangeStatus = (text, value) => {
        let newData = [];
        newData[text] = value;
        
        this.setState({
            ...this.state,
            ...newData
        });
    }

    render() {
        return (
            <div style={styles.wrappRight}>
                <div style={styles.boxLeft}>
                    <img
                        src={"https://gateway.ipfs.io/ipfs/" + this.props.bikeInfo.avatar.hash }
                        alt="Bikecoin"
                        style={styles.bike}
                    />
                </div>
                <div style={styles.boxRight}>
                    <div>
                        <button style={styles.buttonTransfer}>Transfer</button>
                        <button style={styles.buttonDelete} onClick={this.props.deytroyBike}>Destroy</button>
                        <button style={styles.buttonTransfer}>Lost mode</button>
                        
                        <div style={styles.wrappStatus}>
                            <img
                                src={this.state.isFlash ? flashOn : flashOff}
                                style={styles.iconStatus}
                                onClick={() => this.onChangeStatus("isFlash", !this.state.isFlash)}
                                alt="Bikecoin"
                            />
                            <img
                                src={this.state.isHonk ? honkOn : honk}
                                style={styles.iconStatus}
                                onClick={() => this.onChangeStatus("isHonk", !this.state.isHonk)}
                                alt="Bikecoin"
                            />
                            <img
                                src={this.state.isLock ? lockedOn : lockedOff}
                                style={styles.iconStatus}
                                onClick={() => this.onChangeStatus("isLock", !this.state.isLock)}
                                alt="Bikecoin"
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default TransferBike;
