import React, { useState } from "react";
import './HomePage.css';

const FetchExhibitionData = (props) => {

    const startText = 'See all exhibitions';
    const [exhibitData, setExhibitData] = useState([]);
    const [success, setSuccess] = useState(false);
    const [artefactSuccess, setArtefactSuccess] = useState(false);
    const [showExhibitDetails, setShowExhibitDetails] = useState(false);
    const [artefactData, setArtefactData] = useState([]);
    const [artistData, setArtistData] = useState([])
    const [buttonText, setButtonText] = useState(startText);
    const [currentExhibit, setCurrentExhibit] = useState('');
    const [exhibitArt, setExhibitArt] = useState([]);
    const artefacts = [];  
    const artists = [];  

    const formSubmit = async(event) => {
        event.preventDefault();

        if (success)
        {
            setSuccess(false);
            setButtonText(startText);
            return;
        }

        await fetch ('http://localhost:3000/exhibitions', {
        })
        .then (response => response.json())
        .then(data => {
            setExhibitData(data);
            setSuccess(true);
            setButtonText('Hide exhibitions');
            setArtefactSuccess(false);
            setShowExhibitDetails(false);
        })
        .catch(err => {   
            console.log("Error: " + err)  
        })
    }

    const getExhibitionWorks = async(exhibition_id, i) => {

        await fetch ('http://localhost:3000/exhibitions-artefacts/' + exhibition_id, {
        })
        .then (response => response.json())
        .then(data => {

            data.map(async(d) => (await fetch ('http://localhost:3000/artefacts/' + d.artefact_id, {
                })
                .then (response => response.json())
                .then (data => {
                    artefacts.push(data)

                    fetch ('http://localhost:3000/artists/' + data.artist_id, {
                        })
                        .then (response => response.json())
                        .then (
                            data => {
                                artists.push(data)}
                        )
                })
            ))
            setArtefactData(artefacts);
            setArtistData(artists);
            setCurrentExhibit(exhibitData[i].title)
            setArtefactSuccess(true);       
            setSuccess(false);   
        })
        .catch(err => {   
            console.log("Error: " + err)  
        })
    }

    const showExhibitionDetail = () => {
        setShowExhibitDetails(true);
        setSuccess(false);
        setButtonText(startText); 
        setArtefactSuccess(false); 
    }

    return (
        <div className='home-div'>
            <h2 className="home-heading">Browse our Exhibitions</h2>
            <button className='home-button' onClick={formSubmit}>{buttonText}</button>
            <br></br>

            {success ? <div><h3 className="sub-heading">Select exhibition to view artists and artworks</h3></div> : null}

            { artefactSuccess ? <button className='detail-button' onClick={showExhibitionDetail}>Click to see list of artworks in exhibition '{currentExhibit}'</button>: null}

            {success ? <div>{ exhibitData.map((d, i) => (<li key={i} className="list">
                <button className='list-button' id={i} onClick={() => getExhibitionWorks(d.exhibition_id, i)}>{d.title}, {d.description}, Runs from {d.start_date} until {d.end_date}</button>
                </li>))}</div> : null}
                
            { showExhibitDetails ? <div><h2 className='sub-heading'>{currentExhibit}</h2>{ artefactData.map((artData, index) => 
                (<li key={index} className="list">{artistData[index].first_name} {artistData[index].last_name}, '{artData.title}', {artData.material}, {artData.year_made}</li>))}</div> : null}

            

        </div>
    )
}

export default FetchExhibitionData;