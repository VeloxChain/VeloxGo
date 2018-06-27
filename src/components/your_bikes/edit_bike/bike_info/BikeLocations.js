import React, { Component } from "react";
import TextField from "material-ui/TextField";
import styles from "../EditBikeComponentStyle";
import MapEditBike from '../../../map_edit_bike/MapEditBike'
class BikeLocation extends Component {
    render() {
        return (
            <div style={styles.location}>
                {/* <div className="row">
                    <div className="col-sm-12">
                        <TextField
                            floatingLabelText="Address"
                            fullWidth
                            value={this.props.bikeInfo.location}
                            onChange={(e) => this.props.handleChangeState({location: e.target.value})}
                        />
                    </div>
                </div> */}
                <MapEditBike {...this.props}/>
            </div>
        );
    }
}
export default BikeLocation;
