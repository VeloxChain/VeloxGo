import React, { Component } from "react";
import Toggle from "material-ui/Toggle";
import styles from "./EditBikeComponentStyle";
class TransferBike extends Component {
    render() {
        return (
            <div style={styles.wrappRight}>
                <div style={styles.boxLeft}>
                    <img src="images/bike.png" alt="Bikecoin" style={styles.bike} />
                </div>
                <div style={styles.boxRight}>
                    <div>
                        <button style={styles.buttonTransfer}>Transfer</button>
                        <button style={styles.buttonDelete}>Delete</button>
                        <Toggle
                            label="UNLOCKED"
                            labelPosition="right"
                            style={styles.toggle}
                        />
                    </div>
                </div>
            </div>
        );
    }
}
export default TransferBike;
