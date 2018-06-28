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
            bikeHashSelected: "",
            isRenderMap: false,
            mapDefaultLocation: {
                index: 'sg',
                long: 103.819836,
                lat: 1.352083
            }
        };
    }

    handleChangeMapDefaultLocation = (mapDefaultLocation) => {
        this.setState({
            mapDefaultLocation: mapDefaultLocation
        })
    }

    handleSelectBike = (bikeHashSelected) => {
        this.setState({
            bikeHashSelected: bikeHashSelected
        });
    }

    onHandleSwitchView = (value) => {
        this.setState({
            isRenderMap: value
        });
    }

    _renderBike = () => {
        let renderBike = [];

        _.forEach(this.props.bikes.data, (value, index) => {
            renderBike.push(<Bike bike={value} key={index} {...this.props} />);
        });

        return renderBike;
    }

    _renderBikeMaps = () => {
        return (
            <div style={{backgroundColor: "white", padding: "10px"}}>
                <MapHiringComponent
                    mapDefaultLocation={this.state.mapDefaultLocation}
                    bikeHashSelected = {this.state.bikeHashSelected}
                    handleSelectBike= {this.handleSelectBike}
                    bikes={this.props.bikes}
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
        if (this.state.isRenderMap) {
            return this._renderBikeMaps();
        
        }
        return this._renderBike();
    }

    render() {
        return (
            <div style={styles.wrapp}>
                <BikeSearchComponent
                    onHandleSwitchView={this.onHandleSwitchView}
                    mapDefaultLocation={this.state.mapDefaultLocation}
                    handleChangeMapDefaultLocation={this.handleChangeMapDefaultLocation}
                    isRenderMap={this.state.isRenderMap}
                />
                <div className="row">
                    {this._renderContent()}
                </div>
            </div>
        );
    }
}

export default HiringRequestComponent;
