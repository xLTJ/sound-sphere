// import {useState} from "react";
import Track from "./Track.jsx";

function SearchResults({searchResult, addTrack}) {
    return (
        <ul>
            {searchResult.map((track) => (
                <Track
                    key={track.id}
                    id={track.id}
                    name={track.name}
                    artists={track.artists}
                    img={track.album.images[ 0 ].url}
                    addTrack={addTrack}
                    uri={track.uri}
                />)
            )}
        </ul>
    )
}

export default SearchResults