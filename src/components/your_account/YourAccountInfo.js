import React, { Component } from "react";
import styles from "./YourAccountComponentStyle";

class YourAccountInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            bkc: 0,
            eth: 0
        };
    }
    _renderETHBalance = (balance,) => {
        this.setState({eth: balance});
    }
    _renderBKCBalance = (balance,) => {
        this.setState({bkc: balance});
    }
    componentDidMount() {
        const { userProfile } = this.props;
        this.props.ethereum.getBalance(userProfile.data.accountAddress, this._renderETHBalance);
        this.props.ethereum.getBikeCoinBalance(userProfile.data.accountAddress, this._renderBKCBalance);
    }

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
                            BKC: {this.state.bkc}
                            <br />
                            ETH: {this.state.eth}
                        </p>
                        <button style={styles.buttonCollect}>collect 200 bkc</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default YourAccountInfo;
