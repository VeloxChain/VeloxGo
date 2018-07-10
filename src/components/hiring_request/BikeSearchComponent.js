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

    handleChange = (event) => {
        this.props.handleChangeMapDefaultLocation(this.state.mapLocation[event.target.value]);
    };

    render() {
        return (
            <div className="row" style={styles.mb20}>
                <div className="col-sm-4">
                    <div className="form-group">
                        <label style={styles.label}>Location</label>
                        <select
                            className="form-control"
                            value={this.props.mapDefaultLocation.index}
                            onChange={e => this.handleChange(e)}
                        >
                            <option
                                value={"none"}
                            >
                                Select Country
                            </option>
                            <option
                                value={"SG"}
                            >
                                Singapore
                            </option>
                            <option
                                value={"US"}
                            >
                                Delaware
                            </option>
                            <option
                                value={"IT"}
                            >
                                Milano (Italy)
                            </option>
                            <option
                                value={"SM"}
                            >
                                San Francisco
                            </option>
                        </select>
                    </div>
                </div>
                <div className="col-sm-8 text-right">
                    <BikeFilterComponent isRenderMap={this.props.isRenderMap} onHandleSwitchView={this.props.onHandleSwitchView}/>
                </div>
            </div>
        );
    }
}

export default BikeSearchComponent;