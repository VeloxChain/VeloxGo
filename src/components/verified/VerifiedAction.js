import React, { Component } from "react";
import styles from "../your_bikes/edit_bike/EditBikeComponentStyle";
import { MODAL_OWNER_VERIFIED } from "../modal/constants";

class VerifiedAction extends Component {

    render() {
        return (
            <div className="wrapp-right">
                <div className="box-left">
                    <img
                        src={"https://gateway.ipfs.io/ipfs/" + this.props.bikeInfo.avatar }
                        alt="VeloxGo"
                        style={styles.bike}
                    />
                </div>
                <div className="box-right box-right-verified">
                    <div>
                        <button style={styles.buttonVerified} onClick={() => this.props.setType(MODAL_OWNER_VERIFIED, this.props.bikeInfo)}>Verified</button>
                    </div>
                </div>
            </div>
        );
    }
}
export default VerifiedAction;
