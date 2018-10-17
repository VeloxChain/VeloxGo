import React, { Component } from "react";
import styles from "./CustomCss";

class SumaryOfBike extends Component {

    bookingBike = () => {
        this.props.externalData.handle();
        this.props.closeModal();
    }
    render() {
        const {bikeInfo} = this.props.externalData;
        return (
            <div style={styles.sumaryOfBike}>
                <div className="col-sm-4">
                    <div style={styles.wrappLeft}>
                        <img
                            src={"https://gateway.ipfs.io/ipfs/" + bikeInfo.avatar}
                            style={styles.bikeShow}
                            alt="VeloxGo"
                        />
                    </div>

                </div>
                <div className="col-sm-8">
                    <p style={styles.title} className="box-left-mobile">Manufacturer</p>
                    <h5 style={styles.text}>{bikeInfo.manufacturer}</h5>

                    <p style={styles.title}>Vehicle Reg</p>
                    <h5 style={styles.text}>{bikeInfo.snNumber}</h5>

                    <div style={styles.dvd} />

                    <p style={styles.title}>Address</p>
                    <h5 style={styles.text}>{bikeInfo.location.name}</h5>

                    <p style={styles.title}>Price</p>
                    <h5 style={styles.text}>
                        <span style={styles.numberPrice}>{bikeInfo.price.toLocaleString()}</span>
                        <img src="images/Velox-icon.png" style={styles.logo} alt="VeloxGo" />
                    </h5>

                    <div>
                        <button style={styles.buttonBook} onClick={this.bookingBike}>Book</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default SumaryOfBike;
