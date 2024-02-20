import './App.css'
import Header from "./components/Header.jsx";
import SearchBar from "./components/SearchBar.jsx";
import testTracks from "./assets/testTracks.js";
import {useState} from "react";
import SearchResults from "./components/SearchResults.jsx";

function App() {
    const [searchValue, setSearchValue] = useState('')
    const [searchResult, setSearchResult] = useState([{}])

    const searchChangeHandler = (event) => {
        setSearchValue(event.target.value)
    }

    const handleSearchSubmit = (event) => {
        event.preventDefault()
        setSearchResult(testTracks)
    }

    return (
        <>
            <Header/>
            <main>
                <div className="hero min-h-96 bg-base-200">
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
                <div className={'flex justify-stretch'}>
                    <div className={'mx-auto grow max-w-3xl gap-6 px-10 my-4 bg-base-200 rounded-box'}>
                        <h2 className={'text-5xl mb-5 text-center my-6 font-bold'}>Results</h2>
                        <SearchResults searchResult={searchResult}/>
                    </div>
                    <div className={'mx-auto max-w-5xl min-w gap-6 px-10'}>
                        <h3>wawo</h3>
                    </div>
                </div>
            </main>
        </>
    )
}

export default App
