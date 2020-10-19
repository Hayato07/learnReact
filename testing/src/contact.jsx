import React, { useState, useEffect } from "react";
import Map from "./map";

export default function Contact(props) {
    return (
        <div>
            <address>
                Contact {props.name} via {" "}
                <a href={"mailto:" + props.email} data-testid="email">
                    email
                </a>
                or on their <a data-testid="site" href={props.site}>
                    website
                </a>.
            </address>
            <Map center={props.center} />
        </div>
    );
}