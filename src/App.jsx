import './App.css'
import Header from "./components/Header.jsx";
import SearchBar from "./components/SearchBar.jsx";
import {useEffect, useState} from "react";
import SearchResults from "./components/SearchResults.jsx";
import Playlist from "./components/Playlist.jsx";
import SpotifyApi from "./components/spotifyApi.js";

function App() {
    const [searchValue, setSearchValue] = useState('')
    const [searchResult, setSearchResult] = useState([])
    const [playlistTracks, setPlaylistTracks] = useState([])
    const [userInfo, setUserInfo] = useState({})

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        let code = urlParams.get('code');

        if (localStorage.getItem('access_token') !== undefined && code) {
            SpotifyApi.getToken(code, setUserInfo)
        }
    }, [])

    const searchChangeHandler = (event) => {
        setSearchValue(event.target.value)
    }

    const handleSearchSubmit = async (event) => {
        event.preventDefault()
        const data = await SpotifyApi.apiSearchTracks(searchValue)
        setSearchResult(data.tracks.items)
    }

    const addTrack = (track) => {
        if (!playlistTracks.find((playlistTrack) => playlistTrack.id === track.id)) {
            setPlaylistTracks(prevState => [...prevState, track])
        }
    }

    const removeTrackFromPlaylist = (trackId) => {
        setPlaylistTracks((prevState) =>
            prevState.filter((track) => track.id !== trackId)
        )
    }

    return (
        <>
            <Header/>
            <main>
                <div className="hero min-h-64 bg-base-200">
                    <div className="hero-content text-center w-full">
                        <div className="max-w-2xl w-full">
                            <SearchBar
                                searchValue={searchValue}
                                handleChange={searchChangeHandler}
                                handleSubmit={handleSearchSubmit}
                            />
                        </div>
                    </div>
                </div>
                <div className={'flex justify-center m-8 gap-8'}>
                    <div
                        className={'grow max-w-3xl gap-6 px-10 my-4 bg-base-200 rounded-box min-h-screen'}>
                        <h2 className={'text-5xl text-center my-10 font-bold'}>Results</h2>
                        <div className={'max-h-[1000px] overflow-auto scrollbar-hide px-1 mb-16 pb-4'}>
                            <SearchResults searchResult={searchResult} addTrack={addTrack}/>
                        </div>
                    </div>
                    {<Playlist tracks={playlistTracks} removeTrack={removeTrackFromPlaylist}/>}
                </div>
            </main>
        </>
    )
}

export default App
