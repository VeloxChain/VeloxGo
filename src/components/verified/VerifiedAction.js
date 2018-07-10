import React, { Component } from "react";
import styles from "../your_bikes/edit_bike/EditBikeComponentStyle";
import { MODAL_OWNER_VERIFIED } from "../modal/constants";

class VerifiedAction extends Component {
    
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
                        <button style={styles.buttonVerified} onClick={() => this.props.setType(MODAL_OWNER_VERIFIED, this.props.bikeInfo)}>Verified</button>
                    </div>
                </div>
            </div>
        );
    }
}
export default VerifiedAction;
