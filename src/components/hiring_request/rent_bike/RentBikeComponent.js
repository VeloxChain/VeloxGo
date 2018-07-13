import React, { Component } from "react";
import styles from "./RentBikeComponentStyle";

class RentBikeComponent extends Component {

    handleChangeRentBike = () => {
        this.props.handleChangeRentBike();
    }

    render() {
        return (
            <div style={styles.wrapp}>
                <div className="row">
                    <div className="col-sm-12">
                        <button style={styles.buttonBack} onClick={this.handleChangeRentBike}>
                            <i className="fa fa-chevron-left" style={styles.iconBack} />
                            <span> GO BACK</span>
                        </button>
                    </div>
                    <div className="col-sm-4">
                        <div style={styles.wrappLeft}>
                            <img
                                src={"https://gateway.ipfs.io/ipfs/" + this.props.bikeInfo.avatar}
                                style={styles.bikeShow}
                                alt="Bikecoin"
                            />
                        </div>
                    </div>
                    <div className="col-sm-8">
                        <p style={styles.title}>Manufacturer</p>
                        <h5 style={styles.text}>{this.props.bikeInfo.manufacturer}</h5>

                        <p style={styles.title}>Bike serial</p>
                        <h5 style={styles.text}>{this.props.bikeInfo.snNumber}</h5>

                        <div style={styles.dvd} />

                        <p style={styles.title}>Address</p>
                        <h5 style={styles.text}>{this.props.bikeInfo.location.name}</h5>

                        <p style={styles.title}>Price</p>
                        <h5 style={styles.text}>
                            <span style={styles.numberPrice}>200</span>
                            <img src="images/Logo.png" style={styles.logo} alt="BikeCoin" />
                        </h5>
                        
                        <div style={styles.dvd} />

                        <div style={styles.flex}>
                            <div style={styles.block}>
                                <p style={styles.title}>Time Start</p>
                                <div style={styles.wrapper}>
                                    <span style={styles.timeStart}>10:10:00</span>
                                    <span style={styles.am}>AM</span>
                                </div>
                            </div>
                            
                            <div style={styles.block}>
                                <p style={styles.title}>Timer</p>
                                <div style={styles.wrapper}>
                                    <span style={styles.timer}>10:10:00</span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <button style={styles.button} onClick={this.handleChangeRentBike}>Finish</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default RentBikeComponent;
