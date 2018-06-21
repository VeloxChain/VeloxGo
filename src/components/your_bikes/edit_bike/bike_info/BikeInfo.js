import React, { Component } from "react";
import BikeLocations from "./BikeLocations";
import BikeSpecifications from "./BikeSpecifications";
import OwnerHistory from "./OwnerHistory";
import RidingPerfomance from "./RidingPerfomance";
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
                <Tab label="Location" value={0} style={styles.tab}>
                    <BikeLocations />
                </Tab>
                <Tab label="Bike specifications" value={1} style={styles.tab}>
                    <BikeSpecifications />
                </Tab>
                <Tab label="Owner history" value={2} style={styles.tab}>
                    <OwnerHistory />
                </Tab>
                <Tab label="Riding perfomance" value={3} style={styles.tab}>
                    <RidingPerfomance />
                </Tab>
            </Tabs>
        );
    }
}
export default BikeInfo;
