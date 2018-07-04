import React from "react";
import {Tabs, Tab} from "material-ui/Tabs";
import styles from "./BikeSpecificationsStyle.js";
import Components from "./Components.js";
import Geometry from "./Geometry.js";

class BikeSpecifications extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: "1",
        };
    }

    handleChange = (value) => {
        this.setState({
            value: value,
        });
    };

    render() {
        return (
            <Tabs
                value={this.state.value}
                onChange={this.handleChange}
                tabItemContainerStyle={styles.tabItemContainerStyle}
                inkBarStyle={styles.inkBarStyle}
                style={styles.tabs}>
            >
                <Tab label="components" value="1" style={styles.tab}>
                    <Components />
                </Tab>
                <Tab label="geometry" value="2" style={styles.tab}>
                    <Geometry />
                </Tab>
            </Tabs>
        );
    }
}

export default BikeSpecifications;
