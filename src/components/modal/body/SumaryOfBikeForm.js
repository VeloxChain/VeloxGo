import React, { Component } from "react";
import styles from "./CustomCss";

class SumaryOfBike extends Component {

    render() {
        return (
            <div style={styles.sumaryOfBike}>
                <div className="col-sm-4">
                    <div style={styles.wrappLeft}>
                        <img
                            src={"https://gateway.ipfs.io/ipfs/" + this.props.externalData.avatar}
                            style={styles.bikeShow}
                            alt="Bikecoin"
                        />
                    </div>
                    
                </div>
                <div className="col-sm-8">
                    <p style={styles.title}>Manufacturer</p>
                    <h5 style={styles.text}>{this.props.externalData.manufacturer}</h5>

                    <p style={styles.title}>Bike serial</p>
                    <h5 style={styles.text}>{this.props.externalData.snNumber}</h5>

                    <div style={styles.dvd} />

                    <p style={styles.title}>Address</p>
                    <h5 style={styles.text}>{this.props.externalData.location.name}</h5>

                    <p style={styles.title}>Price</p>
                    <h5 style={styles.text}>
                        <span style={styles.numberPrice}>200</span>
                        <img src="images/logo.png" style={styles.logo} alt="BikeCoin" />
                    </h5>
                    
                    <div>
                        <button style={styles.buttonBook}>Book</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default SumaryOfBike;
