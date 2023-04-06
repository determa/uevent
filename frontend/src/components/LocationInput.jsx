import React, { useRef } from "react";
import { StandaloneSearchBox, useJsApiLoader } from "@react-google-maps/api";

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

    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: "AIzaSyB-yIdZQ95TIRjjrfX7tSSvbSdrr9MidNk",
        libraries: ["places"],
    });

    return (
        <div className="mt-3">
            {isLoaded && (
                <StandaloneSearchBox
                    onLoad={(ref) => (inputRef.current = ref)}
                    onPlacesChanged={handlePlaceChanged}
                >
                    <input
                        type="text"
                        name="location"
                        className="w-full border-2 duration-300 border-gray-200 text-gray-900 py-1.5 px-2.5 placeholder:text-gray-400 outline-none outline-offset-0 hover:border-indigo-400 focus:border-indigo-600 rounded-md sm:text-sm sm:leading-6"
                        placeholder="Enter location"
                    />
                </StandaloneSearchBox>
            )}
        </div>
    );
};

export default PlaceComponent;
