import React, { Component } from "react";
import styles from "./YourAccountComponentStyle";

class YourAccountInfo extends Component {

    render() {
        let { userProfile } = this.props;
        return (
            <div style={styles.wrappLeft}>
                <div style={styles.wrappTop}>
                    <div style={{float:"left", marginRight: 20}}>
                        <img src={"https://gateway.ipfs.io/ipfs/" + userProfile.data.avatar} style={styles.avatar} alt="Bikecoin" />
                    </div>
                    <div style={{float:"left"}}>
                        <h4 style={styles.name}>{userProfile.data.firstname + " " + userProfile.data.lastname}</h4>
                        <p style={styles.text}>
                            BKC: {this.props.info.bkc}
                            <br />
                            ETH: {this.props.info.eth}
                        </p>
                        <button style={styles.buttonCollect}>collect 200 bkc</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default YourAccountInfo;
