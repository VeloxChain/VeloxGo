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
    logo: {
        width:30
    }
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
                <h4 style={styles.text} className="test-ellipsis">
                    <a
                        href={constants.ADDRESS_URL + this.state.userProfileAddress}
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
                        <span>{this.props.bikeInfo.price.toLocaleString()} <img src="images/Velox-icon.png" style={styles.logo} alt="VeloxCoin" /> / 1h </span>
                    </h4>
                </div>
            );
        }
        return (
            <div>
                <p style={styles.title}>Vehicle Token</p>
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

                <p style={styles.title}>Vehicle Reg</p>
                <h4 style={styles.text}>{this.props.bikeInfo.snNumber}</h4>

                <p style={styles.title}>ERC721 Token</p>
                <h4 style={styles.text} className="test-ellipsis">
                    <a
                        href={constants.TOKEN_URL + constants.BIKECOIN_OWNER_SHIP_ADDRESS}
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
