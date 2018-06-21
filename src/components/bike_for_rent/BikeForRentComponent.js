import React, { Component } from "react";
import styles from "./BikeForRentComponentStyle";
import Bike from "./BikeComponent";
import BikeSearchComponent from "./BikeSearchComponent";
import _ from "lodash";

class BikeForRentComponent extends Component {
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
            renderBike.push(<Bike bike={value} key={index} text="Rent" />);
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

export default BikeForRentComponent;