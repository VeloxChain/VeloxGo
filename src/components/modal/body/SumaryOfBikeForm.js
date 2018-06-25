import React, { Component } from "react";
import TextField from "material-ui/TextField";
import styles from "./CustomCss";

class SumaryOfBike extends Component {

    render() {
        return (
            <div style={styles.sumaryOfBike}>
                <div className="col-sm-8 col-sm-offset-2">
                    <TextField
                        floatingLabelText="Manufacturer"
                        value={this.props.externalData.manufacturer}
                        fullWidth
                    />
                    <TextField
                        floatingLabelText="Owner"
                        value={this.props.externalData.owner}
                        fullWidth
                    />
                    <TextField
                        floatingLabelText="Bike serial"
                        value={this.props.externalData.snNumber}
                        fullWidth
                    />
                    <TextField
                        floatingLabelText="Address"
                        value={this.props.externalData.address}
                        fullWidth
                    />
                    <TextField
                        floatingLabelText="Price"
                        value={this.props.externalData.price}
                        fullWidth
                    />
                </div>
                <div className="text-center">
                    <button style={styles.button}>send hire request</button>
                </div>
            </div>
        );
    }
}

export default SumaryOfBike;
