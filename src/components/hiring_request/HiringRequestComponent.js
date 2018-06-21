import React, { Component } from "react";
import styles from "./HiringRequestComponentStyle";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import TextField from "material-ui/TextField";
import Bike from "./BikeComponent";
import _ from "lodash";

class HiringRequestComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 1,

            bikeData: [
                { image: "images/bike.png" },
                { image: "images/bike.png" },
                { image: "images/bike.png" },
                { image: "images/bike.png" },
                { image: "images/bike.png" },
                { image: "images/bike.png" },
                { image: "images/bike.png" },
                { image: "images/bike.png" },
                { image: "images/bike.png" }
            ]
        };
    }

    handleChange = (event, index, value) => this.setState({value});

    _renderBike = (bike) => {
        let renderBike = [];
        
        _.forEach(bike, (value, index) => {
            renderBike.push(<Bike bike={value} key={index} />);
        });

        return renderBike;
    }

    render() {
        return (
            <div style={styles.wrapp}>
                <div className="row" style={styles.mb20}>
                    <div className="col-sm-3">
                        <SelectField
                            floatingLabelText="Location"
                            value={this.state.value}
                            onChange={this.handleChange}
                        >
                            <MenuItem value={1} primaryText="Singapore" />
                            <MenuItem value={2} primaryText="United States" />
                            <MenuItem value={3} primaryText="Viet Nam" />
                        </SelectField>
                    </div>
                    <div className="col-sm-9">
                        <div style={styles.map}>
                            <TextField
                                floatingLabelText="Search"
                                fullWidth
                            />
                            <div style={styles.divIcon}>
                                <i className="fa fa-map-o" style={styles.icon} />
                                <i className="fa fa-map-marker" style={styles.icon} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    {this._renderBike(this.state.bikeData)}
                </div>
            </div>
        );
    }
}

export default HiringRequestComponent;