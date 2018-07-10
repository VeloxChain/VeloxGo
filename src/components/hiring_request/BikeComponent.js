import React, { Component } from "react";
import { MODAL_SUMARY_OF_BIKE } from "../modal/constants";
import styles from "./HiringRequestComponentStyle";

class BikeComponent extends Component {

    render() {
        return (
            <div className="col-sm-3">
                <div style={styles.block}>
                    <div style={styles.wrapper} onClick={() => this.props.setType(MODAL_SUMARY_OF_BIKE, this.props.bike)}>
                        <img
                            src={"https://gateway.ipfs.io/ipfs/" + this.props.bike.avatar}
                            alt="Bikecoin"
                            style={styles.bike}
                        />
                        <div style={styles.address}>
                            <div style={styles.text}>
                                <span style={styles.bold}>Location: </span>
                                <span>{this.props.bike.location.name}</span>
                            </div>
                        </div>
                    </div>
                    
                    <div style={styles.action}>
                        <div style={styles.price}>
                            <span style={styles.number}>200</span>
                            <img src="images/Logo.png" style={styles.logo} alt="BikeCoin" />
                        </div>
                        <div style={styles.dvdButton}>
                            <button style={styles.button}>book</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default BikeComponent;
