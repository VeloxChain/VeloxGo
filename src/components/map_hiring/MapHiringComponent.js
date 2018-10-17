import React, {Component} from "react";
import { compose, withProps, withStateHandlers, withHandlers } from "recompose";
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker
}  from "react-google-maps";
import _ from "lodash";
import { InfoBox } from "react-google-maps/lib/components/addons/InfoBox";
import BikeHiringInfo from "../bike_hiring_info/BikeHiringInfo";
import appConfig from "../../config/app.json";
import MapBikeIcon from "../../assets/images/map_bike_icon.png";
const { MarkerClusterer } = require("react-google-maps/lib/components/addons/MarkerClusterer");

class MapHiringComponent extends Component {
    constructor(props) {
        super(props);
        this.googleMap = null;
        this.state = {
            listMarkerData: []
        };
    }

    componentDidMount(){
        this.setState({
            listMarkerData: this.props.bikes.network
        });
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.mapDefaultLocation !== this.props.mapDefaultLocation) {
            this.props.handleSelectBike("");
            setTimeout(()=>{this.googleMap.panTo(
                {
                    lng: nextProps.mapDefaultLocation.long,
                    lat: nextProps.mapDefaultLocation.lat
                }
            );}, 100);
        }
    }

    getMarkerPoint = (markerData) => {

        let indexOverLap = 0;

        let findOverLapMarker = _.find(this.state.listMarkerData, (value, index) => {
            indexOverLap= index;
            return value.location.lat === markerData.location.lat && value.location.long === markerData.location.long && value.tokenId !== markerData.tokenId ;
        });

        if(!_.isEmpty(findOverLapMarker)) {

            let newListMarkerData = this.state.listMarkerData;

            newListMarkerData[indexOverLap].location.long = _.toNumber(findOverLapMarker.location.long) + 0.000001;
            newListMarkerData[indexOverLap].location.lat = _.toNumber(findOverLapMarker.location.lat) + 0.000001;

            this.setState({
                listMarkerData: newListMarkerData
            });



            return {
                long: _.toNumber(findOverLapMarker.location.long) + 0.000001,
                lat: _.toNumber(findOverLapMarker.location.lat) + 0.000001,
            };
        }

        return {
            long: markerData.location.long,
            lat: markerData.location.lat,
        };
    }

    render(){
        return(
            <GoogleMap
                ref={(map) => {this.googleMap = map;} }
                defaultZoom={13}
                defaultCenter={{
                    lng: this.props.mapDefaultLocation.long,
                    lat: this.props.mapDefaultLocation.lat
                }}
                clickableIcons={false}
            >
                <MarkerClusterer
                    onClick={this.props.onMarkerClustererClick}
                    averageCenter
                    enableRetinaIcons
                    gridSize={20}
                >
                    {
                        this.props.bikes.network.map((bike, index) => {
                            let newPoint = this.getMarkerPoint(bike);
                            return (
                                <Marker
                                    key={index}
                                    position={{ lat: newPoint.lat, lng: newPoint.long }}
                                    onClick={() => this.props.handleSelectBike(bike.tokenId)}
                                    icon={MapBikeIcon}

                                >
                                    {bike.tokenId === this.props.bikeHashSelected && <InfoBox
                                        onCloseClick={()=>this.props.handleSelectBike("")}
                                        options={{closeBoxURL: "images/close_white.png", enableEventPropagation: true}}
                                    >
                                        <BikeHiringInfo
                                            externalData={bike}
                                            handleChangeRentBike={this.props.handleChangeRentBike}
                                        />
                                    </InfoBox>
                                    }
                                </Marker>
                            );
                        })
                    }
                </MarkerClusterer>
            </GoogleMap>
        );
    }
}

export default compose(
    withProps({
        googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${appConfig.google_map_api_key}&v=3.exp&libraries=geometry,drawing,places`,
        loadingElement: <div style={{ height: "100%" }} />,
        containerElement: <div style={{ height: "calc(100vh - 224px)" }} />,
        mapElement: <div style={{ height: "100%" }} />,
        center: { lat: 25.03, lng: 121.6 },
    }),
    withStateHandlers(() => ({
        isOpen: false,
    }), {
        onToggleOpen: ({ isOpen }) => () => ({
            isOpen: !isOpen,
        }),
        onClose: () => () => ({
            isOpen: false,
        })
    }),
    withHandlers({
    }),
    withScriptjs,
    withGoogleMap,
)(MapHiringComponent) ;
