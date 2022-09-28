import React from "react";
import InputField from "./InputField";
import './HomePage.css';
import { useState } from "react";

const HomePage = () => {

    const artists = [];
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [dob, setDob] = useState("");
    const [birthPlace, setBirthPlace] = useState("");

    const formSubmit = async(event) => {
        event.preventDefault();

        await fetch ('http://localhost:3000/artists', {
        })
        .then (response => response.json())
        .then(data => {
            artists.push(data);

            { artists.map((d, i) => (<li key={i}>{d.first_name}</li>))}

        })
        .catch(err => {   
            console.log("Error: " + err)  
        })
    }

    return (
        <div>
            <h2 className="home-heading">Browse our catalogue</h2>
            <button className='home-button' onClick={formSubmit}>See all artists</button>
            <h2 className="home-heading">Search our catalogue</h2>
            <br></br>
            <InputField className='home-input'/>
            <br></br>
            <br></br>
            <br></br>
        </div>
    )
}

export default HomePage;