import React from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

const GoogleMapComponent = ({ center }) => {
    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
        libraries: ["places"],
    });

    const defaultOptions = {
        panControl: false,
        zoomControl: true,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        clickableIcons: false,
        keyboardShortcuts: false,
        scrollwheel: true,
        disableDoubleClickZoom: false,
        fullscreenControl: false,
    };

    return (
        <>
            {isLoaded && (
                <GoogleMap
                    id="circle-example"
                    mapContainerStyle={{
                        height: "100%",
                        width: "100%",
                    }}
                    zoom={13}
                    center={center}
                    options={defaultOptions}
                >
                    <Marker position={center} />
                </GoogleMap>
            )}
        </>
    );
};

export default GoogleMapComponent;
