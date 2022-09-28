import React, { useState } from "react";
import './HomePage.css';

const FetchArtists = (props) => {

    const startText = 'See all artists';
    const [fetchedData, setFetchedData] = useState([]);
    const [success, setSuccess] = useState(false);
    const [buttonText, setButtonText] = useState(startText);

    const formSubmit = async(event) => {
        event.preventDefault();

        if (success)
        {
            setSuccess(false);
            setButtonText(startText);
            return;
        }

        await fetch ('http://localhost:3000/artists', {
        })
        .then (response => response.json())
        .then(data => {
            setFetchedData(data);
            setSuccess(true);
            setButtonText('Hide artists');
        })
        .catch(err => {   
            console.log("Error: " + err)  
        })
    }

    return (
        <div>
            <h2 className="home-heading">Browse our catalogue</h2>
            <button className='home-button' onClick={formSubmit}>{buttonText}</button>
            <br></br>

            {success ? <div>{ fetchedData.map((d, i) => (<li key={i} className="list">
                {d.first_name} {d.last_name}</li>))}</div> : null}
        </div>
    )
}

export default FetchArtists;