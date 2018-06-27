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
    <GoogleMap
        defaultZoom={5}
        defaultCenter={props.center}
        onClick={props.onClose}
        defaultOptions={{ styles: mapStyle }}
    >
        {
            props.bikes.map(bike => 
            (
                <Marker
                    position={{ lat: bike.location.lat, lng: bike.location.long }}
                    onClick={props.onToggleOpen}
                >
                {props.isOpen && <InfoBox
                    onCloseClick={props.onToggleOpen}
                    options={{ closeBoxURL: "", enableEventPropagation: false }}
                >
                    <BikeHiringInfo externalData={{}}/>
                </InfoBox>
                }
                </Marker>
            ))
        }
    </GoogleMap>
);

export default MapHiringComponent;