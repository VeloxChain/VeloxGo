import React, {Component} from "react";
import { compose, withProps, withStateHandlers } from "recompose";
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker
}  from "react-google-maps";
import { InfoBox } from "react-google-maps/lib/components/addons/InfoBox";
import BikeHiringInfo from "../bike_hiring_info/BikeHiringInfo";
import appConfig from "../../config/app.json";
import mapStyle from "../../config/mapStyle.json";
import MapBikeIcon from "../../assets/images/map_bike_icon.png";

class MapHiringComponent extends Component {
    constructor(props) {
        super(props);

    }
    
    render(){
        return(
            <GoogleMap
                defaultZoom={13}
                defaultCenter={{
                    lng: this.props.mapDefaultLocation.long,
                    lat: this.props.mapDefaultLocation.lat
                }}
                onClick={() => this.props.handleSelectBike("")}
                clickableIcons={false}
                // defaultOptions={{ styles: mapStyle }}
            >
                {
                    this.props.bikes.network.map((bike, index) => {
                        console.log(index, bike)
                        return (
                            <Marker
                                key={index}
                                position={{ lat: bike.location.lat, lng: bike.location.long }}
                                onClick={() => this.props.handleSelectBike(bike.tokenId)}
                                icon={MapBikeIcon}
                            >
                                {bike.tokenId == this.props.bikeHashSelected && <InfoBox
                                    onCloseClick={this.props.onToggleOpen}
                                    options={{ closeBoxURL: "", enableEventPropagation: false }}
                                >
                                    <BikeHiringInfo externalData={bike}/>
                                </InfoBox>
                                }
                            </Marker>
                        )})
                }
            </GoogleMap>
        );
    }
}

export default compose(
    withProps({
        googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${appConfig.google_map_api_key}&v=3.exp&libraries=geometry,drawing,places`,
        loadingElement: <div style={{ height: "100%" }} />,
        containerElement: <div style={{ height: "calc(100vh - 195px)" }} />,
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
    withScriptjs,
    withGoogleMap,
)(MapHiringComponent) ;