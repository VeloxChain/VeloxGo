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
    render() {
        return (
            <div>
                <p style={styles.title}>Owner</p>
                <h4 style={styles.text}>
                    <a
                        href={"https://ropsten.etherscan.io/address/" + this.state.userProfileAddress}
                        target="_blank"
                        title="View Profile Address On EtherScan">
                        {this.state.userProfileAddress}
                    </a>
                </h4>

                <p style={styles.title}>Manufacturer</p>
                <h4 style={styles.text}>{this.props.bikeInfo.manufacturer}</h4>

                <p style={styles.title}>Bike serial</p>
                <h4 style={styles.text}>{this.props.bikeInfo.snNumber}</h4>

                <p style={styles.title}>ERC721 TOKEN</p>
                <h4 style={styles.text}>
                    <a
                        href={"https://ropsten.etherscan.io/token/" + constants.BIKECOIN_OWNER_SHIP_ADDRESS}
                        target="_blank"
                        title="View ERC721 Token On EtherScan">
                        {constants.BIKECOIN_OWNER_SHIP_ADDRESS}
                    </a>
                </h4>

                <p style={styles.title}>BIKE TOKEN</p>
                <h4 style={styles.text}>{this.props.bikeInfo.tokenId}</h4>
            </div>
        );
    }
}
export default EditBikeForm;
