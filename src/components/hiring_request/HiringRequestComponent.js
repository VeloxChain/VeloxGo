import React, { Component } from "react";
import styles from "./HiringRequestComponentStyle";
import Bike from "./BikeComponent";
import BikeSearchComponent from "./BikeSearchComponent";
import _ from "lodash";

class HiringRequestComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bikeData: [
                { image: "images/bike.png", price: 23030, address: "Nguyen Huu Dat", owner: "Eric Bui", manufacturer: "Volata Cycles", snNumber: "2018-BKC-ZbX75728iFp5" },
                { image: "images/bike.png", price: 534030, address: "Nguyen Huu Dat", owner: "Vuong Pham", manufacturer: "Volata Cycles", snNumber: "2018-BKC-ZbX75728iFp5" },
                { image: "images/bike.png", price: 15430, address: "Nguyen Huu Dat", owner: "Lay Vo", manufacturer: "Volata Cycles", snNumber: "2018-BKC-ZbX75728iFp5" },
                { image: "images/bike.png", price: 2430, address: "Nguyen Huu Dat", owner: "Tony Tuan", manufacturer: "Volata Cycles", snNumber: "2018-BKC-ZbX75728iFp5" },
                { image: "images/bike.png", price: 6030, address: "Nguyen Huu Dat", owner: "Tomy Ai", manufacturer: "Volata Cycles", snNumber: "2018-BKC-ZbX75728iFp5" },
                { image: "images/bike.png", price: 12540, address: "Nguyen Huu Dat", owner: "Tomy Ai", manufacturer: "Volata Cycles", snNumber: "2018-BKC-ZbX75728iFp5" },
                { image: "images/bike.png", price: 15640, address: "Nguyen Huu Dat", owner: "Tomy Ai", manufacturer: "Volata Cycles", snNumber: "2018-BKC-ZbX75728iFp5" },
                { image: "images/bike.png", price: 17550, address: "Nguyen Huu Dat", owner: "Tomy Ai", manufacturer: "Volata Cycles", snNumber: "2018-BKC-ZbX75728iFp5" },
            ]
        };
    }

    _renderBike = (bike) => {
        let renderBike = [];
        
        _.forEach(bike, (value, index) => {
            renderBike.push(<Bike bike={value} key={index} {...this.props} />);
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