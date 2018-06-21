import React, { Component } from "react";
import styles from "./HiringRequestComponentStyle";
import Bike from "./BikeComponent";
import BikeSearchComponent from "../bike_for_rent/BikeSearchComponent";
import _ from "lodash";

class HiringRequestComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
                <BikeSearchComponent />
                <div className="row">
                    {this._renderBike(this.state.bikeData)}
                </div>
            </div>
        );
    }
}

export default HiringRequestComponent;