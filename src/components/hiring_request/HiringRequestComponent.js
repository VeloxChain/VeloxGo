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
            isRenderFilter: true
        };
    }

    onChangeFilter = (value) => {

        this.setState({
            isRenderFilter: value
        });
    }

    _renderBike = () => {
        let renderBike = [];

        _.forEach(this.props.bikes, (value, index) => {
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
            return this._renderBike();
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
