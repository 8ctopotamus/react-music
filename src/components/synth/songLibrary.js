import React, {useState, useEffect} from 'react';
import axios from 'axios';

export default ({playScore}) => {
    const [songScores, setSongScores] = useState([]);
    const [selectedScore, setSelectedScore] = useState("");

    // Set-up when component is mounted
    useEffect( () => {
        // make an axios call to server
        axios.get('/api/scores/all')
            .then( res => {
                setSongScores(res.data);
            })
            .catch( err => {
                console.log(err);
            })
    }, []);

    const handleChange = (e) => {
        e.preventDefault();
        let selected = songScores.find(obj => {
            return obj._id === e.target.value;
        });
        setSelectedScore(selected);
    }

    if (songScores) {
        return (
            <>
            <select onChange={handleChange}>
                <option value="">--Select a song--</option>
                {songScores.map( (song) => <option key={song._id} value={song._id}>{song.name}</option> )}
            </select>
            {selectedScore ? <button onClick={()=>playScore(selectedScore)}>Play Song</button> : <span>select a song to play</span>}
            </>
        )
    } else {
        return (
            <>
            No songs in the Library!
            </>
        )
    }
}