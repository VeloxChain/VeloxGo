import React, { Component } from "react";
import constants from "../../../services/constants";
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
    constructor(props) {
        super(props);
        this.state = {
            userProfileAddress: "",
        };
    }
    componentDidMount() {
        this.getProfileAddress();
    }
    getProfileAddress = async () => {
        let userProfileAddress = await this.props.getUserProfileAddress();
        this.setState({
            userProfileAddress: userProfileAddress
        });
    }
    _renderOwner = () => {
        if (this.props.isRent) {
            return;
        }
        return (
            <div>
                <p style={styles.title}>Owner</p>
                <h4 style={styles.text}>
                    <a
                        href={"https://ropsten.etherscan.io/address/" + this.state.userProfileAddress}
                        target="_blank"
                        title="View Profile Address On EtherScan">
                        {this.state.userProfileAddress + " "}
                        <i className="fa fa-external-link"></i>
                    </a>
                </h4>
            </div>
        );
    }

    _renderBikePrice = () => {
        if (this.props.isRent) {
            return (
                <div>
                    <p style={styles.title}>Price</p>
                    <h4 style={styles.text}>
                        <span>200 / 1h </span>
                        <img src="images/Logo.png" style={styles.logo} alt="BikeCoin" />
                    </h4>
                </div>
            );
        }
        return (
            <div>
                <p style={styles.title}>Bike Token</p>
                <h4 style={styles.text}>{this.props.bikeInfo.tokenId}</h4>
            </div>
        );
    }
    render() {
        return (
            <div>
                {this._renderOwner()}
                <p style={styles.title}>Manufacturer</p>
                <h4 style={styles.text}>{this.props.bikeInfo.manufacturer}</h4>

                <p style={styles.title}>Bike serial</p>
                <h4 style={styles.text}>{this.props.bikeInfo.snNumber}</h4>

                <p style={styles.title}>ERC721 Token</p>
                <h4 style={styles.text}>
                    <a
                        href={"https://ropsten.etherscan.io/token/" + constants.BIKECOIN_OWNER_SHIP_ADDRESS}
                        target="_blank"
                        title="View ERC721 Token On EtherScan">
                        {constants.BIKECOIN_OWNER_SHIP_ADDRESS + " "}
                        <i className="fa fa-external-link"></i>
                    </a>
                </h4>
                {this._renderBikePrice()}
            </div>
        );
    }
}
export default EditBikeForm;
