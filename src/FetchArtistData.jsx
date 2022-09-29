import React, { useState } from "react";
import './HomePage.css';

const FetchArtistData = (props) => {

    const startText = 'See all artists';
    const [artistData, setArtistData] = useState([]);
    const [success, setSuccess] = useState(false);
    const [artefactSuccess, setArtefactSuccess] = useState(false);
    const [artefactData, setArtefactData] = useState([]);
    const [buttonText, setButtonText] = useState(startText);
    const [currentArtist, setCurrentArtist] = useState('');

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
            setArtistData(data);
            setSuccess(true);
            setButtonText('Hide artists');
            setArtefactSuccess(false);
        })
        .catch(err => {   
            console.log("Error: " + err)  
        })
    }

    const showArtefacts = async(artist_id, i) => {

        await fetch ('http://localhost:3000/artefacts-artist/' + artist_id, {
        })
        .then (response => response.json())
        .then(data => {
            setArtefactData(data);
            setSuccess(false);
            setCurrentArtist(artistData[i].first_name + ' ' + artistData[i].last_name + ' artworks')
            console.log(currentArtist);
            setButtonText(startText);
            setArtefactSuccess(true);
        })
        .catch(err => {   
            console.log("Error: " + err)  
        })
    }

    return (
        <div>
            <h2 className="home-heading">Browse our Artists</h2>
            <button className='home-button' onClick={formSubmit}>{buttonText}</button>
            <br></br>

            {success ? <div><h3 className="sub-heading">Select artist to view artefacts</h3></div> : null}

            {success ? <div>{ artistData.map((d, i) => (<li key={i} className="list">
                <button className='list-button' onClick={() => showArtefacts(d.artist_id, i)}>{d.first_name} {d.last_name}</button>
                </li>))}</div> : null}
                
            { artefactSuccess ? <div><h2 className='sub-heading'>{currentArtist}</h2>{ artefactData.map((artData, index) => 
                (<li key={index} className="list">'{artData.title}', {artData.material}, {artData.year_made}</li>))}</div> : null}

        </div>
    )
}

export default FetchArtistData;