import React, { Component } from "react";
import styles from "./YourAccountComponentStyle";

class YourAccountInfo extends Component {

    render() {
        let { userProfile } = this.props;
        return (
            <div style={styles.wrappLeft}>
                <div style={styles.wrappTop}>
                    <img src={userProfile.data.avatar} style={styles.avatar} alt="Bikecoin" />
                    <h4 style={styles.name}>{userProfile.data.firstname + " " + userProfile.data.lastname}</h4>
                </div>
                <div style={styles.wrappBottom}>
                    <h4 style={styles.blance}>balance</h4>
                    <h3>0 BKC</h3>
                </div>
            </div>
        );
    }
}

export default YourAccountInfo;
