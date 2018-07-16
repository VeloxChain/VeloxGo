import React, { Component } from "react";
import styles from "./HiringRequestComponentStyle";
import Bike from "./BikeComponent";
import BikeSearchComponent from "./BikeSearchComponent";
import _ from "lodash";
import MapHiringComponent from "../map_hiring/MapHiringComponent";
import { initNetworkBikes, rentBike, returnBike } from "../../actions/bikeActions";
import { appLoadingStart } from "../../actions/appAction";
import RentBikeComponent from "./rent_bike/RentBikeComponent";
import { MODAL_CONFIRM_TRANSACTION } from "../modal/constants";
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
        const { rendingBike } = this.props.bikes;
        if (!rendingBike.isRent) {
            this.props.dispatch(appLoadingStart("Loading bikes from network...."));
            setTimeout(()=> {
                this.props.dispatch(initNetworkBikes({
                    ethereum: this.props.ethereum,
                    address: this.props.getAccountAddress()
                }));
            }, 1);
        }
    }

    handleChangeMapDefaultLocation = (mapDefaultLocation) => {
        this.setState({
            mapDefaultLocation: mapDefaultLocation
        });
    }

    handleSelectBike = (bikeHashSelected) => {
        if(bikeHashSelected == this.state.bikeHashSelected) {
            bikeHashSelected = "";
        }
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
        let networkBikes = _.orderBy(this.props.bikes.network, ["tokenId"], ["desc"]);
        _.forEach(networkBikes, (value) => {
            if (value.location.cityName === this.state.mapDefaultLocation.index) {
                listBikeFilter = [...listBikeFilter, value];
            }
        });

        if(this.state.mapDefaultLocation.index === "none") {
            listBikeFilter = networkBikes;
        }

        listBikeFilter = this.listToMatrix(listBikeFilter, 4);

        for(let i= 0; i< listBikeFilter.length; i++) {
            let test = [];
            for(let j= 0; j< listBikeFilter[i].length; j++) {
                test = [...test, (<Bike bike={listBikeFilter[i][j]} handleChangeRentBike={this.handleChangeRentBike} key={i+j} {...this.props} />)];
            }

            renderBike = [
                ...renderBike,
                (<div className="row" key={i}>
                    {
                        test
                    }
                </div>)
            ];

        }

        if (listBikeFilter.length === 0) {
            renderBike = (
                <div className="text-center">
                    <img src="images/404.png" style={styles.fail} alt="BikeCoin" />
                </div>
            );
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
                    handleChangeRentBike={this.handleChangeRentBike}
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

    _renderRentBike = () => {
        const { rendingBike } = this.props.bikes;
        if (rendingBike.isRent) {
            return <RentBikeComponent
                finishRentBike={this.finishRentBike}
                bikeInfo={rendingBike}
                {...this.props} />;
        }

        return (
            <div>
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

    handleChangeRentBike = (bikeInfo) => {
        let data = {
            address: this.props.getAccountAddress(),
            ethereum: this.props.ethereum,
            keyStore: this.props.accounts.accounts.key,
            bikeInfo: bikeInfo
        };
        if (this.props.metamask) {
            this.props.dispatch(rentBike(data));
        } else {
            this.props.setType(MODAL_CONFIRM_TRANSACTION, {data: data, handle: rentBike});
        }
    }
    finishRentBike = (tokenId, callBack, totalTime) => {
        let data = {
            address: this.props.getAccountAddress(),
            ethereum: this.props.ethereum,
            keyStore: this.props.accounts.accounts.key,
            tokenId: tokenId,
            callBack: callBack,
            totalTime: totalTime
        };
        if (this.props.metamask) {
            this.props.dispatch(returnBike(data));
        } else {
            this.props.setType(MODAL_CONFIRM_TRANSACTION, {data: data, handle: returnBike});
        }
    }

    render() {
        return (
            <div style={styles.wrapp}>
                {this._renderRentBike()}
            </div>
        );
    }
}

export default HiringRequestComponent;
