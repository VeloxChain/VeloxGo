import React, { Component } from "react";
const styles = {
    title: {
        fontWeight: "bold",
        color: "rgba(0, 0, 0, 0.3)",
        marginBottom: "5px"
    },

    text: {
        marginTop: "0",
        marginBottom: "20px"
    },
};
class EditBikeForm extends Component {
    render() {
        return (
            <div>
                <p style={styles.title}>Owner</p>
                <h4 style={styles.text}>{this.props.bikeInfo.owner}</h4>

                <p style={styles.title}>Manufacturer</p>
                <h4 style={styles.text}>{this.props.bikeInfo.manufacturer}</h4>

                <p style={styles.title}>Bike serial</p>
                <h4 style={styles.text}>{this.props.bikeInfo.snNumber}</h4>

                <p style={styles.title}>Address</p>
                <h4 style={styles.text}>{this.props.bikeInfo.bikeAddress}</h4>

                <p style={styles.title}>Price (BKC)</p>
                <h4 style={styles.text}>{200}</h4>
            </div>
        );
    }
}
export default EditBikeForm;
