import React, { Component } from "react";
import styles from "./BikeHiringInfoStyle";

class BikeHiringInfo extends Component {
    render() {
        return (
            <div style={styles.sumaryOfBike}>
                <img
                    style={styles.bikeImage}
                    src={"https://gateway.ipfs.io/ipfs/" + this.props.externalData.avatar}
                    alt="Bikecoin"
                />

                <div style={styles.bodyContent}>
                    <div style={styles.boxContent}>
                        <div style={styles.w100}>
                            <p style={styles.text}><span style={styles.bold}>Manufacturer:</span> { this.props.externalData.manufacturer }</p>
                            <p style={styles.text}><span style={styles.bold}>Bike serial:</span> { this.props.externalData.snNumber }</p>
                        </div>
                    </div>
                    <div style={styles.action}>
                        <div>
                            <span style={styles.number}>20</span>
                            <img src="images/Logo.png" style={styles.icon} alt="BikeCoin" />
                        </div>
                        <button style={styles.button}>Book</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default BikeHiringInfo;
