import React, { useRef } from "react";
import {
    GoogleMap,
    Marker,
    useJsApiLoader,
    StandaloneSearchBox,
} from "@react-google-maps/api";

const pem = {
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    libraries: ["places"],
};

const PlaceComponent = () => {
    const inputRef = useRef();
    const handlePlaceChanged = () => {
        const [place] = inputRef.current.getPlaces();
        if (place) {
            console.log(place.formatted_address);
            console.log(place.geometry.location.lat());
            console.log(place.geometry.location.lng());
        }
    };

    const { isLoaded, loadError } = useJsApiLoader(pem);

    return (
        <>
            {isLoaded && (
                <StandaloneSearchBox
                    onLoad={(ref) => (inputRef.current = ref)}
                    onPlacesChanged={handlePlaceChanged}
                >
                    <input
                        type="text"
                        name="location"
                        className="w-full border border-black border-opacity-25 text-gray-900 py-1.5 px-2.5 placeholder:text-gray-400 outline-none outline-offset-0 hover:border-indigo-400 focus:border-indigo-600 rounded-md sm:text-sm sm:leading-6"
                        placeholder="Enter location"
                    />
                </StandaloneSearchBox>
            )}
            {loadError && (
                <div className="w-full border border-black border-opacity-25 text-gray-900 py-1.5 px-2.5 placeholder:text-gray-400 outline-none outline-offset-0 hover:border-indigo-400 focus:border-indigo-600 rounded-md sm:text-sm sm:leading-6">
                    Map cannot be loaded right now, sorry.
                </div>
            )}
        </>
    );
};

const GoogleMapComponent = ({ center }) => {
    const { isLoaded } = useJsApiLoader(pem);

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

export { GoogleMapComponent, PlaceComponent };
