import React from "react";
import InputField from "./InputField";
import './HomePage.css';
import { useState } from "react";
import FetchArtists from "./FetchArtists";

const HomePage = () => {

    return (
        <div>
            <FetchArtists />

        </div>
    )
}

export default HomePage;