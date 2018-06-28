import React, { Component } from "react";
import styles from "./HiringRequestComponentStyle";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import TextField from "material-ui/TextField";
import BikeFilterComponent from "./BikeFilterComponent";

class BikeSearchComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            mapLocation: {
                sg: {
                    long: 103.819836,
                    lat: 1.352083
                },
                del: {
                    long: -83.06797,
                    lat: 40.29867
                },
                mil: {
                    long: 9.191383,
                    lat: 45.464211
                },
                san: {
                    long: -122.431297,
                    lat: 37.773972
                },
            }
        }
    }

    handleChange = (event, index, value) => {
        this.props.handleChangeMapDefaultLocation({...this.state.mapLocation[value], index: value, })
    };

    render() {
        return (
            <div className="row" style={styles.mb20}>
                <div className="col-sm-3">
                    <SelectField
                        floatingLabelText="Location"
                        value={this.props.mapDefaultLocation.index}
                        onChange={this.handleChange}
                        fullWidth
                        selectedMenuItemStyle={styles.selectedMenuItemStyle}
                    >
                        <MenuItem 
                            value={'sg'}
                            primaryText="Singapore" 
                        />
                        <MenuItem 
                            value={'del'}
                            primaryText="Delaware" 
                        />
                        <MenuItem 
                            value={'mil'}
                            primaryText="Milano (Italy)" 
                        />
                        <MenuItem 
                            value={'san'}
                            primaryText="San Francisco" 
                        />
                    </SelectField>
                </div>
                <div className="col-sm-9">
                    <div style={styles.filter}>
                        <div style={styles.search}>
                            <TextField
                                floatingLabelText="Search"
                                fullWidth
                            />
                        </div>
                        <BikeFilterComponent isRenderMap={this.props.isRenderMap} onHandleSwitchView={this.props.onHandleSwitchView}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default BikeSearchComponent;