import PlaylistTrack from "./PlaylistTrack.jsx";

function Playlist({tracks, removeTrack}) {
    return (
        <ul>
            {tracks.map((track) => (
                <PlaylistTrack
                    key={track.id}
                    id={track.id}
                    name={track.name}
                    artists={track.artists}
                    img={track.img}
                    removeTrack={removeTrack}
                />)
            )}
        </ul>
    )
}

export default Playlist