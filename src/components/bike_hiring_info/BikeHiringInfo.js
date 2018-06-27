import React, { Component } from "react";
import styles from "./BikeHiringInfoStyle";

class BikeHiringInfo extends Component {
    render() {
        return (
            <div className="row" style={styles.sumaryOfBike}>
                <div style={styles.bodyContent}>
                    <img style={styles.bikeImage} src="images/bike.png" />
                    <div style={styles.line} ></div>
                    <div>
                        <p>Manufacturer: eowiroiwer</p>
                        <p>Owner: ewrweori</p>
                        <p>Bike serial: ldfsjflkdjsaflsj</p>
                        <p>Price: 20 BKC</p>
                    </div>
                        
                </div>

                <div className="text-center">
                    <button style={styles.button}>send hire request</button>
                </div>
            </div>
        );
    }
}

export default BikeHiringInfo;
