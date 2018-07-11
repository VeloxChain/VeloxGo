import React, { Component } from "react";
import EditBikeForm from "../your_bikes/edit_bike/EditBikeForm";
import BikeInfo from "../your_bikes/edit_bike/bike_info/BikeInfo";
import styles from "../your_bikes/edit_bike/EditBikeComponentStyle";
import VerifiedAction from "./VerifiedAction";

const bikeInfo = {
    avatar: "QmPjptnaCXbTKsFfRbLswXgunJEW46ZGaTRSpLdU6qG6BZ",
    forRent: false,
    invoice: "QmTMaQuwSKFgXpz9PJVELViin7RMBJYKtQhXMoWwQtNhgB",
    isFlash: false,
    isHonk: false,
    isLock: false,
    isLocked: false,
    location: {
        lat: 41.9048293,
        long: -87.63324419999998,
        name: "1232 N LaSalle Dr, Chicago, IL 60610, Hoa Kỳ",
        country: {
            code: "US",
            name: "Hoa Kỳ"
        }
    },
    manufacturer: "Volata Cycles",
    originalOwner: "0xdda69c417c81909048f5de374057cc83e4f39e67",
    snNumber: "2019-BKC-123423424",
    status: "ACTIVE",
    tokenId: 5,
    year: 2018
};

class VerifiedBikeComponent extends Component {

    render() {
        return (
            <div style={styles.wrapp}>
                <div className="row">
                    <div className="col-sm-7">
                        <div style={styles.wrappLeft}>
                            <EditBikeForm bikeInfo={bikeInfo} accounts={this.props.accounts} getUserProfileAddress={this.props.getUserProfileAddress} />
                        </div>
                    </div>
                    <div className="col-sm-5">
                        <VerifiedAction bikeInfo={bikeInfo} {...this.props} />
                    </div>
                    <div className="col-sm-12">
                        <BikeInfo bikeInfo={bikeInfo} {...this.props} isVerified={true} />
                    </div>
                </div>
            </div>
        );
    }
}

export default VerifiedBikeComponent;
