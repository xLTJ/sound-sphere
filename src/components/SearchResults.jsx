// import {useState} from "react";
import Track from "./Track.jsx";

function SearchResults({searchResult}) {

    return (
        <ul>
            {searchResult.map((track) => (
                <Track
                    key={track.id}
                    name={track.name}
                    artist={track.artist}
                    album={track.album}
                />)
            )}
        </ul>
    )
}

export default SearchResults