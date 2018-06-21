import React, { Component } from "react";
import styles from "./YourAccountComponentStyle";

class YourAccountInfo extends Component {

    render() {
        return (
            <div style={styles.wrappLeft}>
                <div style={styles.wrappTop}>
                    <img src="images/avatar.png" style={styles.avatar} alt="Bikecoin" />
                    <h4 style={styles.name}>Pham Duc Vuong</h4>
                </div>
                <div style={styles.wrappBottom}>
                    <h4 style={styles.blance}>balance</h4>
                    <h3>99BKC</h3>
                </div>
            </div>
        );
    }
}

export default YourAccountInfo;
