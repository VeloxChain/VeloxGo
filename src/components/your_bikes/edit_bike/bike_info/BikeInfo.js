import React, { Component } from "react";
import BikeLocations from "./BikeLocations";
import BikeSpecifications from "./BikeSpecifications";
import OwnerHistory from "./OwnerHistory";
import RidingPerfomance from "./riding_perfomance/RidingPerfomance";
import {Tabs, Tab} from "material-ui/Tabs";
import styles from "../EditBikeComponentStyle";
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

    render() {
        return (
            <Tabs
                value={this.state.tabIndex}
                onChange={this.handleChange}
                tabItemContainerStyle={styles.tabItemContainerStyle}
                style={styles.tabs}>
                <Tab
                    label="Location"
                    value={0}
                    style={this.state.tabIndex === 0 ? styles.tabActive : styles.tab}
                >
                    <BikeLocations {...this.props} />
                </Tab>
                <Tab
                    label="Bike specifications"
                    value={1}
                    style={this.state.tabIndex === 1 ? styles.tabActive : styles.tab}
                >
                    <BikeSpecifications {...this.props} />
                </Tab>
                <Tab
                    label="Owner history"
                    value={2}
                    style={this.state.tabIndex === 2 ? styles.tabActive : styles.tab}
                >
                    <OwnerHistory {...this.props} />
                </Tab>
                <Tab
                    label="Riding perfomance"
                    value={3}
                    style={this.state.tabIndex === 3 ? styles.tabActive : styles.tab}
                >
                    <RidingPerfomance {...this.props} />
                </Tab>
            </Tabs>
        );
    }
}
export default BikeInfo;
