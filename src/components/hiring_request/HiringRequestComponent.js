import React, { Component } from "react";
import styles from "./HiringRequestComponentStyle";
import Bike from "./BikeComponent";
import BikeSearchComponent from "./BikeSearchComponent";
import _ from "lodash";
import MapHiringComponent from "../map_hiring/MapHiringComponent";
import { initNetworkBikes } from "../../actions/bikeActions";
class HiringRequestComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bikeHashSelected: "",
            isRenderMap: true,
            mapDefaultLocation: {
                index: "none",
                long: 103.819836,
                lat: 1.352083
            }
        };
    }

    componentDidMount() {
        this.props.dispatch(initNetworkBikes({ethereum: this.props.ethereum }));
    }

    handleChangeMapDefaultLocation = (mapDefaultLocation) => {
        this.setState({
            mapDefaultLocation: mapDefaultLocation
        });
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

    listToMatrix = (list, elementsPerSubArray) => {
        var matrix = [], i, k;

        for (i = 0, k = -1; i < list.length; i++) {
            if (i % elementsPerSubArray === 0) {
                k++;
                matrix[k] = [];
            }

            matrix[k].push(list[i]);
        }

        return matrix;
    }

    _renderBike = () => {
        let renderBike = [];

        let listBikeFilter = [];

        _.forEach(this.props.bikes.network, (value, index) => {
            if (value.location.country.code === this.state.mapDefaultLocation.index) {
                listBikeFilter = [...listBikeFilter, value]
            }
        });

        if(this.state.mapDefaultLocation.index === 'none') {
            listBikeFilter = this.props.bikes.network;
        }

        listBikeFilter = this.listToMatrix(listBikeFilter, 4);

        for(let i= 0; i< listBikeFilter.length; i++) {
            let test = []
            for(let j= 0; j< listBikeFilter[i].length; j++) {
                test = [...test, (<Bike bike={listBikeFilter[i][j]} key={i+j} {...this.props} />)];
            }

            renderBike = [
                ...renderBike,
                (<div className="row" key={i}>
                    {
                        test
                    }
                </div>)
            ]

        }

        if (listBikeFilter.length === 0) {
            renderBike = (
                <div className="text-center">
                    <h2 style={styles.fail}>There is no bike</h2>
                </div>
            )
        }

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

                {this._renderContent()}
            </div>
        );
    }
}

export default HiringRequestComponent;
