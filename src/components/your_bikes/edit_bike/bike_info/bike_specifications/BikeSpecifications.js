import React from "react";
import {Tabs, Tab} from "material-ui/Tabs";
import styles from "./BikeSpecificationsStyle.js";
import ComponentsModel1C from "./ComponentsModel1C";
import ComponentsModel1 from "./ComponentsModel1";
import GeometryModel1C from "./GeometryModel1C";
import GeometryModel1 from "./GeometryModel1";

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

    _renderComponents = () => {
        if (this.props.bikeInfo.model === "1") {
            return <ComponentsModel1 />;
        }

        return <ComponentsModel1C />;
    }

    _renderGeometry = () => {
        if (this.props.bikeInfo.model === "1") {
            return <GeometryModel1 />;
        }

        return <GeometryModel1C />;
    }

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
                    {this._renderComponents()}
                </Tab>
                <Tab label="geometry" value="2" style={styles.tab}>
                    <div className="text-center" style={{ marginTop: "30px" }}>
                        <img src="images/geometries-black-1c.jpg" style={styles.geometries} alt="BikeCoin" />
                    </div>
                    {this._renderGeometry()}
                </Tab>
            </Tabs>
        );
    }
}

export default BikeSpecifications;
