import React, { useState, useEffect } from "react";

import { LoadScript, GoogleMap } from "react-google-maps";
export default function Map(props) {
    return (
        <LoadScript id="script-loader" googleMapsApiKey="YOUR_API_KEY">
            <GoogleMap id="example-map" center={props.enter} />
        </LoadScript>
    );
}