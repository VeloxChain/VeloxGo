import React, { Component } from "react";
import styles from "./HiringRequestComponentStyle";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import BikeFilterComponent from "./BikeFilterComponent";

class BikeSearchComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            mapLocation: {
                none: {
                    index: 'none',
                    long: 103.819836,
                    lat: 1.352083
                },
                SG: {
                    index: 'SG',
                    long: 103.819836,
                    lat: 1.352083
                },
                US: {
                    index: 'US',
                    long: -83.06797,
                    lat: 40.29867
                },
                IT: {
                    index: 'IT',
                    long: 9.191383,
                    lat: 45.464211
                },
                SM: {
                    index: 'SM',
                    long: -122.431297,
                    lat: 37.773972
                },
            }
        };
    }

    handleChange = (event, index, value) => {
        this.props.handleChangeMapDefaultLocation(this.state.mapLocation[value]);
    };

    render() {
        return (
            <div className="row" style={styles.mb20}>
                <div className="col-sm-4">
                    <SelectField
                        floatingLabelText="Location"
                        value={this.props.mapDefaultLocation.index}
                        onChange={this.handleChange}
                        fullWidth
                        selectedMenuItemStyle={styles.selectedMenuItemStyle}
                    >
                        <MenuItem 
                            value={"none"}
                            primaryText="Select country" 
                        />
                        <MenuItem 
                            value={"SG"}
                            primaryText="Singapore" 
                        />
                        <MenuItem 
                            value={"US"}
                            primaryText="Delaware" 
                        />
                        <MenuItem 
                            value={"IT"}
                            primaryText="Milano (Italy)" 
                        />
                        <MenuItem 
                            value={"SM"}
                            primaryText="San Francisco" 
                        />
                    </SelectField>
                </div>
                <div className="col-sm-8 text-right">
                    <BikeFilterComponent isRenderMap={this.props.isRenderMap} onHandleSwitchView={this.props.onHandleSwitchView}/>
                </div>
            </div>
        );
    }
}

export default BikeSearchComponent;