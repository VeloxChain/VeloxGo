import React, { Component } from "react";
import styles from "./BikeHiringInfoStyle";

class BikeHiringInfo extends Component {
    render() {
        console.log(this.props.externalData);
        return (
            <div className="row" style={styles.sumaryOfBike}>
                <div style={styles.bodyContent}>
                    <img
                        style={styles.bikeImage}
                        src={"https://gateway.ipfs.io/ipfs/" + this.props.externalData.avatar}
                        alt="Bikecoin"
                    />
                    <div style={styles.line} ></div>
                    <div>
                        <p style={styles.text}>Manufacturer: { this.props.externalData.manufacturer }</p>
                        <p style={styles.text}>Owner: { this.props.externalData.owner }</p>
                        <p style={styles.text}>Bike serial: { this.props.externalData.snNumber }</p>
                        <p style={styles.text}>Price: 20 BKC</p>
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
