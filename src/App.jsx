import './App.css'
import Header from "./components/Header.jsx";
import SearchBar from "./components/SearchBar.jsx";
import testTracks from "./assets/testTracks.js";

function App() {
    return (
        <>
            <Header/>
            <main>
                <div className="hero min-h-96 bg-base-200">
                    <div className="hero-content text-center w-full">
                        <div className="max-w-2xl w-full">
                            <SearchBar/>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default App
