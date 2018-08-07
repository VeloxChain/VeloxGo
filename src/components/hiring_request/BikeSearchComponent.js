import React, { Component } from "react";
import styles from "./HiringRequestComponentStyle";
import BikeFilterComponent from "./BikeFilterComponent";

class BikeSearchComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            mapLocation: {
                none: {
                    index: "none",
                    long: 103.819836,
                    lat: 1.352083
                },
                Singapore: {
                    index: "Singapore",
                    long: 103.819836,
                    lat: 1.352083
                },
                Delaware: {
                    index: "Delaware",
                    long: -83.06797,
                    lat: 40.29867
                },
                Milan: {
                    index: "Milan",
                    long: 9.191383,
                    lat: 45.464211
                },
                SF: {
                    index: "SF",
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
                                value={"Singapore"}
                            >
                                Singapore
                            </option>
                            <option
                                value={"Delaware"}
                            >
                                Delaware
                            </option>
                            <option
                                value={"Milan"}
                            >
                                Milano (Italy)
                            </option>
                            <option
                                value={"SF"}
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