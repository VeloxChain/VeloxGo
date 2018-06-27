import React, { Component } from "react";
import styles from "./HiringRequestComponentStyle";
import Bike from "./BikeComponent";
import BikeSearchComponent from "./BikeSearchComponent";
import _ from "lodash";
import MapHiringComponent from "../map_hiring/MapHiringComponent";

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
            ],

            isRenderFilter: true
        };
    }

    onChangeFilter = (value) => {

        this.setState({
            isRenderFilter: value
        });
    }

    _renderBike = (bike) => {
        let renderBike = [];
        
        _.forEach(bike, (value, index) => {
            renderBike.push(<Bike bike={value} key={index} {...this.props} />);
        });

        return renderBike;
    }

    _renderBikeMaps = () => {
        return (
            <div style={{backgroundColor: "white", padding: "10px"}}>
                <MapHiringComponent
                    isMarkerShown
                    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyC1FyS1yEgh8Vo0nSrkks_CZevhzowYzps&v=3.exp&libraries=geometry,drawing,places"
                    loadingElement={<div style={{ height: "100%" }} />}
                    containerElement={<div style={{ height: "calc(100vh - 195px)" }} />}
                    mapElement={<div style={{ height: "100%" }} />}
                />
            </div>
        );
    }

    _renderContent = () => {
        if (this.state.isRenderFilter) {
            return this._renderBike(this.state.bikeData);
        }

        return this._renderBikeMaps();
    }

    render() {
        return (
            <div style={styles.wrapp}>
                <BikeSearchComponent
                    isRenderFilter={this.state.isRenderFilter}
                    onChangeFilter={this.onChangeFilter}
                />
                <div className="row">
                    {this._renderContent()}
                </div>
            </div>
        );
    }
}

export default HiringRequestComponent;