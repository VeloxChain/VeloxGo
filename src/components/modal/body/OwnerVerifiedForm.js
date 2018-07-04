import React, { Component } from "react";
import styles from "./CustomCss";

class OwnerVerifiedForm extends Component {

    render() {
        return (
            <div style={styles.sumaryOfBike}>
                <div className="col-sm-4">
                    <img
                        src={"https://gateway.ipfs.io/ipfs/" + this.props.externalData.avatar}
                        style={styles.image}
                        alt="Bikecoin"
                    />
                </div>
                <div className="col-sm-8">
                    <p style={styles.title}>Manufacturer</p>
                    <h4 style={styles.text}>{this.props.externalData.manufacturer}</h4>

                    <p style={styles.title}>Owner</p>
                    <h4 style={styles.text}>{this.props.externalData.originalOwner}</h4>

                    <p style={styles.title}>Bike serial</p>
                    <h4 style={styles.text}>{this.props.externalData.snNumber}</h4>

                    <p style={styles.title}>Address</p>
                    <h4 style={styles.text}>{this.props.externalData.location.name}</h4>

                    <p style={styles.title}>Price (BKC)</p>
                    <h4 style={styles.text}>{200}</h4>
                </div>
                <div className="text-center">
                    <button style={styles.button}>Verified</button>
                </div>
            </div>
        );
    }
}

export default OwnerVerifiedForm;
