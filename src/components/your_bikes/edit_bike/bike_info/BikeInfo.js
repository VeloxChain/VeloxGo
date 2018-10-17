import React, { Component } from "react";
import BikeLocations from "./BikeLocations";
import OwnerHistory from "./owner_history/OwnerHistory";
import RidingPerfomance from "./riding_perfomance/RidingPerfomance";
import {Tabs, Tab} from "material-ui/Tabs";
import styles from "../EditBikeComponentStyle";
import BikeSpecifications from "./bike_specifications/BikeSpecifications";
class BikeInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tabIndex: 0,
        };
    }
    handleChange = (index) => {
        this.setState({
            tabIndex: index
        });
    };

    _renderOwnerHistory = () => {
        if (this.props.isVerified) {
            return;
        }

        return (
            <Tab
                className="tab"
                label="Owner history"
                value={2}
                style={this.state.tabIndex === 2 ? styles.tabActive : styles.tab}
            >
                <OwnerHistory {...this.props} />
            </Tab>
        );
    }
    _renderRidingPerfomance = () => {
        if (this.props.isRent) {
            return;
        }

        return (
            <Tab
                className="tab"
                label="Riding perfomance"
                value={3}
                style={this.state.tabIndex === 3 ? styles.tabActive : styles.tab}
            >
                <RidingPerfomance {...this.props} />
            </Tab>
        );
    }

    render() {
        return (
            <Tabs
                value={this.state.tabIndex}
                onChange={this.handleChange}
                tabItemContainerStyle={styles.tabItemContainerStyle}
                inkBarStyle={styles.inkBarStyle}
                style={styles.tabs}
                className="tabs"
            >
                <Tab
                    className="tab"
                    label="Location"
                    value={0}
                    style={this.state.tabIndex === 0 ? styles.tabActive : styles.tab}
                >
                    <BikeLocations {...this.props} />
                </Tab>
                <Tab
                    className="tab"
                    label="Vehicle specifications"
                    value={1}
                    style={this.state.tabIndex === 1 ? styles.tabActive : styles.tab}
                >
                    <BikeSpecifications bikeInfo={this.props.bikeInfo} {...this.props} />
                </Tab>

                {this._renderOwnerHistory()}
                {this._renderRidingPerfomance()}
            </Tabs>
        );
    }
}
export default BikeInfo;
