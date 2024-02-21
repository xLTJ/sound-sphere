// import {useState} from "react";
import Track from "./Track.jsx";

function SearchResults({searchResult}) {

    console.log(searchResult)
    return (
        <ul>
            {searchResult.map((track) => (
                <Track
                    key={track.id}
                    name={track.name}
                    artists={track.artists}
                    img={track.album.images[ 0 ].url}
                />)
            )}
        </ul>
    )
}

export default SearchResults