import PlaylistTrack from "./PlaylistTrack.jsx";
import {useState} from "react";
import SpotifyApi from "./spotifyApi.js";

function Playlist({tracks, removeTrack}) {
    const [playlistName, setPlaylistName] = useState('')

    const handlePlaylistNameChange = (event) => {
        setPlaylistName(event.target.value)
    }

    const createPlaylist = async () => {
        await SpotifyApi.createPlaylist(localStorage.getItem('user_id'), tracks, playlistName)
        tracks.forEach((track) => (
            removeTrack(track.id)
        ));
        setPlaylistName('');
    }

    return (
        <div
            className={'grow max-w-lg min-w-fit gap-6 px-10 my-4 bg-base-200 rounded-box max-h-[850px]'}>
            <input
                className={'input text-4xl text-center my-10 font-bold'}
                placeholder={'Playlist Name'}
                value={playlistName}
                onChange={handlePlaylistNameChange}
            />
            <div className={'h-[600px] overflow-auto scrollbar-hide px-1 mb-12 pb-4'}>
                <ul>
                    {tracks.map((track) => (
                        <PlaylistTrack
                            key={track.id}
                            id={track.id}
                            name={track.name}
                            artists={track.artists}
                            img={track.img}
                            removeTrack={removeTrack}
                            uri={track.uri}
                        />)
                    )}
                </ul>
            </div>
            <div className={'flex'}>
                <button className={'btn btn-wide btn-primary m-auto text-lg'} onClick={createPlaylist}>Save Playlist
                </button>
            </div>
        </div>
    )
}

export default Playlist