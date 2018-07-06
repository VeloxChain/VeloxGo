import React, { Component } from "react";
import { MODAL_SUMARY_OF_BIKE } from "../modal/constants";
import styles from "./HiringRequestComponentStyle";

class BikeComponent extends Component {

    render() {
        return (
            <div className="col-sm-3">
                <div style={styles.block}>
                    <img
                        src={"https://gateway.ipfs.io/ipfs/" + this.props.bike.avatar}
                        alt="Bikecoin"
                        style={styles.bike}
                        onClick={() => this.props.setType(MODAL_SUMARY_OF_BIKE, this.props.bike)}
                    />
                    <div style={styles.action}>
                        <button style={styles.button}>book</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default BikeComponent;
