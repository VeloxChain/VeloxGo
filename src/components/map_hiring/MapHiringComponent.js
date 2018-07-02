import React from "react";
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

const MapHiringComponent = compose(
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
    withGoogleMap
)(props =>
{
    return(
        <GoogleMap
            defaultZoom={13}
            center={{
                lng: props.mapDefaultLocation.long,
                lat: props.mapDefaultLocation.lat
            }}
            onClick={() => props.handleSelectBike("")}
            defaultOptions={{ styles: mapStyle }}
        >
            {
                props.bikes.data.map((bike, index) => 
                    (
                        <Marker
                            key={index}
                            position={{ lat: bike.location.lat, lng: bike.location.long }}
                            onClick={() => props.handleSelectBike(bike.hash)}
                            icon={MapBikeIcon}
                        >
                            {bike.hash == props.bikeHashSelected && <InfoBox
                                onCloseClick={props.onToggleOpen}
                                options={{ closeBoxURL: "", enableEventPropagation: false }}
                            >
                                <BikeHiringInfo externalData={bike}/>
                            </InfoBox>
                            }
                        </Marker>
                    ))
            }
        </GoogleMap>
    );
}
);

export default MapHiringComponent;