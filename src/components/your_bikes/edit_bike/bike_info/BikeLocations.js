import React, { Component } from "react";
import styles from "../EditBikeComponentStyle";
import MapEditBike from "../../../map_edit_bike/MapEditBike";
class BikeLocation extends Component {
    render() {
        return (
            <div style={styles.location}>
                <MapEditBike {...this.props}/>
            </div>
        );
    }
}
export default BikeLocation;
