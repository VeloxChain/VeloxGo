import React, { Component } from "react";
import styles from "./BikeHiringInfoStyle";
import loadingImage from "../../assets/images/loading.gif";

class BikeHiringInfo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loaded: false
        };
    }
    handleChangeRentBike = () => {
        this.props.handleChangeRentBike(this.props.externalData);
    }

    render() {
        return (
            <div style={styles.sumaryOfBike}>
                <img
                    style={{...styles.bikeImage, ...{display: this.state.loaded? "block": "none"}}}
                    src={"https://gateway.ipfs.io/ipfs/" + this.props.externalData.avatar}
                    alt="Bikecoin"
                    onLoad={()=>this.setState({loaded: true })}
                />
                <img
                    src={loadingImage}
                    alt="Bikecoin"
                    style={{...styles.bikeImage, ...{display: this.state.loaded? "none": "block"}}}
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
                            <span style={styles.number}>200/1h</span>
                            <img src="images/Logo.png" style={styles.icon} alt="BikeCoin" />
                        </div>
                        <button style={styles.button} onClick={this.handleChangeRentBike}>Book</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default BikeHiringInfo;
